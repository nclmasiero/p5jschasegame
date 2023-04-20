class PickupSpawner extends Entity {
    constructor() {
        super("PickupSpawner");

        this.maxSpawnFrequency = 15 * 60;
        this.minSpawnFrequency = 10 * 60;
        this.secondsToReachMin = 300;
        this.spawnFrequency = this.maxSpawnFrequency;
    }

    update() {
        this.updateSpawnFrequency();
        this.spawnPickup();
    }

    render() {
        //
    }

    // FUNCTIONS

    getPickup() {
        let pickups = [];

        let x = random(width);
        let y = random(height);

        pickups.push(new Health(x, y));
        pickups.push(new Score(x, y));
        pickups.push(new Ghost(x, y));

        return random(pickups);
    }

    spawnPickup() {
        if(entitiesManager.getPlayers() == null) return;
        if(frameCount % this.spawnFrequency == 0) {
            entitiesManager.addEntity(this.getPickup());
        }
    }

    updateSpawnFrequency() {
        this.spawnFrequency = round(map(frameCount, 0, this.secondsToReachMin * 60, this.maxSpawnFrequency, this.minSpawnFrequency));
    }
}