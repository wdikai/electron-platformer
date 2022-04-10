import { EventHandler } from '../utils/EventHandler';
import { Texture } from './Texture';

export class Animation {
  clips: Texture[];
  timeout: number;
  clipTime: number;
  currentClip: number;
  repeat: boolean;
  onFinish: EventHandler;
  finished: boolean;

  constructor(clips: Texture[], timeout: number, repeat: boolean = false) {
    this.clips = clips;
    this.timeout = timeout;
    this.clipTime = 0;
    this.currentClip = 0;
    this.repeat = repeat;
    this.finished = false;
    this.onFinish = new EventHandler();
  }

  get clip(): Texture {
    return this.clips[this.currentClip];
  }

  public update(deltaTime: number): void {
    this.clipTime += deltaTime;

    if (!this.finished && this.clipTime >= this.timeout) {
      this.clipTime -= this.timeout;
      this.next();
    }
  }

  next(): void {
    if (!this.repeat) {
      if (this.currentClip + 1 < this.clips.length) this.currentClip++;
      else {
        this.finished = true;
        this.onFinish.emit(this);
      }
    } else {
      this.currentClip = (this.currentClip + 1) % this.clips.length;
    }
  }

  public reset(): void {
    this.clipTime = 0;
    this.finished = false;
    this.currentClip = 0;
  }
}
