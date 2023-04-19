class GuiRenderer {
    constructor() {
        this.bar = new ProgressBar({
            position: {
                x: 50 + width/6,
                y: height - 50
            },
            size: {
                width: width/3,
                height: 30
            },
            color: {
                red: 51,
                green: 200,
                blue: 51
            },
            strokeColor: {
                red: 51,
                green: 51,
                blue: 51,
                alpha: 255
            },
            maxValue: 100,
            value: 100
        });
    }

    update() {
        this.bar.update();
        this.scaleBar();
    }

    render() {
        this.bar.render();
        this.renderScore();
    }

    // FUNCTIONS //

    scaleBar() {
        this.bar.setValue(playersHp);
    }

    renderScore() {
        stroke(51);
        strokeWeight(3);
        fill(51);
        textAlign(CENTER, CENTER);
        textSize(50);
        text(score, width/2, 60);
    }
}