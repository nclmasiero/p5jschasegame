class Saber extends Entity {
    constructor(players) {
        super("Saber");
        this.players = players;
        this.position1 = {
            x: players[0].x,
            y: players[0].y
        };
        this.position2 = {
            x: players[1].x,
            y: players[1].y
        };

        this.alpha = 255;
        this.requiredDistance = width * 0.6;
    }

    update() {
        this.position1.x = this.players[0].position.x;
        this.position1.y = this.players[0].position.y;

        this.position2.x = this.players[1].position.x;
        this.position2.y = this.players[1].position.y;

        for(let player of this.players) {
            if(!player.isAlive) {
                this.isAlive = false;
                break;
            }
        }

        this.updateAlpha();
    }

    render() {
        noFill(),
        stroke(51, this.alpha);
        strokeWeight(2);
        line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
    
        stroke(51, 200, 200, this.alpha * 0.4);
        strokeWeight(4);
        line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
    }

    // FUNCTIONS //

    updateAlpha() {
        let distance = this.getPlayersDistance();
        this.alpha = map(distance, this.requiredDistance / 3, this.requiredDistance, 255, 0);
    }

    getPlayersDistance() {
        if(this.players.length <= 1) return 0;
        let p1 = this.players[0];
        let p2 = this.players[1];
        return dist(p1.position.x, p1.position.y, p2.position.x, p2.position.y);
    }

    getEquation() {

        let xCoeff = (this.position1.y - this.position2.y)/(this.position1.x - this.position2.x);
        let c = this.position1.y - xCoeff * this.position1.x;
        // c = y - mx

        return [xCoeff, -1, c];
    }

    getDistance(x, y) {
        let eq = this.getEquation();

        let nom = abs(eq[0] * x + eq[1] * y + eq[2]);
        let den = Math.sqrt(eq[0] * eq[0] + eq[1] * eq[1]);

        return nom/den;
    }
}