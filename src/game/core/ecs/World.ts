import { EventHandler } from "../../utils/EventHandler";
import Component from "./Componet";
import Entity from "./Entity";

export default class World {
    public entities: Entity[];
    public entitieMap: Map<string, Entity>;
    public onEntityAdded: EventHandler<[Entity]>;
    public onEntityRemoved: EventHandler<[Entity]>;
    public onComponentAddedToEntity: EventHandler<[Entity, Component]>;
    public onComponentRemovedFromEntity: EventHandler<[Entity, Component]>;
    
    constructor() {
        this.entities = [];
        this.entitieMap = new Map();

        this.onEntityAdded = new EventHandler();
        this.onEntityRemoved = new EventHandler();
        this.onComponentAddedToEntity = new EventHandler();
        this.onComponentRemovedFromEntity = new EventHandler();
    }

    /**
     * Create new entity
     * @param {String} [name] - unique name of the entity
     * @returns {Entity}
     */
    ceateEntity(name?: string): Entity {
        if(name && this.entitieMap.has(name)) {
            throw new Error(`Entity ${name} has been already registered`);
        }

        const entity = new Entity(this, name);
        
        this.entities.push(entity);
        this.entitieMap.set(entity.name, entity);

        entity.onAddComponent.on((component: Component) => this.onComponentAddedToEntity.emit(entity, component));
        entity.onRemoveComponent.on((component: Component) => this.onComponentRemovedFromEntity.emit(entity, component));
        this.onEntityAdded.emit(entity);

        return entity;
    }

    /**
     * @param {String} name 
     * @returns {Entity | undefined}
     */
    getEntityByName(name: string): Entity | undefined {
        return this.entitieMap.get(name);
    }

    /**
     * Remove entity
     */
    removeEntity(entity: Entity): void {
        if (!entity || !(entity instanceof Entity)) {
            throw new TypeError("Expect value of Entity type");
        }

        const index = this.entities.indexOf(entity);
        if (index) {
            this.entities.splice(index, 1);
            this.onEntityRemoved.emit(entity);
        }
    }
}
