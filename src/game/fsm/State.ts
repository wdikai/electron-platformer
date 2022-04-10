import { FSM } from "./FSM";

export abstract class State<T> {
    protected fsm: FSM<T>;

    constructor(fsm: FSM<T>) {
        this.fsm = fsm;
    }

    onEnter(): void {};

    onExit(): void {};

    abstract update(deltaTime: number): void;
    abstract fixedUpdate(): void;
}