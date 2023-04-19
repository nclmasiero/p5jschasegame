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
        let saber = entitiesManager.getSaber();
        let players = entitiesManager.getPlayers();
        return new Enemy(random(width), random(height), saber, players);
    }
}