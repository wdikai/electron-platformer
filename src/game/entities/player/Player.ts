import { AbstractGameObject } from '../../core/AbstractGameObject';
import { Animator } from '../../graphics/Animator';
import { Renderer } from '../../graphics/Renderer';
import { ResourceManager } from '../../media/ResourceManager';
import { DinamicObject } from '../../phisics/DinamicObject';
import { Sound } from '../../Sound';
import { PlayerAnimation } from './PlayerAnimation';
import { PlayerController } from './PlayerController';
import { PlayerResoursesLoader } from './PlayerResoursesLoader';

export class Player extends AbstractGameObject {
  animator: Animator<PlayerAnimation>;
  phisicObject: DinamicObject;
  controller: PlayerController;
  jumpSound: Sound;

  constructor(phisicObject: DinamicObject) {
    super();
    this.phisicObject = phisicObject;
  }

  async init() {
    this.animator = await PlayerResoursesLoader.loadAnimation();
    this.jumpSound = await ResourceManager.loadSound('assets/sounds/jump.wav', false);
    this.controller = new PlayerController(this.animator, this.phisicObject, this.jumpSound); 
  }

  update(deltaTime: number): void {
    this.animator.update(deltaTime);
    this.controller.update(deltaTime)
  }

  draw(renderer: Renderer): void {
    const clipWidth = this.animator.currentAnimation.clip.width * renderer.camera.scale;
    const x = this.phisicObject.rectangle.position.x - (clipWidth - this.phisicObject.rectangle.w) / 2;
    const y = this.phisicObject.rectangle.position.y - 20;
    renderer.renderTexture(
      this.animator.currentAnimation.clip,
      x,
      y,
      this.controller.invertHorizontaly
    );
  }
}
