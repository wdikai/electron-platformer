import { Texture } from "./Texture";

export class TileSet {
  public readonly texture: Texture;
  public readonly clipWidth: number;
  public readonly clipHeight: number;

  constructor(texture: Texture, clipWidth: number, clipHeight: number) {
    this.texture = texture;
    this.clipWidth = clipWidth;
    this.clipHeight = clipHeight;
  }

  get width(): number {
    return this.texture.originalWidth / this.clipWidth;
  }

  get height(): number {
    return this.texture.originalHeight / this.clipHeight;
  }
}
