import AbstractScene from "../core/scene/AbstractScene";
import { Player } from "../entities/player/Player";
import { Renderer } from "../graphics/Renderer";
import { Rectangle } from "../math/geometry/Rectangle";
import { LevelFactory } from "../media/LevelLoader";
import { DinamicObject } from "../phisics/DinamicObject";
import { PhisicWorld } from "../phisics/PhisicWorld";
import { SceneType } from "./SceneType";

export default class LevelScene extends AbstractScene {
    player: Player;

    public async init(): Promise<void> {
        const playerCollider = new DinamicObject(new Rectangle(100, 20, 40, 90));
        const level = await LevelFactory.loadMap('assets/level/test-level.json');
        this.player = new Player(playerCollider);
        await this.player.init();
        level.colliders.forEach(collider => PhisicWorld.instance.addCollider(collider));
        PhisicWorld.instance.addDinamicObject(playerCollider);
        // this.addObject(level);
        this.addObject(this.player);
    }

    public update(deltaTime: number): void {
        const position = this.player.phisicObject.rectangle.position;
        super.update(deltaTime);

        if(position.y > 2000) {
            this.manager.setScene(SceneType.died);
        }
    }

    public draw(renderer: Renderer): void {
        const position = this.player.phisicObject.rectangle.position;
        renderer.camera.setCenter(position.x, position.y);
        renderer.camera.scale = 3;
        super.draw(renderer);
    }

    public async destroy(): Promise<void> {
        await super.destroy();
        this.gameObjects = [];
        PhisicWorld.instance.reset();
    }
}