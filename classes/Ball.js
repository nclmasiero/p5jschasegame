class Ball {
    constructor(x, y, diameter, color, isStatic = false) {
        this.position = createVector(x, y);
        this.speed = createVector(0, 0);
        this.diameter = 0;
        this.fullDiameter = diameter;

        this.mass = map(diameter, 0, 100, 0, 8);

        this.color = color;
        this.realColor = {
            red: this.color.red,
            green: this.color.green,
            blue: this.color.blue
        };

        this.isStatic = isStatic;
    }

    update() {
        this.updateColor();
        this.updateDiameter();

        if(this.isStatic) return;

        this.position.x += this.speed.x * TIME_MULTIPLIER;
        this.position.y += this.speed.y * TIME_MULTIPLIER;

        if(this.position.x > width - this.diameter/2) {
            this.position.x = width - this.diameter/2;
            this.bounceX();
        } else if(this.position.x < this.diameter/2) {
            this.position.x = this.diameter/2;
            this.bounceX();
        }
        
        if(this.position.y > height - this.diameter/2) {
            this.position.y = height - this.diameter/2;
            this.bounceY();
        } else if(this.position.y < this.diameter/2) {
            this.position.y = this.diameter/2;
            this.bounceY();
        }

        this.applyFriction();
    }

    render() {
        stroke(51);
        strokeWeight(4);
        fill(this.realColor.red, this.realColor.green, this.realColor.blue);
        circle(this.position.x, this.position.y, this.diameter);
    }

    bounceX() {
        this.speed.x *= -0.5;
    }

    bounceY() {
        this.speed.y *= -0.5;
    }

    updateDiameter() {
        this.diameter += Math.sign(this.fullDiameter - this.diameter) * TIME_MULTIPLIER;
    }

    kick(x, y) {
        this.speed.x += x;
        this.speed.y += y;
    }

    applyFriction() {
        let frictionForce = 0.0003 * TIME_MULTIPLIER;
        
        this.speed.x += -Math.sign(this.speed.x) * frictionForce;
        this.speed.y += -Math.sign(this.speed.y) * frictionForce;
    }

    updateColor() {
        this.realColor.red = this.color.red * TIME_MULTIPLIER + 100;
        this.realColor.green = this.color.green * TIME_MULTIPLIER + 100;
        this.realColor.blue = this.color.blue * TIME_MULTIPLIER + 100;
    }

}