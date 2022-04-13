export class InvalidStateException<S> extends Error {
  public readonly state: S;

  constructor(state: S, message: string = 'Invalid state') {
    super(message);
    this.state = state;
  }
}
