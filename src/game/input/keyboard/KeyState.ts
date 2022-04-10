import { KeyCode } from './KeyCode';

export class KeyState<T = KeyCode> {
  public readonly code: T;
  private _isPressed: boolean;
  private _isReleased: boolean;
  private _isClicked: boolean;

  constructor(code: T) {
    this.code = code;
    this._isPressed = false;
    this._isClicked = false;
    this._isReleased = false;
  }

  public get isPressed(): boolean {
    return this._isPressed;
  }

  public get isClicked(): boolean {
    return this._isClicked;
  }

  public get isReleased(): boolean {
    return this._isReleased;
  }

  public onDown(): void {
    this._isClicked = !this._isPressed;
    this._isPressed = true;
  }

  public onUp(): void {
    this._isPressed = false;
    this._isClicked = false;
    this._isReleased = true;
  }

  public update(): void {
    this._isClicked = false;
    this._isReleased = false;
  }
}
