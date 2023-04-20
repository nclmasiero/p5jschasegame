class Player extends Entity {
    constructor(settings = {}) {
        super("Player", 1);
        this.position = createVector(width/2, height/2);
        if(settings.position != null) this.position = createVector(settings.position.x, settings.position.y);

        this.speed = createVector(0, 0);

        this.color = {
            red: 200,
            green: 51,
            blue: 51
        };
        if(settings.color != null) this.color = settings.color;

        this.diameter = 30;
        if(settings.diameter != null) this.diameter = settings.diameter;

        this.keys = {
            up: 87,
            down: 83,
            right: 68,
            left: 65
        };
        if(settings.keys != null) this.keys = settings.keys;

        this.pressing = {
            up: false,
            down: false,
            right: false,
            left: false
        };
        this.isPressingAny = false;

        this.maxSpeed = 8;
        if(settings.maxSpeed != null) this.maxSpeed = settings.maxSpeed;

        this.step = 1;
        if(settings.step != null) this.step = settings.step;

        this.isStatic = false;
        this.mass = 1;
    }

    update() {
        // controlling the player
        this.updateKeys();
        this.updateMoving();

        // physics
        this.applyFriction();
        this.updateSpeed();
        this.capSpeed();

        // others
        this.updateBorders();
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
    
    updateSpeed() {
        this.position.add(this.speed);
    }

    updateKeys() {
        this.pressing = {
            up: keyIsDown(this.keys.up),
            down: keyIsDown(this.keys.down),
            right: keyIsDown(this.keys.right),
            left: keyIsDown(this.keys.left)
        };
        if(this.pressing.up || this.pressing.down || this.pressing.right || this.pressing.left) this.isPressingAny = true;
        else this.isPressingAny = false;
    }

    updateMoving() {
        let direction = {
            x: 0,
            y: 0
        };

        direction.x = this.pressing.right - this.pressing.left;
        direction.y = this.pressing.down - this.pressing.up;

        this.speed.x += direction.x * this.step;
        this.speed.y += direction.y * this.step;
    }

    applyFriction() {
        this.speed.x += -Math.sign(this.speed.x) * FRICTION_FORCE;
        this.speed.y += -Math.sign(this.speed.y) * FRICTION_FORCE;

        if(!this.isPressingAny) {
            if(abs(this.speed.x) < FRICTION_FORCE) this.speed.x = 0;
            if(abs(this.speed.y) < FRICTION_FORCE) this.speed.y = 0;
        }
    }

    capSpeed() {
        if(abs(this.speed.x) > this.maxSpeed) this.speed.x = Math.sign(this.speed.x) * this.maxSpeed;
        if(abs(this.speed.y) > this.maxSpeed) this.speed.y = Math.sign(this.speed.y) * this.maxSpeed;
    }

    hit() {
        if(playersHp <= 0) {
            this.isAlive = false;
        }
        playersHp -= round(random(5, 20));
    }

    kick(x, y) {
        this.speed.x += x;
        this.speed.y += y;
    }
}