import { GamepadButtonCodes } from "../../../input/gamepad/GamepadButtonCodes";
import { GamePadController } from "../../../input/gamepad/GamePadController";

const STICK_INTENSITY = 0.25;

export class GamepadPlayerInput {
    controller: GamePadController;

    constructor(controller: GamePadController) {
        this.controller = controller;
    }

    get isLeftFired(): boolean {
        return this.controller.isPressed(GamepadButtonCodes.arrowLeft) || this.controller.leftStickX < -STICK_INTENSITY;
    }

    get isRightFired(): boolean {
        return this.controller.isPressed(GamepadButtonCodes.arrowRight) || this.controller.leftStickX > STICK_INTENSITY;
    }

    get isDashFired(): boolean {
        return this.controller.isClicked(GamepadButtonCodes.keyB);
    }

    get isJumpFired(): boolean {
        return this.controller.isClicked(GamepadButtonCodes.keyA);
    }

    get moveIntensive(): number {
        return Math.abs(this.controller.leftStickX) || 1;
    }
}
