export default class Component {
    private static lastId = 0;

    public readonly id: number;

    constructor() {
        this.id = ++Component.lastId;
    }
}
