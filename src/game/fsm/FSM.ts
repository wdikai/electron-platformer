import { Constructor } from "../utils/Types";
import { State } from "./State";

export class FSM<T> {
    private currentState: T;
    private currentStateBehaviour: State<T>;
    private stateMap: Map<T, State<T>>;

    constructor() {
        this.currentState = null;
        this.stateMap = new Map();
    }

    public update(deltaTime): void {
        this.currentStateBehaviour?.update(deltaTime);
    }

    public fixedUpdate(): void {
        this.currentStateBehaviour?.fixedUpdate();
    }

    public setState(newState: T): boolean {
        const newStateBehaviour = this.stateMap.get(newState);
        if (newState === this.currentState) {
            return false;
        }

        if(!newStateBehaviour) {
            throw new Error(`Invalid state ${newState}`);
        }

        if(this.currentStateBehaviour) {
            this.currentStateBehaviour.onExit();
        }

        this.currentState = newState;
        this.currentStateBehaviour = newStateBehaviour;
        this.currentStateBehaviour.onEnter();
        return true;
    }

    public addState(state: T, stateBehaviour: State<T>): FSM<T> {
        this.stateMap.set(state, stateBehaviour);

        return this;
    }
}