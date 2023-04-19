var score;
var gui;
var playersHp;

function setup() {
    createCanvas(windowWidth, windowHeight);
    entitiesManager = new EntitiesManager();

    entitiesManager.addEntity(new EnemySpawner());
    entitiesManager.addEntities(getPlayers());
    entitiesManager.addEntity(new Saber(entitiesManager.getPlayers()));
    entitiesManager.addEntity(new GuiRenderer());

    playersHp = 100;
    score = 0;
}

function draw() {
    background(200);

    // updating
    this.entitiesManager.update();
    
    // rendering
    this.entitiesManager.render();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// FUNCTIONS //

function particleEffect(x, y, amount, color) {
    for(let i = 0; i < amount; i++) {
        entitiesManager.addEntity(getParticle(x, y, color));
    }
}

function getParticle(x, y, color) {
    return new Particle({
        position: {
            x: x,
            y: y
        },
        color: color
    });
}

function getTextParticle(x, y, color, text) {
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

function getPlayers() {
    let p1 = new Player({
        position: {
            x: width/4,
            y: height/2
        },
        color: {
            red: 51,
            green: 200,
            blue: 200
        },
        diameter: 60
    });

    let p2 = new Player({
        position: {
            x: width/2 + width/4,
            y: height/2
        },
        color: {
            red: 100,
            green: 51,
            blue: 200
        },
        keys: {
            up: 38,
            down: 40,
            left: 37,
            right: 39
        },
        diameter: 60
    });

    return [p1, p2];
}

function addPoints(x, y, amount) {
    if(amount == 0) return;
    if(amount < 0) {
        entitiesManager.addEntity(getTextParticle(x, y, {red:200,green:50,blue:50}, amount))
    } else {
        entitiesManager.addEntity(getTextParticle(x, y, {red:50,green:200,blue:50}, "+" + amount))
    }

    score += amount;
    if(score < 0) score = 0;
}