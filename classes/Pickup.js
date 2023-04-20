class Pickup extends Entity {
    constructor(x, y, diameter, color) {
        super("Pickup");
        this.position = createVector(x, y);
        this.diameter = diameter;
        this.color = color;
    }

    update() {
        this.checkPicked();
    }

    render() {
        let diameter = abs(sin(frameCount / 50) * this.diameter) + this.diameter/2;

        stroke(51);
        strokeWeight(2);
        fill(this.color.red, this.color.green, this.color.blue);
        circle(this.position.x, this.position.y, diameter);
    }

    // FUNCTIONS //

    checkPicked() {
        let players = entitiesManager.getPlayers();
        if(!players) return;
        
        for(let player of players) {
            let distance = dist(player.position.x, player.position.y, this.position.x, this.position.y);
            let diametersSum = this.diameter + player.diameter;

            if(distance <= diametersSum/2) {
                this.pick(player);
                this.explode();
            }
        }
    }
    
    explode() {
        let amount = round(random(4, 6));
        let color = this.color;
        entitiesManager.getParticleSystem().particleEffect(this.position.x, this.position.y, amount, color);

        this.isAlive = false;
    }

    pick(player) {
        // OVERRIDE
        console.log("Player picked the pickup.");
        console.log(player);
    }
}