class TextParticle extends Particle {
    constructor(settings) {
        super(settings);

        this.text = settings.text;
    }

    render() {
        stroke(51, this.alpha);
        strokeWeight(3);
        fill(this.color.red, this.color.green, this.color.blue, this.alpha);
        textSize(this.diameter);
        textAlign(CENTER, CENTER);
        text(this.text, this.position.x, this.position.y);
    }
}