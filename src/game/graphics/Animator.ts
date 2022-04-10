import { Animation } from './Animation';

export class Animator<T> {
  animations: Map<T, Animation>;
  currentKey: T;

  constructor() {
    this.animations = new Map();
  }

  public get currentAnimation(): Animation {
    return this.animations.get(this.currentKey);
  }

  update(deltaTime: number): void {
    this.currentAnimation.update(deltaTime);
  }

  public addAnimation(key: T, animation: Animation): void {
    this.animations.set(key, animation);
  }

  public changeAnimation(key: T): Animation {
    if (this.currentKey !== key && this.animations.has(key)) {
      this.currentKey = key;
      this.currentAnimation.reset();
    }

    return this.currentAnimation;
  }
}
