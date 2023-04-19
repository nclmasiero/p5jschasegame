class ProgressBar {
    constructor(settings = {}) {
        this.position = createVector(width/2, height/2);
        if(settings.position != null) this.position = createVector(settings.position.x, settings.position.y);

        this.size = {
            width: 100,
            height: 10
        };
        if(settings.size != null) this.size = settings.size;

        this.doRenderCenter = false;
        if(settings.doRenderCenter != null) this.doRenderCenter = settings.doRenderCenter;

        this.value = 0;
        if(settings.value != null) this.value = settings.value;

        this.maxValue = 100;
        if(settings.maxValue != null) this.maxValue = settings.maxValue;

        this.color = {
            red: 200,
            green: 200,
            blue: 200,
            alpha: 255
        };
        if(settings.color != null) this.color = settings.color;

        this.strokeColor = {
            red: 200,
            green: 200,
            blue: 200,
            alpha: 255
        };
        if(settings.strokeColor != null) this.strokeColor = settings.strokeColor;

        this.shadowColor = {
            red: 200,
            green: 150,
            blue: 50,
            alpha: 255
        };
        if(settings.shadowColor != null) this.shadowColor = setting.shadowColor;

        this.doShadow = true;
        if(settings.doShadow != null) this.doShadow = settings.doShadow;

        this.shadowPosition = 0;
        
        this.shadowSpeed = 10;

        this.doProportionalShadowSpeed = true;
        if(settings.doProportionalShadowSpeed != null) this.doProportionalShadowSpeed = settings.doProportionalShadowSpeed;

        this.minimumProportionalShadowSpeed = 1;
        if(settings.minimumProportionalShadowSpeed != null) this.minimumProportionalShadowSpeed = settings.minimumProportionalShadowSpeed;

        this.smoothValue = this.value;

        this.doSmooth = true;
        if(settings.doSmooth != null) this.doSmooth = settings.doSmooth;

        this.smoothSpeed = 5;
        if(settings.smoothSpeed != null) this.smoothSpeed = settings.smoothSpeed;

        this.doRenderRelative = false;
        if(settings.doRenderRelative != null) this.doRenderRelative = settings.doRenderRelative;

    }

    setup() {
        this.shadowPosition = this.getBarLength();
    }
    
    update() {
        this.updateShadowBar();
        this.updateProportionalShadowSpeed();
        this.updateSmooth();
    }
    
    render() {
        this.renderShadowBar();
        this.renderInnerBar();
        this.renderOuterBar();
    }

    // public functions

    setValue(newValue) {
        this.value = newValue;
        this.capValue();
    }

    addValue(toAdd) {
        this.setValue(this.value + toAdd);
    }

    subValue(toSub) {
        this.setValue(this.value - toSub);
    }

    // updating

    updateSmooth() {
        if(!this.doSmooth) {
            this.smoothValue = this.value;
            return;
        }

        let direction = Math.sign(this.value - this.smoothValue);

        if(abs(this.value - this.smoothValue) <= this.smoothSpeed) {
            this.smoothValue = this.value;
            return;
        }

        this.smoothValue += direction * this.smoothSpeed;
    }

    updateProportionalShadowSpeed() {
        if(!this.doProportionalShadowSpeed) return;

        this.shadowSpeed = (this.shadowPosition - this.getBarLength()) / 10;
        if(this.shadowSpeed < this.minimumProportionalShadowSpeed) this.shadowSpeed = this.minimumProportionalShadowSpeed;
    }

    updateShadowBar() {
        let direction = Math.sign(this.getBarLength() - this.shadowPosition);
        
        if(direction > 0) {
            this.shadowPosition = this.getBarLength(true);
            return;
        }
        
        if(abs(this.getBarLength() - this.shadowPosition) <= this.shadowSpeed) {
            this.shadowPosition = this.getBarLength();
            return;
        }
        
        this.shadowPosition += direction * this.shadowSpeed;
    }

    // rendering
    
    renderShadowBar() {
        noStroke();
        fill(this.shadowColor.red, this.shadowColor.green, this.shadowColor.blue, this.shadowColor.alpha);

        rectMode(CENTER);
        if(!this.doRenderCenter) rectMode(CORNER);

        let x = this.position.x;
        let y = this.position.y;
        if(!this.doRenderCenter) x -= this.size.width/2;
        if(!this.doRenderCenter) y -= this.size.height/2;

        rect(x, y, this.shadowPosition, this.size.height);
    }

    renderOuterBar() {
        stroke(this.strokeColor.red, this.strokeColor.green, this.strokeColor.blue, this.strokeColor.alpha);
        strokeWeight(3);
        noFill();

        rectMode(CENTER);

        let x = this.position.x;
        let y = this.position.y;
        if(this.doRenderRelative) {
            let relativePosition = worldToScreenPoint({x: x, y: y});
            x = relativePosition.x;
            y = relativePosition.y;
        }

        rect(x, y, this.size.width, this.size.height);
    }

    renderInnerBar() {
        noStroke();
        fill(this.color.red, this.color.green, this.color.blue, this.color.alpha);

        rectMode(CENTER);
        if(!this.doRenderCenter) rectMode(CORNER);

        let x = this.position.x;
        let y = this.position.y;
        if(!this.doRenderCenter) x -= this.size.width/2;
        if(!this.doRenderCenter) y -= this.size.height/2;

        if(this.doRenderRelative) {
            let relativePosition = worldToScreenPoint({x: x, y: y});
            x = relativePosition.x;
            y = relativePosition.y;
        }

        rect(x, y, this.getBarLength(true), this.size.height);
    }

    // utils

    capValue() {
        if(this.value < 0) this.value = 0;
        if(this.value > this.maxValue) this.value = this.maxValue;
    }

    getBarLength(getSmooth = false) {
        if(getSmooth) return map(this.smoothValue, 0, this.maxValue, 0, this.size.width);
        return map(this.value, 0, this.maxValue, 0, this.size.width);
    }
}