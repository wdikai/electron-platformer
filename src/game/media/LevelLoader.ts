import { TileMap } from "../graphics/TileMap";
import { Collider } from "../phisics/Collider";
import { Rectangle } from "../math/geometry/Rectangle";
import { TileSet } from "../graphics/TileSet";
import { ResourceManager } from "./ResourceManager";
import { Level } from "../entities/Level";

export interface MapObject {
    layers: MapLayer[];
}2860

type MapLayer = Tiles | ObjectGroup;

interface Tiles {
    id: number;
    name: string;
    data: number[];
    width: number;
    height: number;
}

interface ObjectGroup {
    id: number;
    name: string;
    objects: ObjectGroupPart[];
}

interface ObjectGroupPart {
    id: number;
    width: number;
    height: number;
    x: number;
    y: number;
    name: string;
}

const SCALE = 3;

export class LevelFactory {
    static async loadMap(url: string): Promise<Level> {
        const mapOptions = await ResourceManager.loadJSON<MapObject>(url);
        return this.buildMap(mapOptions);
    }

    static async buildMap(options: MapObject): Promise<Level> {
        const colliderOptions = options.layers.find(layer => layer.name === 'colliders') as ObjectGroup;
        const colliders = colliderOptions ? LevelFactory.buildColliders(colliderOptions) : [];

        const tileSet = new TileSet(
            await ResourceManager.loadTexture('assets/images/tileset.png'),
            16,
            16
        );
        const treeSet = new TileSet(
            await ResourceManager.loadTexture('assets/images/trees.png'),
            128,
            128
        );

        const tiles = options.layers.find(layer => layer.name === 'foreground') as Tiles;
        const foreground = new TileMap(
            tiles.width,
            tiles.height,
            tileSet,
            tiles.data,
            16 * SCALE,
        );

        const backgroundTiles = options.layers.find(layer => layer.name === 'background') as Tiles;
        const background = new TileMap(
            backgroundTiles.width,
            backgroundTiles.height,
            tileSet,
            backgroundTiles.data,
            16 * SCALE
        );
        const decorationsTiles = options.layers.find(layer => layer.name === 'decorations') as Tiles;
        const decorations = new TileMap(
            backgroundTiles.width,
            backgroundTiles.height,
            tileSet,
            decorationsTiles.data,
            16 * SCALE
        );
        const treesTiles = options.layers.find(layer => layer.name === 'trees') as Tiles;
        const trees = new TileMap(
            treesTiles.width,
            treesTiles.height,
            treeSet,
            treesTiles.data,
            16 * SCALE,
            61
        );
        
        return new Level(colliders, foreground, background, decorations, trees);
    }

    static buildColliders(colliderOptions: ObjectGroup): Collider[] {
        return colliderOptions.objects.map(object => new Collider(new Rectangle(
            object.x * SCALE,
            object.y * SCALE,
            object.width * SCALE,
            object.height * SCALE
        )));
    }
}