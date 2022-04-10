import { Keyboard } from "../../../input/keyboard/Keyboard";
import { KeyCode } from "../../../input/keyboard/KeyCode";

export class KeyboardPlayerInput {
    readonly moveIntensive = 1;

    get isLeftFired(): boolean {
        return Keyboard.instance.isPressed(KeyCode.arrowLeft);
    }

    get isRightFired(): boolean {
        return Keyboard.instance.isPressed(KeyCode.arrowRight);
    }

    get isDashFired(): boolean {
        return Keyboard.instance.isClicked(KeyCode.keyD);
    }

    get isJumpFired(): boolean {
        return Keyboard.instance.isClicked(KeyCode.space);
    }
}
