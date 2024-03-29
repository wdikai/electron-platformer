import { CooldownTimer } from "../../core/Cooldown";
import { CooldownTimerManager } from "../../core/CooldownManager";
import { FSM } from "../../core/fsm/FSM";
import { Animator } from "../../graphics/Animator";
import { EffectTypes } from "../../input/gamepad/GamePadController";
import { Vector2D } from "../../math/Vector2D";
import { DinamicObject } from "../../phisics/DinamicObject";
import { PhisicWorld } from "../../phisics/PhisicWorld";
import { Sound } from "../../Sound";
import { GamepadPlayerInput } from "./input/GamepadPlayerInput";
import { PlayerInput } from "./input/PlayerInput";
import { PlayerInputFacade } from "./input/PlayerInputFacade";
import { PlayerAnimation } from "./PlayerAnimation";
import { PlayerFSMFactory, PlayerStateTriggers, PlayerStates } from "./PlayerFSMFactory";

const stayAnimations = [PlayerAnimation.idle, PlayerAnimation.run, PlayerAnimation.wallSlide];

export class PlayerController {
    animator: Animator<PlayerAnimation>;
    phisicObject: DinamicObject;
    invertHorizontaly: boolean;

    jumpSound: Sound;

    numOfJumps: number;
    maxNumberOfJumps: number;
    numOfDashes: number;
    maxNumberOfDashes: number;

    jumpSpeed: number;
    movementSpeed: number;
    dashSpeed: number;
    wallSlideSpeed: number;

    freezMoovingCooldown: CooldownTimer;
    wallSlidingCooldown: CooldownTimer;
    jumpCooldown: CooldownTimer;
    dashCooldown: CooldownTimer;

    playerInput: PlayerInput;
    previousPlayerInput: PlayerInput;
    fsm: FSM<PlayerStates, PlayerStateTriggers>;

    constructor(animator: Animator<PlayerAnimation>, phisicObject: DinamicObject, jumpSound: Sound) {
        this.animator = animator;
        this.phisicObject = phisicObject;
        this.invertHorizontaly = false;

        this.jumpSound = jumpSound;
        this.jumpSpeed = 35;
        this.numOfJumps = 0;
        this.maxNumberOfJumps = 2;

        this.dashSpeed = 40;
        this.numOfDashes = 0;
        this.maxNumberOfDashes = 1;

        this.movementSpeed = 15;
        this.wallSlideSpeed = 5;

        this.freezMoovingCooldown = CooldownTimerManager.instance.createTimer(400);
        this.wallSlidingCooldown = CooldownTimerManager.instance.createTimer(200);
        this.jumpCooldown = CooldownTimerManager.instance.createTimer(200);
        this.dashCooldown = CooldownTimerManager.instance.createTimer(350);

        this.playerInput = new PlayerInputFacade();
        this.fsm = PlayerFSMFactory.make(this);
    }

    public dispose(): void {
        (this.playerInput as PlayerInputFacade).dispose();
        CooldownTimerManager.instance.removeTimer(this.freezMoovingCooldown);
        CooldownTimerManager.instance.removeTimer(this.wallSlidingCooldown);
        CooldownTimerManager.instance.removeTimer(this.jumpCooldown);
        CooldownTimerManager.instance.removeTimer(this.dashCooldown);
    }

    public update(deltaTime: number): void {
        this.phisicObject.hasGravity = this.dashCooldown.isFinished;
        this.triggerFSM();

        const onFloorCollision = PhisicWorld.instance.manager.checkCollision(
            this.phisicObject,
            Vector2D.unitY
        );

        if (onFloorCollision.hasCollision && !this.phisicObject.velocity.y && PlayerAnimation.dash !== this.animator.currentKey) {
            if (this.animator.currentKey === PlayerAnimation.fall && this.playerInput instanceof GamepadPlayerInput) {
                this.playerInput.controller.playEffect(EffectTypes.DualRumble, { duration: 100, startDelay: 0, strongMagnitude: 0.5, weakMagnitude: 0.3 });
            }

            this.numOfJumps = 0;
            this.numOfDashes = 0;
            if (this.playerInput.isRightFired || this.playerInput.isLeftFired) {
            } else {
            }
        }


        if (this.animator.currentKey === PlayerAnimation.dash && this.playerInput instanceof GamepadPlayerInput && this.isWallCollide()) {
            this.playerInput.controller.playEffect(EffectTypes.DualRumble, { duration: 100, startDelay: 0, strongMagnitude: 1.0, weakMagnitude: 1.0 });
        }

        if (!onFloorCollision.hasCollision) {
            if (this.isWallDownSlide()) {
                if (this.playerInput instanceof GamepadPlayerInput) {
                    console.log(this.animator.currentKey);
                    if ([PlayerAnimation.fall, PlayerAnimation.jump, PlayerAnimation.crnrJmp, PlayerAnimation.smrslt].includes(this.animator.currentKey)) {
                        this.playerInput.controller.playEffect(EffectTypes.DualRumble, { duration: 50, startDelay: 0, strongMagnitude: 0.05, weakMagnitude: 0.05 });
                    }
                }

                this.doWallSlide();

                if (this.playerInput.isJumpFired) {
                    this.doWallJump();
                }
            } else if (stayAnimations.includes(this.animator.currentKey)) {
            }
        }

        if (this.freezMoovingCooldown.isFinished && this.dashCooldown.isFinished) {
            this.doMoving();
        }

        if (this.playerInput.isJumpFired && this.canJump()) {
            this.doJump();
        }

        if (this.animator.currentKey === PlayerAnimation.jump && this.animator.currentAnimation.finished) {
        }

        if (this.animator.currentKey === PlayerAnimation.dash && this.dashCooldown.isFinished) {
        }

        if (this.animator.currentKey === PlayerAnimation.smrslt && this.animator.currentAnimation.finished) {
        }
    }

    private triggerFSM(): void {
        const {
            isLeftFired,
            isRightFired,
            isDashFired,
            isJumpFired,
            isDownFired,
            isUseFired,
            isHandFired,
            moveIntensive
        } = this.playerInput;

        const onFloorCollision = PhisicWorld.instance.manager.checkCollision(
            this.phisicObject,
            Vector2D.unitY
        );

        if(isDownFired) this.fsm.trigger(PlayerStateTriggers.downPressed);
        else if(!isDownFired && this.previousPlayerInput?.isDownFired) this.fsm.trigger(PlayerStateTriggers.downReleased);

        if(isLeftFired) this.fsm.trigger(PlayerStateTriggers.leftPressed);
        else if(!isLeftFired && this.previousPlayerInput?.isLeftFired) this.fsm.trigger(PlayerStateTriggers.leftReleased);

        if(isRightFired) this.fsm.trigger(PlayerStateTriggers.rightPressed);
        else if(!isRightFired && this.previousPlayerInput?.isRightFired) this.fsm.trigger(PlayerStateTriggers.rightReleased);

        if (isHandFired && !this.previousPlayerInput?.isHandFired) this.fsm.trigger(PlayerStateTriggers.handFired);
        if (this.animator.currentAnimation.finished) this.fsm.trigger(PlayerStateTriggers.animationFinished);

        if (isJumpFired) this.fsm.trigger(PlayerStateTriggers.jumpPressed);

        if(onFloorCollision.hasCollision) this.fsm.trigger(PlayerStateTriggers.onGround);

        this.previousPlayerInput = {
            isLeftFired,
            isRightFired,
            isDashFired,
            isJumpFired,
            isDownFired,
            isUseFired,
            isHandFired,
            moveIntensive
        };
    }

    private doMoving(): void {
        if (this.playerInput.isRightFired) {
            this.phisicObject.velocity.setX(this.movementSpeed * this.playerInput.moveIntensive);
            this.invertHorizontaly = false;
        } else if (this.playerInput.isLeftFired) {
            this.phisicObject.velocity.setX(-this.movementSpeed * this.playerInput.moveIntensive);
            this.invertHorizontaly = true;
        } else {
            this.phisicObject.velocity.setX(0);
        }

        if (this, this.playerInput.isDashFired && this.numOfDashes < this.maxNumberOfDashes) {
            this.doDash();
        }
    }

    private doDash(): void {
        const direction = this.invertHorizontaly ? -1 : 1;
        this.phisicObject.velocity.x = this.jumpSpeed * direction;
        this.phisicObject.velocity.y = 0;
        this.dashCooldown.reset();
        this.numOfDashes++;
    }

    private doJump(): void {
        this.phisicObject.velocity.y = -this.jumpSpeed;
        this.numOfJumps++;
        this.jumpSound.play();
        this.jumpCooldown.reset();
        this.wallSlidingCooldown.reset();
    }

    private doWallSlide(): void {
        this.phisicObject.velocity.y = this.wallSlideSpeed;
        this.numOfJumps = 0;
        this.numOfDashes = 0;
    }

    private doWallJump(): void {
        const direction = this.playerInput.isRightFired ? -1 : 1;

        this.invertHorizontaly = direction < 0;
        this.phisicObject.velocity.y = -this.jumpSpeed;
        this.phisicObject.velocity.x = this.jumpSpeed / 2 * direction;
        this.jumpSound.play();
        this.jumpCooldown.reset();
        this.freezMoovingCooldown.reset();
        this.wallSlidingCooldown.reset();
    }

    private isWallCollide(): boolean {
        const onWallRightColision = PhisicWorld.instance.manager.checkCollision(
            this.phisicObject,
            Vector2D.unitX
        );
        const onWallLeftColision = PhisicWorld.instance.manager.checkCollision(
            this.phisicObject,
            Vector2D.unitX.reversed()
        );

        return (onWallRightColision.hasCollision || onWallLeftColision.hasCollision);
    }

    private isWallDownSlide(): boolean {
        const isWallCollide = this.isWallCollide();
        return (
            (this.playerInput.isRightFired || this.playerInput.isLeftFired) &&
            isWallCollide &&
            this.phisicObject.velocity.y > 0 &&
            this.wallSlidingCooldown.isFinished
        );
    }

    private canJump(): boolean {
        return (this.jumpCooldown.isFinished && this.maxNumberOfJumps > this.numOfJumps);
    }
}