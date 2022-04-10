import { Renderer } from "../../graphics/Renderer";
import IGameObject from "../IGameObject";
import IScene from "./IScene";
import ISceneManager from "./ISceneManager";

export default abstract class AbstractScene implements IScene {
  manager: ISceneManager<any>;
  gameObjects: IGameObject[];

  constructor() {
    this.gameObjects = [];
  }

  public setManager<T>(manager: ISceneManager<T>): void {
    this.manager = manager;
  }

  public addObject(gameObject: IGameObject): void {
    this.gameObjects.push(gameObject);
  }

  async init(): Promise<void> {}
  async destroy(): Promise<void> {}

  fixedUpdate(): void {
    this.gameObjects.forEach(gameObject => gameObject.fixedUpdate()); 
  }
  
  update(deltaTime: number): void {
    this.gameObjects.forEach(gameObject => gameObject.update(deltaTime));
  }
  
  draw(renderer: Renderer): void {
    this.gameObjects.forEach(gameObject => gameObject.draw(renderer));
  }
}