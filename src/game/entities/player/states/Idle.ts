import { FSM } from "../../../fsm/FSM";
import { State } from "../../../fsm/State";
import { Animator } from "../../../graphics/Animator";
import { Keyboard } from "../../../input/keyboard/Keyboard";
import { KeyCode } from "../../../input/keyboard/KeyCode";
import { Vector2D } from "../../../math/Vector2D";
import { DinamicObject } from "../../../phisics/DinamicObject";
import { PhisicWorld } from "../../../phisics/PhisicWorld";
import { Player } from "../Player";
import { PlayerAnimation } from "../PlayerAnimation";
import { PlayerStates } from "./States";

export class Idle extends State<PlayerStates> {
    private entity: Player;
    private animator: Animator<PlayerAnimation>;
    phisicObject: DinamicObject;
    numOfJumps: number;
    numOfDashes: number;

    constructor(entity: Player, fsm: FSM<PlayerStates>) {
        super(fsm);
        this.entity = entity;
        this.animator = entity.animator;
        this.phisicObject = entity.phisicObject;
    }

    onEnter(): void {
        this.animator.changeAnimation(PlayerAnimation.idle);
    }

    update(deltaTime: number): void {
      
    }

    fixedUpdate(): void {
      const onFloorCollision = PhisicWorld.instance.manager.checkCollision(
        this.phisicObject,
        Vector2D.unitY
      );
  
      if (onFloorCollision.hasCollision && !this.phisicObject.velocity.y) {
        this.numOfJumps = 0;
        this.numOfDashes = 0;
        if (Keyboard.instance.isPressed(KeyCode.arrowRight)) {
          this.animator.changeAnimation(PlayerAnimation.run);
        } else if (Keyboard.instance.isPressed(KeyCode.arrowLeft)) {
          this.animator.changeAnimation(PlayerAnimation.run);
        } else {
          this.animator.changeAnimation(PlayerAnimation.idle);
        }
      }
    }

}