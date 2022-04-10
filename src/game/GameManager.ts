import { Game } from './Game';
import { GameLoop } from './core/GameLoop';
import { Renderer } from './graphics/Renderer';

export class GameManager {
  static async bootstrap(width: number, height: number): Promise<GameLoop> {
    const canvas = document.createElement('canvas');
    const root = document.getElementById('app');
    const context = canvas.getContext('2d');
    const game = new Game();
    const renderer = new Renderer(width, height, context);
    const loop = new GameLoop(game, renderer);

    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = false;
    root.appendChild(canvas);

    await game.init();
    return loop;
  }
}
