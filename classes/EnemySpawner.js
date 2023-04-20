class EnemySpawner extends Entity {
    constructor() {
        super("EnemySpawner");

        this.maxSpawnFrequency = 120;
        this.minSpawnFrequency = 30;
        this.secondsToReachMin = 300;
        this.spawnFrequency = this.maxSpawnFrequency;
    }

    update() {
        this.updateSpawnFrequency();
        this.spawnEnemy();
    }

    render() {
        //
    }

    // FUNCTIONS

    getEnemy() {
        let player = random(entitiesManager.getPlayers());
        let randomVector = p5.Vector.random2D();
        randomVector.setMag(random(600, width/2));

        let pos = createVector(player.position.x, player.position.y);
        pos.add(randomVector);

        return new Enemy(pos.x, pos.y);
    }

    spawnEnemy() {
        if(entitiesManager.getPlayers() == null) return;
        if(frameCount % this.spawnFrequency == 0) {
            entitiesManager.addEntity(this.getEnemy());
        }
    }

    updateSpawnFrequency() {
        this.spawnFrequency = round(map(frameCount, 0, this.secondsToReachMin * 60, this.maxSpawnFrequency, this.minSpawnFrequency));
    }
}