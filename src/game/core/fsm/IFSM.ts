import { IState } from "./IState";

export interface IFSM<S, T> {
  currentState: IState<S, T>;
  trigger(trigger: T): void;
}
