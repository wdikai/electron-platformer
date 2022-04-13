import { GamepadButtonCodes } from "../../../input/gamepad/GamepadButtonCodes";
import { GamePadController } from "../../../input/gamepad/GamePadController";
import { PlayerInput } from "./PlayerInput";

const STICK_INTENSITY = 0.25;

export class GamepadPlayerInput implements PlayerInput {
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

    get isDownFired(): boolean {
        return this.controller.isPressed(GamepadButtonCodes.arrowDown) || this.controller.leftStickY > STICK_INTENSITY;
    }

    get isUseFired(): boolean {
        return this.controller.isClicked(GamepadButtonCodes.keyY);
    }

    get isHandFired(): boolean {
        return this.controller.isClicked(GamepadButtonCodes.keyX);
    }
}
