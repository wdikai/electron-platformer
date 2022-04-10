import { Renderer } from "../../graphics/Renderer";
import { Constructor, Optional } from "../../utils/Types";
import IScene from "./IScene";
import ISceneManager from "./ISceneManager";

export default class SceneManager<T> implements ISceneManager<T> {
    private currentScene: Optional<IScene>;
    private scenes: Map<T, Constructor<IScene>>;
    private isLoaded: boolean;

    constructor() {
        this.scenes = new Map();
        this.isLoaded = false;
    }

    async setScene(key: T): Promise<void> {
        const SceneType = this.scenes.get(key);
        if (!SceneType) {
            throw new Error(`Invalid scene ${key}`);
        }

        this.isLoaded = false;

        if(this.currentScene) {
            await this.currentScene.destroy();
        }

        this.currentScene = new SceneType();
        this.currentScene.setManager(this);
        await this.currentScene.init();
        this.isLoaded = true;
    }

    registerScen(key: T, SceneType: Constructor<IScene>): void {
        this.scenes.set(key, SceneType);
    }

    fixedUpdate(): void {
        if (this.currentScene && this.isLoaded) {
            this.currentScene.fixedUpdate();
        }
    }

    update(deltaTime: number): void {
        if (this.currentScene && this.isLoaded) {
            this.currentScene.update(deltaTime);
        }
    }

    draw(renderer: Renderer): void {
        if (this.currentScene && this.isLoaded) {
            this.currentScene.draw(renderer);
        }
    }
}