import { FSMBuilder } from "../../core/fsm/FSMBuilder.";
import { FSM } from "../../core/fsm/FSM";
import { PlayerController } from "./PlayerController";
import { PlayerAnimation } from "./PlayerAnimation";

export enum PlayerStates {
    idle = 'idle',
    crouch = 'crouch',
    run = 'run',
    crouchWalk = 'crouchWalk',
    punch = 'punch'
}

export enum PlayerStateTriggers {
    leftPressed = 'leftPressed',
    leftReleased = 'leftReleased',
    rightPressed = 'rightPressed',
    rightReleased = 'rightReleased',
    downPressed = 'downPressed',
    downReleased = 'downReleased',
    handFired = 'handFired',
    animationFinished = 'animationFinished',
}

export class PlayerFSMFactory {
    static make(player: PlayerController): FSM<PlayerStates, PlayerStateTriggers> {
        return new FSMBuilder<PlayerStates, PlayerStateTriggers>()
            .state(PlayerStates.idle)
                .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.idle) })
                .transition(PlayerStateTriggers.leftPressed, PlayerStates.run)
                .transition(PlayerStateTriggers.rightPressed, PlayerStates.run)
                .transition(PlayerStateTriggers.downPressed, PlayerStates.crouch)
            .state(PlayerStates.run)
                .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.run) })
                .transition(PlayerStateTriggers.leftReleased, PlayerStates.idle)
                .transition(PlayerStateTriggers.rightReleased, PlayerStates.idle)
            .state(PlayerStates.crouch)
                .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.crouch) })
                .transition(PlayerStateTriggers.downReleased, PlayerStates.idle)
                .transition(PlayerStateTriggers.leftPressed, PlayerStates.crouchWalk)
                .transition(PlayerStateTriggers.rightPressed, PlayerStates.crouchWalk)
            .state(PlayerStates.crouchWalk)
                .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.crouchWalk) })
                .transition(PlayerStateTriggers.downReleased, PlayerStates.idle)
                .transition(PlayerStateTriggers.leftReleased, PlayerStates.crouch)
                .transition(PlayerStateTriggers.rightReleased, PlayerStates.crouch)
            .state(PlayerStates.punch)
                .onEntered({ onEntered: () => player.animator.changeAnimation(PlayerAnimation.punch) })
                .transition(PlayerStateTriggers.animationFinished, PlayerStates.idle)

            .globalTransition(PlayerStateTriggers.handFired, PlayerStates.punch)
            .build();
    }
}
