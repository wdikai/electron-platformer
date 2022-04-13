import { GamePadController } from "../../../input/gamepad/GamePadController";
import { GamePadsManager } from "../../../input/gamepad/GamepadsManager";
import { GamepadPlayerInput } from "./GamepadPlayerInput";
import { KeyboardPlayerInput } from "./KeyboardPlayerInput";
import { PlayerInput } from "./PlayerInput";

export class PlayerInputFacade implements PlayerInput {
    input: PlayerInput;
    onConnectGamepad: (controller: GamePadController) => GamepadPlayerInput;
    onDisconnectGamepad: () => KeyboardPlayerInput;

    constructor() {
        this.onConnectGamepad = controller => this.input = new GamepadPlayerInput(controller);
        this.onDisconnectGamepad = () => this.input = new KeyboardPlayerInput();

        this.input = GamePadsManager.instance.gamepads.size
            ? new GamepadPlayerInput(GamePadsManager.instance.gamepads.get(0))
            : new KeyboardPlayerInput();

        this.init();
    }

    public init(): void {
        GamePadsManager.instance.onConnect.on(this.onConnectGamepad);
        GamePadsManager.instance.onDisconnect.on(this.onDisconnectGamepad);
    }

    public get isLeftFired(): boolean {
        return this.input.isLeftFired;
    }

    public get isRightFired(): boolean {
        return this.input.isRightFired;
    }

    public get isDashFired(): boolean {
        return this.input.isDashFired;
    }

    public get isJumpFired(): boolean {
        return this.input.isJumpFired;
    }

    public get moveIntensive(): number {
        return this.input.moveIntensive;
    }

    get isDownFired(): boolean {
        return this.input.isDownFired;
    }

    get isUseFired(): boolean {
        return this.input.isUseFired;
    }

    get isHandFired(): boolean {
        return this.input.isHandFired;
    }

    dispose(): void {
        GamePadsManager.instance.onConnect.off(this.onConnectGamepad);
        GamePadsManager.instance.onDisconnect.off(this.onDisconnectGamepad);
    }
}