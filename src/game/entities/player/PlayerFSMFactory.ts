import { FSMBuilder } from "../../core/fsm/FSMBuilder.";
import { FSM } from "../../core/fsm/FSM";
import { PlayerController } from "./PlayerController";
import { PlayerAnimation } from "./PlayerAnimation";

export enum PlayerStates {
    idle = 'idle',
    run = 'run',
    jump = 'jump',
    smrslt = 'smrslt',
    fall = 'fall',
    crouch = 'crouch',
    crouchWalk = 'crouchWalk',
    punch = 'punch'
}

export enum PlayerStateTriggers {
    jumpPressed = 'jumpPressed',
    leftPressed = 'leftPressed',
    leftReleased = 'leftReleased',
    rightPressed = 'rightPressed',
    rightReleased = 'rightReleased',
    downPressed = 'downPressed',
    downReleased = 'downReleased',
    handFired = 'handFired',
    onGround = 'onGround',
    animationFinished = 'animationFinished',
}

export class PlayerFSMFactory {
    static make(player: PlayerController): FSM<PlayerStates, PlayerStateTriggers> {
        return new FSMBuilder<PlayerStates, PlayerStateTriggers>()
            .state(PlayerStates.idle)
            .onEntered({
                onEntered: () => {
                    player.animator.changeAnimation(PlayerAnimation.idle);
                    if(player.phisicObject.rectangle.h < 90) 
                    player.phisicObject.rectangle.position.y -= 90 - player.phisicObject.rectangle.h;
                    player.phisicObject.rectangle.h = 90;
                }
            })
            .transition(PlayerStateTriggers.leftPressed, PlayerStates.run)
            .transition(PlayerStateTriggers.rightPressed, PlayerStates.run)
            .transition(PlayerStateTriggers.downPressed, PlayerStates.crouch)
            .transition(PlayerStateTriggers.handFired, PlayerStates.punch)
            .transition(PlayerStateTriggers.jumpPressed, PlayerStates.jump)
            .state(PlayerStates.run)
            .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.run) })
            .transition(PlayerStateTriggers.leftReleased, PlayerStates.idle)
            .transition(PlayerStateTriggers.rightReleased, PlayerStates.idle)
            .transition(PlayerStateTriggers.jumpPressed, PlayerStates.jump)
            .state(PlayerStates.crouch)
            .onEntered({
                onEntered: () => {
                    player.animator.changeAnimation(PlayerAnimation.crouch);
                    player.phisicObject.rectangle.h = 70;
                }
            })
            .transition(PlayerStateTriggers.downReleased, PlayerStates.idle)
            .transition(PlayerStateTriggers.leftPressed, PlayerStates.crouchWalk)
            .transition(PlayerStateTriggers.rightPressed, PlayerStates.crouchWalk)
            .transition(PlayerStateTriggers.jumpPressed, PlayerStates.jump)
            .state(PlayerStates.crouchWalk)
            .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.crouchWalk) })
            .transition(PlayerStateTriggers.downReleased, PlayerStates.idle)
            .transition(PlayerStateTriggers.leftReleased, PlayerStates.crouch)
            .transition(PlayerStateTriggers.rightReleased, PlayerStates.crouch)
            .transition(PlayerStateTriggers.jumpPressed, PlayerStates.jump)
            .state(PlayerStates.punch)
            .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.punch) })
            .transition(PlayerStateTriggers.animationFinished, PlayerStates.idle)
            .state(PlayerStates.jump)
            .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.jump) })
            .transition(PlayerStateTriggers.animationFinished, PlayerStates.smrslt)
            .state(PlayerStates.smrslt)
            .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.smrslt) })
            .transition(PlayerStateTriggers.animationFinished, PlayerStates.fall)
            .state(PlayerStates.fall)
            .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.fall) })
            .transition(PlayerStateTriggers.onGround, PlayerStates.idle)
            .build();
    }
}
