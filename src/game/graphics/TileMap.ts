import { Renderer } from "./Renderer";
import { TileSet } from "./TileSet";

export class TileMap {
    width: number;
    height: number;
    tileset: TileSet;
    tiles: number[];
    tileSize: number;
    color: string;
    firstClipIndex: number;

    constructor(
        width: number,
        height: number,
        tileset: TileSet,
        tiles: number[],
        tileSize: number,
        firstClipIndex: number = 1
    ) {
        this.width = width;
        this.height = height;
        this.tiles = tiles;
        this.tileset = tileset;
        this.tileSize = tileSize;
        this.firstClipIndex = firstClipIndex;
    }

    draw(renderer: Renderer): void {
        for(let yOffset = 0; yOffset < this.height; yOffset++) {
            for(let xOffset = 0; xOffset < this.width; xOffset++) {
                const pos = xOffset + yOffset * this.width;
                if(this.tiles[pos]) {
                    renderer.renderTile(
                        this.tileset,
                        xOffset * this.tileSize,
                        yOffset * this.tileSize + (this.tileSize - this.tileset.clipHeight * 3),
                        this.tiles[pos] - this.firstClipIndex
                    );
                }
            }
        }
    }
}