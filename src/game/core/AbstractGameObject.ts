import { Renderer } from '../graphics/Renderer';
import IGameObject from './IGameObject';

export abstract class AbstractGameObject implements IGameObject {
  async init(): Promise<void> {}
  fixedUpdate(): void {}
  update(deltaTime: number): void {}
  draw(renderer: Renderer): void {}
}
