class Entity {
    constructor(name, renderPriority = 0) {
        this.name = name;
        this.isAlive = true;
        this.renderPriority = renderPriority;
    }
}