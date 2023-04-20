class Collision {
    static isColliding(ball1, ball2) {
        let distance = dist(ball1.position.x, ball1.position.y, ball2.position.x, ball2.position.y);
        let diameterSum = ball1.diameter/2 + ball2.diameter/2;

        if(distance > diameterSum) return false;
        else {
            let normal = createVector(ball1.position.x, ball1.position.y);
            normal.sub(ball2.position);
            normal.setMag(1);

            return new Collision(ball1, ball2, normal, abs(distance - diameterSum));
        }
    }

    static snap(collision) {
        if(!collision.ball1.isStatic) {
            collision.ball1.position.x += collision.normal.x * collision.overlapDistance/2;
            collision.ball1.position.y += collision.normal.y * collision.overlapDistance/2;
        }
        if(!collision.ball2.isStatic) {
            collision.ball2.position.x -= collision.normal.x * collision.overlapDistance/2;
            collision.ball2.position.y -= collision.normal.y * collision.overlapDistance/2;
        }
    }

    static bounce(collision) {
        let globalMultiplier = collision.ball1.speed.mag() * collision.ball2.speed.mag();
        globalMultiplier /= 30;
        globalMultiplier = min(globalMultiplier, 0.05);
        globalMultiplier = max(globalMultiplier, 1);

        let multiplier1 = globalMultiplier * collision.ball2.mass;
        let multiplier2 = globalMultiplier * collision.ball1.mass;
        collision.ball1.kick(collision.normal.x * multiplier1, collision.normal.y * multiplier1);
        collision.ball2.kick(-collision.normal.x * multiplier2, -collision.normal.y * multiplier2);
    }

    constructor(ball1, ball2, normal, overlapDistance) {
        this.ball1 = ball1;
        this.ball2 = ball2;
        this.normal = normal;
        this.overlapDistance = overlapDistance;
    }
}