class ParticleSystem extends Entity {
    constructor() {
        super("ParticleSystem");
    }

    update() {
        //
    }

    render() {
        //
    }

    // FUNCTIONS //

    particleEffect(x, y, amount, color) {
        for(let i = 0; i < amount; i++) {
            entitiesManager.addEntity(this.getParticle(x, y, color));
        }
    }
    
    getParticle(x, y, color) {
        return new Particle({
            position: {
                x: x,
                y: y
            },
            color: color
        });
    }
    
    getTextParticle(x, y, color, text) {
        return new TextParticle({
            position: {
                x: x,
                y: y
            },
            color: color,
            text: text,
            diameter: 30
        });
    }
}