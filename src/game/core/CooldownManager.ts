import { CooldownTimer } from "./Cooldown";

export class CooldownTimerManager {
    private static _instance: CooldownTimerManager;

    static get instance(): CooldownTimerManager {
      if(!this._instance) {
        this._instance = new CooldownTimerManager();
      }

      return this._instance;
    }

    private timers: CooldownTimer[];

    constructor() {
        this.timers = [];
    }

    public createTimer(cooldown: number): CooldownTimer {
        const cooldowmn = new CooldownTimer(cooldown);
        this.timers.push(cooldowmn);
        return cooldowmn;
    }

    public update(deltaTime: number): void {
        this.timers.forEach(timer => timer.update(deltaTime));
    }

    public reset(): void {
        this.timers = [];
    }
}
