export class StateChangeConflictException<S, T> extends Error {
    public readonly fromState: S;
    public readonly trigger: T;
  
    constructor(
      fromState: S,
      trigger: T,
      message: string = 'State change conflict'
    ) {
      super(message);
      this.fromState = fromState;
      this.trigger = trigger;
    }
  }
  