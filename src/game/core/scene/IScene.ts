import IGameObject from "../IGameObject";
import ISceneManager from "./ISceneManager";

export default interface IScene extends IGameObject {
    manager: ISceneManager<any>;
    setManager<T>(manager: ISceneManager<T>): void;
    destroy(): Promise<void>;
}