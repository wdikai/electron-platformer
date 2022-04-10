import { GamePadController } from "./GamePadController";
import { GamepadButtonCodes } from "./GamepadButtonCodes";
import { EventHandler } from "../../utils/EventHandler";

export class GamePadsManager {
    private static _instance: GamePadsManager;
  
    static get instance(): GamePadsManager {
      if(!this._instance) {
        this._instance = new GamePadsManager();
      }
  
      return this._instance;
    }

    public readonly gamepads: Map<number, GamePadController> = new Map();

    onConnect: EventHandler<[GamePadController]> = new EventHandler();
    onDisconnect: EventHandler = new EventHandler();

    onConnectHandler: (event: any) => void;
    onDisconnectHandler: (event: any) => void;

    constructor() {
        this.onConnectHandler = (event: GamepadEvent) => this.onGamepadConnect(event);
        this.onDisconnectHandler = (event: GamepadEvent) => this.onGamepadDisconnect(event);
    }

    update(): void {
      this.gamepads.forEach((controller: GamePadController) => controller.update());
    }

    public init (): void {
        window.addEventListener("gamepadconnected", this.onConnectHandler);
        window.addEventListener("gamepaddisconnected", this.onDisconnectHandler);
    }

    public dispose(): void {
      window.removeEventListener('gamepadconnected', this.onConnectHandler);
      window.removeEventListener("gamepaddisconnected", this.onDisconnectHandler);
    }

    private onGamepadConnect(event: GamepadEvent): void {
        const controller = new GamePadController(event.gamepad);
        this.gamepads.set(event.gamepad.index, controller);
        this.onConnect.emit(controller);
    }

    private onGamepadDisconnect(event: GamepadEvent): void {
        this.gamepads.delete(event.gamepad.index);
        this.onDisconnect.emit();
    }
}