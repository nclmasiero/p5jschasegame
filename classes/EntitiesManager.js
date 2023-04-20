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

        this.bouncePlayers();

    }

    render() {
        for(let i = 0; i < 4; i++) {
            for(let entity of this.entities) {
                if(entity.renderPriority == i) entity.render();
            }
        }
    }

    // FUNCTIONS //

    bouncePlayers() {
        let players = this.getPlayers();
        if(!players) return;
        if(players.length <= 1) return;

        if(players[0].powerups.ghost > 0 || players[1].powerups.ghost > 0) return;

        let collision = Collision.isColliding(players[0], players[1]);
        let bounceCollision = Collision.isColliding(players[0], players[1]);
        if(collision != false) {
            Collision.snap(collision);
            Collision.bounce(bounceCollision);
        }
    }

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
        if(ret.length == 0) return null;
        if(ret.length == 1) return ret[0];
        else return ret;
    }

    getPlayers() {
        let players = this.getEntitiesWithName("Player");
        if(!players) return null;
        if(!players.length) return [players];
        else return players;
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

    getParticleSystem() {
        return this.getEntitiesWithName("ParticleSystem");
    }
    
}