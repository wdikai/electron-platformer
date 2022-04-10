import { GamepadButtonCodes } from "./GamepadButtonCodes";

export enum EffectTypes {
    DualRumble = "dual-rumble",
    Vibration = "vibration"
}

export interface EffectParams {
    duration: number;
    startDelay: number;
    strongMagnitude: number;
    weakMagnitude: number;
}

type PartiallyPressableButtons = GamepadButtonCodes.leftTrigger | GamepadButtonCodes.rightTrigger;


export class GamePadController {
    static getGamepads(index: number): Gamepad {
        let gamepads;
        if("webkitGetGamepads" in navigator) {
            gamepads = navigator["webkitGetGamepads"]();
        } else {
            gamepads = navigator.getGamepads();
        }

        return gamepads[index];
    }

    index: number;
    gamepad: Gamepad;
    buttons: any[] = [];

    constructor(gamepad: Gamepad) {
        this.index = gamepad.index;
        this.gamepad = gamepad;
    }

    get leftStickX(): number {
        return this.gamepad.axes[0];
    }

    get leftStickY(): number {
        return this.gamepad.axes[1];
    }

    get rightStickX(): number {
        return this.gamepad.axes[2];
    }

    get rightStickY(): number {
        return this.gamepad.axes[3];
    }

    isPressed(buttonCode: GamepadButtonCodes): boolean {
        return this.buttons[buttonCode] && this.buttons[buttonCode].isPressed;
    }
  
    isTouched(buttonCode: GamepadButtonCodes): boolean {
        return this.buttons[buttonCode] && this.buttons[buttonCode].isTouched;
    }
  
    isClicked(buttonCode: GamepadButtonCodes): boolean {
        return this.buttons[buttonCode] && this.buttons[buttonCode].isClicked;
    }

    pressingValue(buttonCode: PartiallyPressableButtons): number {
        return this.buttons[buttonCode] ? this.buttons[buttonCode].value : 0;
    }

    update(): void {
        this.gamepad = GamePadController.getGamepads(this.index);
        this.gamepad.buttons.forEach((button: GamepadButton, index: number) => {
            this.buttons[index] = this.buttons[index] || {};
            this.buttons[index].isClicked = !this.buttons[index].isPressed && button.pressed;
            this.buttons[index].isReleased = this.buttons[index].isPressed && !button.pressed;
            this.buttons[index].isTouched = button.touched;
            this.buttons[index].isPressed = button.pressed;
            this.buttons[index].value = button.value;
        });
    }

    playEffect(type: EffectTypes, options: EffectParams): void {
        if("vibrationActuator" in this.gamepad) {
            this.gamepad["vibrationActuator"].playEffect(type, options);
        }
    }
}