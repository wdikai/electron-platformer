import { Renderer } from '../graphics/Renderer';

export default interface IGameObject {
  init(): Promise<void>;
  fixedUpdate(): void;
  update(deltaTime: number): void;
  draw(renderer: Renderer): void;
  destroy(): Promise<void>;
}
