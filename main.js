var entities;
var saber;
var players;
var score;
var gui;
var playersHp;

function setup() {
    createCanvas(windowWidth, windowHeight);
    entities = [];
    gui = new GuiRenderer();

    players = getPlayers();
    saber = new Saber(players);
    
    entities.push(saber);
    for(let player of players) {
        entities.push(player);
    }

    playersHp = 100;
    score = 0;
}

function draw() {
    background(200);

    // updating
    for(let i = entities.length - 1; i >= 0; i--) {
        let entity = entities[i];

        entity.update();
        if(entity.isAlive != null) {
            if(!entity.isAlive) entities.splice(i, 1);
        }
    }
    gui.update();
    
    // rendering
    for(let entity of entities) {
        entity.render();
    }
    gui.render();

    // temporary enemy spawner
    if(frameCount % 30 == 0) {
        entities.push(getEnemy());
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

// FUNCTIONS //

function getEnemy() {
    return new Enemy(random(width), random(height), saber, players);
}

function particleEffect(x, y, amount, color) {
    for(let i = 0; i < amount; i++) {
        entities.push(getParticle(x, y, color));
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
        entities.push(getTextParticle(x, y, {red:200,green:50,blue:50}, amount))
    } else {
        entities.push(getTextParticle(x, y, {red:50,green:200,blue:50}, "+" + amount))
    }

    score += amount;
    if(score < 0) score = 0;
}