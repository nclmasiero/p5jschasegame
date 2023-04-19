class EntitiesManager {
    constructor() {
        this.entities = [];
    }

    update() {
        for(let i = this.entities.length - 1; i >= 0; i--) {
            if(!this.entities[i].isAlive) {
                this.entities.splice(i, 1);
                continue;
            }
            this.entities[i].update();
        }
    }

    render() {
        for(let i = 0; i < 4; i++) {
            for(let entity of this.entities) {
                if(entity.renderPriority == i) entity.render();
            }
        }
    }

    // FUNCTIONS //

    addEntity(e) {
        this.entities.push(e);
    }

    addEntities(entities) {
        for(let entity of entities) {
            this.entities.push(entity);
        }
    }

    getEntitiesWithName(name) {
        let ret = [];
        for(let entity of this.entities) {
            if(entity.name == name) ret.push(entity);
        }
        return ret;
    }

    getPlayers() {
        return this.getEntitiesWithName("Player");
    }

    getSaber() {
        return this.getEntitiesWithName("Saber");
    }

    getEnemies() {
        return this.getEntitiesWithName("Enemy");
    }
    
    getParticles() {
        return this.getEntitiesWithName("Particle");
    }
}