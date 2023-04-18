class Enemy {
    constructor(x, y, saber, players) {
        this.position = createVector(x, y);
        this.diameter = 15;

        this.isAlive = true;

        this.saber = saber;

        this.players = players;
        this.target = this.getNearestPlayer();

        this.refreshTime = 120;
        this.speed = 3;

        this.color = {
            red: 200,
            green: 51,
            blue: 51
        };
    }

    update() {
        if(frameCount % this.refreshTime == 0) this.refreshTarget();
        this.followTarget();
        this.updateSaber();
        this.updatePlayers();
        if(this.isAlive) this.updateBorders();
    }

    render() {
        stroke(51);
        strokeWeight(3);
        fill(this.color.red, this.color.green, this.color.blue);
        circle(this.position.x, this.position.y, this.diameter);
    }

    // FUNCTIONS //

    updateBorders() {
        if(this.position.x > width - this.diameter/2) this.position.x = width - this.diameter/2;
        if(this.position.x < this.diameter/2) this.position.x = this.diameter/2;

        if(this.position.y > height - this.diameter/2) this.position.y = height - this.diameter/2;
        if(this.position.y < this.diameter/2) this.position.y = this.diameter/2;
    }

    updatePlayers() {
        for(let player of this.players) {
            let distance = dist(this.position.x, this.position.y, player.position.x, player.position.y);
            let diameterSum = player.diameter + this.diameter;
            if(distance <= diameterSum/2) {
                addPoints(this.position.x, this.position.y, round(random(-5, 0)))
                this.explode();
                player.hit();
            }
        }
    }

    updateSaber() {
        if(!this.saber.isAlive) return;
        let minX = min(this.players[0].position.x, this.players[1].position.x);
        let maxX = max(this.players[0].position.x, this.players[1].position.x);
        if(!(this.position.x > minX && this.position.x < maxX)) return;

        if(this.saber.getDistance(this.position.x, this.position.y) <= this.diameter/2) {
            this.kill();
        }
    }

    explode() {
        let amount = round(random(2, 3));
        let color = this.color;
        particleEffect(this.position.x, this.position.y, amount, color);

        this.isAlive = false;
    }
    
    kill() {
        addPoints(this.position.x, this.position.y, round(random(0, 3)));
        this.explode();
    }

    followTarget() {
        if(this.target == null) return;
        if(!this.target.isAlive) return;

        let move = createVector(this.target.position.x, this.target.position.y);
        move.sub(this.position);
        move.setMag(this.speed);
        this.position.add(move);
    }
    
    refreshTarget() {
        this.target = this.getNearestPlayer();
    }

    getNearestPlayer() {
        let minDist = width * height;
        let found = null;

        for(let player of this.players) {
            if(!player.isAlive) continue;
            let distance = dist(this.position.x, this.position.y, player.position.x, player.position.y);
            if(distance < minDist) {
                minDist = distance;
                found = player;
            }
        }

        return found;
    }
}