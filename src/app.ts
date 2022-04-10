import { GameManager } from "./game/GameManager";

GameManager.bootstrap(window.innerWidth, window.innerHeight).then(loop => loop.run());