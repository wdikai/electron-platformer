import System from "./System";
import World from "./World";

export default class SystemManager extends System {
    private systems: any[];

    constructor(world: World) {
        super(world);
        this.world = world;
        this.systems = [];
    }

    /**
     * Register the system
     * @param {System} system
     * @returns {SystemManager}
     */
    addSystem(system: System): SystemManager {
        if (!system || !(system instanceof System)) {
            throw new TypeError("Expect value of Entity type");
        }

        this.systems.push(system);
        return this;
    }

    /**
     * Init system manager
     */
    public async init(): Promise<void> {
        this.systems.forEach(system => system.init());
    }

    /**
     * Run all systems
     */
    public run(deltaTime?: number): void {
        this.systems.forEach(system => system.run(deltaTime));
    }

    /**
     * Destroy systems
     */
    public async destroy(): Promise<void> {
        this.systems.forEach(system => system.destroy());
        this.systems = [];
    }
}
