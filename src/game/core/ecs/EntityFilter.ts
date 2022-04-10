import Component from "./Componet";
import Entity from "./Entity";
import World from "./World";

export default class EntityFilter {
    entities: Entity[];
    world: World;
    componentsMask: Array<typeof Component>;
    subscriptions: Function[];

    /**
     * @param {World} world
     * @param {Array<typeof Component>}} [componentsMask]
     */
    constructor(world: World, componentsMask: Array<typeof Component> = []) {
        this.entities = [];
        this.world = world;
        this.componentsMask = componentsMask;
        this.subscriptions = [
            this.world.onEntityAdded.on((entity: Entity) => this.onNewEntity(entity)),
            this.world.onComponentAddedToEntity.on((entity: Entity) => this.onNewEntity(entity)),
            this.world.onEntityRemoved.on((entity: Entity) => this.onEntityRemoved(entity)),
            this.world.onComponentRemovedFromEntity.on(
                (entity: Entity, removedComponent: Component) => this.onEntityComponentRemoved(entity, removedComponent)
            )
        ];
        this.world.entities.forEach(entity => this.onNewEntity(entity));
    }

    /**
     * Dispose filter
     */
     public dispose(): void {
        this.entities = [];
        this.world = null;
        this.subscriptions.forEach(unsubscribe => unsubscribe());
    }

    /**
     * Handle new entity event
     * @param {Entity} entity
     */
    private onNewEntity(entity: Entity): void {
        const supported = this.componentsMask
            .map(componentType => entity.hasComponent(componentType))
            .reduce((result, component) => result && component, true);

        if (supported && !this.entities.includes(entity)) {
            this.entities.push(entity);
        }
    }

    /**
     * Handle destroy entity event
     * @param {Entity} entity
     */
    private onEntityRemoved(entity: Entity): void {
        const index = this.entities.indexOf(entity);
        if (index) {
            this.entities.splice(index, 1);
        }
    }

    /**
     * Handle remove component from the entity event
     * @param {Entity} entity
     */
    private onEntityComponentRemoved(entity: Entity, removedComponent: Component): void {
        const index = this.entities.indexOf(entity);
        const supported = this.componentsMask.find(componentType => removedComponent instanceof componentType);

        if (index && !supported) {
            this.entities.splice(index, 1);
        }
    }
}
