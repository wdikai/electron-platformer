import { AbstractGameObject } from "../core/AbstractGameObject";
import { Renderer } from "../graphics/Renderer";
import { TileMap } from "../graphics/TileMap";
import { Collider } from "../phisics/Collider";

export interface ILevel {
    colliders: Collider[];
    foreground: TileMap;
    background: TileMap;
    decorations: TileMap;
    trees: TileMap;
}

export class Level extends AbstractGameObject implements ILevel {
    colliders: Collider[];
    foreground: TileMap;
    background: TileMap;
    decorations: TileMap;
    trees: TileMap;

    constructor(
        colliders: Collider[],
        foreground: TileMap,
        background: TileMap,
        decorations: TileMap,
        trees: TileMap
    ) {
        super();
        this.colliders = colliders;
        this.foreground = foreground;
        this.background = background;
        this.decorations = decorations;
        this.trees = trees;
    }

    draw(renderer: Renderer): void {
        this.background.draw(renderer);
        this.foreground.draw(renderer);
        this.trees.draw(renderer);
        this.decorations.draw(renderer);
    }
}

