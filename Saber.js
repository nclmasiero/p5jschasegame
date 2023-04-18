class Saber {
    constructor(players) {
        this.players = players;
        this.position1 = {
            x: players[0].x,
            y: players[0].y
        };
        this.position2 = {
            x: players[1].x,
            y: players[1].y
        };
        this.isAlive = true;
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
    }

    render() {
        noFill(),
        stroke(51);
        strokeWeight(3);
        line(this.position1.x, this.position1.y, this.position2.x, this.position2.y);
    }

    // FUNCTIONS //

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