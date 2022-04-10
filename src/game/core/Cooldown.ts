export class CooldownTimer {
    private currentTime: number;
    private cooldown: number;

    constructor(cooldown: number) {
        this.cooldown = cooldown;
        this.currentTime = cooldown;
    }

    public get isFinished(): boolean {
        return this.currentTime <= 0;
    }

    public reset(): void {
        this.currentTime = this.cooldown;
    }

    public update(deltaTime: number): void {
        if(!this.isFinished) {
            this.currentTime -= deltaTime;
        }
    }
}
