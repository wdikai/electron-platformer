import { Renderer } from "../../graphics/Renderer";
import { Constructor } from "../../utils/Types";
import IScene from "./IScene";

export default interface ISceneManager<T> {
    setScene(key: T): Promise<void>;
    registerScen(key: T, SceneType: Constructor<IScene>): void;
    fixedUpdate(): void;
    update(deltaTime: number): void;
    draw(renderer: Renderer): void;
}