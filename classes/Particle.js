class Particle extends Entity {
    constructor(settings) {
        super("Particle", 1);
        this.position = createVector(width/2, height/2);
        if(settings.position != null) this.position = createVector(settings.position.x, settings.position.y);

        this.diameter = 5;
        if(settings.diameter != null) this.diameter = settings.diameter;

        this.speed = createVector(random(-1, 1), random(-1, 1));

        this.color = {
            red: 200,
            green: 200,
            blue: 200
        };
        if(settings.color != null) this.color = settings.color;

        this.maxLifeSpan = round(random(50, 80));
        if(settings.maxLifeSpan != null) this.maxLifeSpan = settings.maxLifeSpan;
        this.lifeSpan = this.maxLifeSpan;

        this.isAlive = true;

        this.alpha = 255;
    }

    update() {
        this.updateSpeed();
        this.updateLifeSpan();
        this.updateAlpha();
    }
    
    render() {
        stroke(51, this.alpha);
        strokeWeight(3);
        fill(this.color.red, this.color.green, this.color.blue, this.alpha);
        circle(this.position.x, this.position.y, this.diameter);
    }
    
    // FUNCTIONS //

    updateSpeed() {
        this.position.add(this.speed);
    }
    
    updateLifeSpan() {
        this.lifeSpan--;
        if(this.lifeSpan <= 0) {
            this.isAlive = false;
        }
    }

    updateAlpha() {
        this.alpha = map(this.lifeSpan, 0, this.maxLifeSpan, 0, 255);
    }
}