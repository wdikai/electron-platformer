import { Keyboard } from "../../../input/keyboard/Keyboard";
import { KeyCode } from "../../../input/keyboard/KeyCode";
import { PlayerInput } from "./PlayerInput";

export class KeyboardPlayerInput implements PlayerInput {
    get isLeftFired(): boolean {
        return Keyboard.instance.isPressed(KeyCode.arrowLeft);
    }

    get isRightFired(): boolean {
        return Keyboard.instance.isPressed(KeyCode.arrowRight);
    }

    get isDashFired(): boolean {
        return Keyboard.instance.isClicked(KeyCode.keyZ);
    }

    get isJumpFired(): boolean {
        return Keyboard.instance.isClicked(KeyCode.space);
    }

    get isDownFired(): boolean {
        return Keyboard.instance.isPressed(KeyCode.arrowDown);
    }

    get isUseFired(): boolean {
        return Keyboard.instance.isClicked(KeyCode.keyX);
    }

    get isHandFired(): boolean {
        return Keyboard.instance.isClicked(KeyCode.keyC);
    }

    get moveIntensive() : number {
        return Keyboard.instance.isPressed(KeyCode.shift) || this.isDownFired
            ? 0.2
            : 1;
    }
}
