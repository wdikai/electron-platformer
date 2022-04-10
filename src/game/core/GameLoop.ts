import IGameObject from './IGameObject';
import { Renderer } from '../graphics/Renderer';

const MS_IN_SECOND = 1000;

export class GameLoop {
  private isActive: boolean;
  private lastTickAt: number;
  private gameObject: IGameObject;
  private renderer: Renderer;
  private stepDuration: number;
  stepTimeout: number;

  constructor(
    gameObject: IGameObject,
    renderer: Renderer,
    numberOfStepsPerSecond: number = 30
  ) {
    this.gameObject = gameObject;
    this.renderer = renderer;
    this.stepDuration = MS_IN_SECOND / numberOfStepsPerSecond;
    this.stepTimeout = 0;
    this.isActive = false;
    window.addEventListener(
      'visibilitychange',
      () => this.onChangeVisible(),
      true
    );
  }

  private onChangeVisible(): void {
    this.lastTickAt = performance.now();
  }

  run(): void {
    this.isActive = true;
    this.lastTickAt = performance.now();
    requestAnimationFrame(() => this.tick());
  }

  tick(): void {
    const currentTickAt = performance.now();
    const deltaTime = currentTickAt - this.lastTickAt;
    this.lastTickAt = currentTickAt;
    this.stepTimeout += deltaTime;

    while (this.stepTimeout > this.stepDuration) {
      this.gameObject.fixedUpdate();
      this.stepTimeout -= this.stepDuration;
    }

    this.gameObject.update(deltaTime);
    this.gameObject.draw(this.renderer);

    if (this.isActive) {
      requestAnimationFrame(() => this.tick());
    }
  }

  stop(): void {
    this.isActive = false;
  }
}
