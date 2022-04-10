import { Camera } from './Camera';
import { Texture } from './Texture';
import { TileSet } from './TileSet';

export class Renderer {
  context: CanvasRenderingContext2D;
  width: number;
  height: number;
  camera: Camera;

  constructor(
    width: number,
    height: number,
    context: CanvasRenderingContext2D
  ) {
    this.width = width;
    this.height = height;
    this.context = context;
    this.camera = new Camera(width, height);
  }

  clear(): void {
    this.context.save();
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.restore();
  }

  drawRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    this.context.save();
    this.context.translate(x - this.camera.position.x, y - this.camera.position.y);
    this.context.strokeStyle = color;
    this.context.strokeRect(0, 0, width, height);
    this.context.restore();
  }

  fillRect(
    x: number,
    y: number,
    width: number,
    height: number,
    color: string
  ): void {
    this.context.save();
    this.context.translate(x - this.camera.position.x, y - this.camera.position.y);
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, width, height);
    this.context.restore();
  }

  drawText(
    text: string,
    x: number,
    y: number,
    color?: string,
    font?: string
  ): void {
    this.context.save();
    this.context.translate(x - this.camera.position.x, y - this.camera.position.y);

    if (font) this.context.font = font;
    if (color) this.context.fillStyle = color;

    this.context.fillText(text, 0, 0);
    this.context.restore();
  }

  renderTexture(
    texture: Texture,
    x: number,
    y: number,
    flipHorizontaly: boolean = false
  ): void {
    const scaleX = flipHorizontaly ? -1 : 1;
    const translateX = flipHorizontaly
      ? -texture.width * this.camera.scale
      : 0;

    this.context.save();
    this.context.translate(x - this.camera.position.x, y - this.camera.position.y);
    this.context.scale(scaleX, 1);
    this.context.drawImage(
      texture.image,
      translateX,
      0,
      texture.width * this.camera.scale,
      texture.height * this.camera.scale
    );
    this.context.restore();
  }

  renderTile(
    set: TileSet,
    x: number,
    y: number,
    clipNumber: number = 0
  ): void {
    const xOffset = (clipNumber % set.width) * set.clipWidth;
    const yOffset = Math.floor(clipNumber / set.width) * set.clipHeight;

    this.context.save();
    this.context.translate(x - this.camera.position.x, y - this.camera.position.y);
    this.context.drawImage(
      set.texture.image,
      xOffset,
      yOffset,
      set.clipWidth,
      set.clipWidth,
      0,
      0,
      set.clipWidth * this.camera.scale,
      set.clipWidth * this.camera.scale
    );
    this.context.restore();
  }
}
