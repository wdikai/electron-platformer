import { Optional } from '../../utils/Types';
import { FSM } from './FSM';
import { OnStateEnteredListener } from './OnStateEnteredListener';
import { OnStateLeavedListener } from './OnStateLeavedListener';
import { OnStateUpdateingListener } from './OnStateUpdateingListener';
import { State } from './State';

export class FSMBuilder<S, T> {
  private initialState: Optional<S>;
  private currentState: Optional<S>;
  private stateTransitionMaps: Map<S, Map<T, S>>;
  private globalTransitionMap: Map<T, S>;

  private stateOnStateEnteredListeners: Map<S, OnStateEnteredListener[]>;
  private stateOnStateUpdateingListeners: Map<S, OnStateUpdateingListener[]>;
  private stateOnStateLeavedListeners: Map<S, OnStateLeavedListener[]>;

  constructor(initialState?: S) {
    this.initialState = initialState;
    this.stateTransitionMaps = new Map();
    this.globalTransitionMap = new Map();
    this.stateOnStateEnteredListeners = new Map();
    this.stateOnStateUpdateingListeners = new Map();
    this.stateOnStateLeavedListeners = new Map();
    if (initialState) {
      this.registerState(initialState);
      this.currentState = initialState;
    }
  }

  private get selectedState(): S {
    console.log(this.currentState);
    if (!this.currentState) {
      throw new Error("Any state wasn't selected");
    }

    return this.currentState as S;
  }

  public state(state: S): FSMBuilder<S, T> {
    if (!this.initialState) {
      this.initialState = state;
    }

    this.registerState(state);
    this.currentState = state;

    return this;
  }

  public transition(trigger: T, state: S): FSMBuilder<S, T> {
    const transitioMap = this.stateTransitionMaps.get(
      this.selectedState
    ) as Map<T, S>;
    this.registerState(state);
    transitioMap.set(trigger, state);

    return this;
  }

  public globalTransition(trigger: T, state: S): FSMBuilder<S, T> {
    this.registerState(state);
    this.globalTransitionMap.set(trigger, state);

    return this;
  }

  public onEntered(listener: OnStateEnteredListener): FSMBuilder<S, T> {
    const listeners = this.stateOnStateEnteredListeners.get(
      this.selectedState
    ) as OnStateEnteredListener[];
    listeners.push(listener);

    return this;
  }

  public onUpdate(listener: OnStateUpdateingListener): FSMBuilder<S, T> {
    const listeners = this.stateOnStateUpdateingListeners.get(
      this.selectedState
    ) as OnStateUpdateingListener[];
    listeners.push(listener);

    return this;
  }

  public onLeaved(listener: OnStateLeavedListener): FSMBuilder<S, T> {
    const listeners = this.stateOnStateLeavedListeners.get(
      this.selectedState
    ) as OnStateLeavedListener[];
    listeners.push(listener);

    return this;
  }

  public build(): FSM<S, T> {
    const stateMap = new Map();
    if (!this.initialState) {
      throw new Error("Initial state wasn't provided");
    }

    for (let stateKey of this.stateTransitionMaps.keys()) {
      const state = new State(
        stateKey,
        this.stateTransitionMaps.get(stateKey) as Map<T, S>
      );
      const onStateEnteredListeners =
        this.stateOnStateEnteredListeners.get(stateKey) || [];
      const onStateUpdateingListeners =
        this.stateOnStateUpdateingListeners.get(stateKey) || [];
      const onStateLeavedListeners =
        this.stateOnStateLeavedListeners.get(stateKey) || [];

      onStateEnteredListeners.forEach((listener) => state.onEntered(listener));
      onStateUpdateingListeners.forEach((listener) =>
        state.onUpdating(listener)
      );
      onStateLeavedListeners.forEach((listener) => state.onLeaved(listener));

      stateMap.set(stateKey, state);
    }

    return new FSM(this.initialState, stateMap, this.globalTransitionMap);
  }

  private registerState(state: S): FSMBuilder<S, T> {
    if (!this.stateTransitionMaps.has(state)) {
      this.stateTransitionMaps.set(state, new Map());
    }

    if (!this.stateOnStateEnteredListeners.has(state)) {
      this.stateOnStateEnteredListeners.set(state, []);
    }

    if (!this.stateOnStateUpdateingListeners.has(state)) {
      this.stateOnStateUpdateingListeners.set(state, []);
    }

    if (!this.stateOnStateLeavedListeners.has(state)) {
      this.stateOnStateLeavedListeners.set(state, []);
    }

    return this;
  }
}
