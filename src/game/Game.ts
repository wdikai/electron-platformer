import { AbstractGameObject } from './core/AbstractGameObject';
import { CooldownTimerManager } from './core/CooldownManager';
import ISceneManager from './core/scene/ISceneManager';
import SceneManager from './core/scene/SceneManager';
import { Renderer } from './graphics/Renderer';
import { GamePadsManager } from './input/gamepad/GamepadsManager';
import { Keyboard } from './input/keyboard/Keyboard';
import { PhisicWorld } from './phisics/PhisicWorld';
import DiedScene from './scenes/DiedScene';
import LevelScene from './scenes/LevelScene';
import { SceneType } from './scenes/SceneType';

export class Game extends AbstractGameObject {
  keyBoard: Keyboard;
  sceneManager: ISceneManager<SceneType>;

  async init() {
    GamePadsManager.instance.init();
    Keyboard.instance.init();
    this.sceneManager = new SceneManager();
    this.sceneManager.registerScen(SceneType.level, LevelScene);
    this.sceneManager.registerScen(SceneType.died, DiedScene);
    await this.sceneManager.setScene(SceneType.level);
  }

  fixedUpdate(): void {
    PhisicWorld.instance.update();
    this.sceneManager.fixedUpdate();
  }

  update(deltaTime: number): void {
    CooldownTimerManager.instance.update(deltaTime);
    this.sceneManager.update(deltaTime);
    Keyboard.instance.update();
    GamePadsManager.instance.update();
  }

  draw(renderer: Renderer): void {
    renderer.clear();
    this.sceneManager.draw(renderer);
    PhisicWorld.instance.manager.colliders.forEach(collider => {
      renderer.drawRect(
        collider.rectangle.left,
        collider.rectangle.top,
        collider.rectangle.w,
        collider.rectangle.h,
        'red'
      );
    });
  }
}
