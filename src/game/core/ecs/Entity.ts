import { EventHandler } from "../../utils/EventHandler";
import Component from "./Componet";
import World from "./World";

const nextEntityName = (id: number) =>`ENTITY_NAME_${id}`

export default class Entity {
    private static lastId = 0;

    public readonly id: number;
    public readonly name: any;

    public onAddComponent: EventHandler<[Component]>;
    public onRemoveComponent: EventHandler<[Component]>;

    private world: World;
    private components: WeakMap<Function, Component>;

    constructor(world: World, name?: string) {
        this.id = ++Entity.lastId;
        this.name = name || nextEntityName(this.id);
        this.components = new WeakMap();
        this.world = world;
        this.onAddComponent = new EventHandler();
        this.onRemoveComponent = new EventHandler();
    }

    /**
     * Add component to the entity
     * @param {Component} component
     * @returns {Entity}
     */
    addComponent(component: Component): Entity {
        if (!component || !(component instanceof Component)) {
            throw new TypeError("Expect value of Component type");
        }

        this.components.set(component.constructor, component);
        this.onAddComponent.emit(component);
        return this;
    }

    /**
     * Get component from the entity
     * @param {typeof Component} componentType 
     * @returns {Component}
     */
     getComponent<T extends Component>(componentType: { new(): T }): T | undefined {
        return this.components.get(componentType) as T;
    }

    /**
     * Chacek that entity has component
     * @param {typeof Component} componentType 
     * @returns {boolean}
     */
    hasComponent(componentType: typeof Component): boolean {
        return this.components.has(componentType);
    }

    /**
     * Remove component from the entity
     * @param {Component} component
     * @returns {Entity}
     */
    removeComponent(component: Component): Entity {
        if (!component || !(component instanceof Component)) {
            throw new TypeError("Expect value of Component type");
        }

        if (this.components.has(component.constructor)) {
            this.components.delete(component.constructor);
            this.onRemoveComponent.emit(component);
        }

        return this;
    }

    /**
     * Dispose entity, unsubscribe all subscriptions. Remove relations.
     */
    dispose(): void {
        this.world.removeEntity(this);
        this.onAddComponent.removeAll();
        this.onRemoveComponent.removeAll();

        this.onAddComponent = null;
        this.onRemoveComponent = null;
        this.world = null;
        this.components = null;
    }
}
