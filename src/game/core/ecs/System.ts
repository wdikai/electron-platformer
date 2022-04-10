import World from "./World";

export default abstract class System {
    protected world: World;

    constructor(world: World) {
        this.world = world;
    }

    abstract init(): Promise<void>;
    abstract run(deltaTime?: number): void;
    abstract destroy(): Promise<void>;
}
