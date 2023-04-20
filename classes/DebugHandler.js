class DebugHandler extends Entity {
    constructor() {
        super("DebugHandler");

        this.text = [];
        this.consoleText = "";
    }

    update() {
        if(!debug) return;
    }

    render() {
        if(!debug) return;

        stroke(51);
        strokeWeight(1);
        fill(0, 255, 0);
        textAlign(LEFT, CENTER);
        textSize(20);
        for(let i = 0; i < this.text.length; i++) {
            text(this.text[i], 30, i * 20 + 30);
        }
        text(this.consoleText, 30, 10*20 + 30);
    }

    // FUNCTIONS //

    addText(t) {
        this.text.push(t);
        if(this.text.length > 10) this.text.splice(0, 1);
    }

    type(k) {
        this.consoleText += k;
    }

    log(e) {
        this.addText(e);
    }
}