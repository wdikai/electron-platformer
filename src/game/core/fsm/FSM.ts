import { Optional } from "../../utils/Types";
import { IFSM } from "./IFSM";
import { InvalidStateException } from "./InvalidStateException";
import { IState } from "./IState";
import { StateChangeConflictException } from "./StateChangeConflictException";

export class FSM<S, T> implements IFSM<S, T> {
  private state: S;
  private readonly states: Map<S, IState<S, T>>;
  private readonly transitionMap: Map<T, S>;

  constructor(
    initState: S,
    states: Map<S, IState<S, T>>,
    transitionMap: Map<T, S>
  ) {
    this.states = states;
    this.transitionMap = transitionMap;
    this.changeState(initState);
  }

  public get currentState(): IState<S, T> {
    return this.states.get(this.state) as IState<S, T>;
  }

  public trigger(trigger: T): void {
    const globalTransition: Optional<S> = this.transitionMap.get(trigger);
    const localTransition: Optional<S> =
      this.currentState.getTransition(trigger);

    if (
      globalTransition &&
      localTransition &&
      globalTransition !== localTransition
    ) {
      throw new StateChangeConflictException(
        this.state,
        trigger,
        `State change conflict. Fom the ${this.state} state there are two transition by trigger ${trigger}: [${globalTransition}, ${localTransition}]`
      );
    }

    if (globalTransition) {
      this.changeState(globalTransition);
    } else if (localTransition) {
      this.changeState(localTransition);
    }
  }

  private changeState(state: S): void {
    if (this.state === state) {
      return;
    }

    if (!this.states.has(state)) {
      throw new InvalidStateException(state);
    }

    if (this.currentState) {
      this.currentState.leaved();
    }

    this.state = state;
    this.currentState.entered();
  }
}
