class EnemySpawner extends Entity {
    constructor() {
        super("EnemySpawner");
    }

    update() {
        if(frameCount % 60 == 0) {
            entitiesManager.addEntity(this.getEnemy());
        }
    }

    render() {
        //
    }

    // FUNCTIONS

    getEnemy() {
        return new Enemy(random(width), random(height));
    }
}