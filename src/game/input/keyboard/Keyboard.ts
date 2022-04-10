import { KeyCode } from './KeyCode';
import { KeyState } from './KeyState';

export class Keyboard {
  private static _instance: Keyboard;

  static get instance(): Keyboard {
    if(!this._instance) {
      this._instance = new Keyboard();
    }

    return this._instance;
  }

  private keys: Map<number, KeyState>;
  private onUpHandler: (event: KeyboardEvent) => void;
  private onDownHandler: (event: KeyboardEvent) => void;

  constructor() {
    this.keys = new Map();
    this.onUpHandler = event => this.onUp(event);
    this.onDownHandler = event => this.onDown(event);
  }

  init(): void {
    document.addEventListener('keyup', this.onUpHandler);
    document.addEventListener('keydown', this.onDownHandler);
  }

  isPressed(code: KeyCode): boolean {
    return this.keys.has(code) && this.keys.get(code).isPressed;
  }

  isClicked(code: KeyCode): boolean {
    return this.keys.has(code) && this.keys.get(code).isClicked;
  }

  isReleased(code: KeyCode): boolean {
    return this.keys.has(code) && this.keys.get(code).isReleased;
  }

  update(): void {
    this.keys.forEach(key => key.update());
  }

  onDown(event: KeyboardEvent): void {
    event.preventDefault();
    const code = event.keyCode;
    const key = this.keys.get(code) || new KeyState(code);
    key.onDown();
    this.keys.set(code, key);
  }

  onUp(event: KeyboardEvent): void {
    event.preventDefault();
    const code = event.keyCode;
    const key = this.keys.get(code) || new KeyState(code);
    key.onUp();
    this.keys.set(code, key);
  }

  dispose(): void {
    document.removeEventListener('keyup', this.onUpHandler);
    document.removeEventListener('keydown', this.onDownHandler);
  }
}
