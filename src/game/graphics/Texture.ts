export class Texture {
  public readonly image: HTMLImageElement;

  constructor(image: HTMLImageElement) {
    this.image = image;
  }

  get originalWidth(): number {
    return this.image.width;
  }

  get originalHeight(): number {
    return this.image.height;
  }

  get width(): number {
    return this.image.width;
  }

  get height(): number {
    return this.image.height;
  }
}
