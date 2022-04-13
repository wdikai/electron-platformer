import { Optional } from "../../utils/Types";

export interface IState<S, T> {
    key: S;
    getTransition(trigger: T): Optional<S>;
  
    entered(): void;
    updating(timestamp: number): void;
    leaved(): void;
  }
  