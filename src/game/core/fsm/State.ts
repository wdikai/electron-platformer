import { Optional } from '../../utils/Types';
import { IState } from './IState';
import { OnStateEnteredListener } from './OnStateEnteredListener';
import { OnStateLeavedListener } from './OnStateLeavedListener';
import { OnStateUpdateingListener } from './OnStateUpdateingListener';

export class State<S, T> implements IState<S, T> {
  public readonly key: S;
  private readonly transitionMap: Map<T, S>;
  private onStateEnteredListeners: OnStateEnteredListener[];
  private onStateUpdateingListeners: OnStateUpdateingListener[];
  private onStateLeavedListeners: OnStateLeavedListener[];

  constructor(key: S, transitionMap: Map<T, S>) {
    this.key = key;
    this.transitionMap = transitionMap;
    this.onStateEnteredListeners = [];
    this.onStateUpdateingListeners = [];
    this.onStateLeavedListeners = [];
  }

  public onEntered(listener: OnStateEnteredListener): void {
    this.onStateEnteredListeners.push(listener);
  }

  public onUpdating(listener: OnStateUpdateingListener): void {
    this.onStateUpdateingListeners.push(listener);
  }

  public onLeaved(listener: OnStateLeavedListener): void {
    this.onStateLeavedListeners.push(listener);
  }

  public getTransition(trigger: T): Optional<S> {
    return this.transitionMap.get(trigger) as Optional<S>;
  }

  public entered(): void {
    this.onStateEnteredListeners.forEach((listener) => listener.onEntered());
  }

  public updating(timestamp: number): void {
    this.onStateUpdateingListeners.forEach((listener) =>
      listener.onUpdate(timestamp)
    );
  }

  public leaved(): void {
    this.onStateLeavedListeners.forEach((listener) => listener.onLeaved());
  }
}
