function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor();
    debug = false;
    paused = false;
    
    entitiesManager = new EntitiesManager();

    entitiesManager.addEntity(new DebugHandler());
    entitiesManager.addEntity(new EnemySpawner());
    entitiesManager.addEntities(getPlayers());
    entitiesManager.addEntity(new Saber(entitiesManager.getPlayers()));
    entitiesManager.addEntity(new GuiRenderer());
    entitiesManager.addEntity(new ParticleSystem());
    entitiesManager.addEntity(new PickupSpawner());

    playersHp = 100;
    score = 0;
}

function draw() {
    background(200);

    // updating
    if(!paused) this.entitiesManager.update();
    
    // rendering
    this.entitiesManager.render();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function keyTyped() {
    if(paused) {
        entitiesManager.getLogger().type(key);
        return;
    }
    if(key == "c") {
        this.debug = !this.debug;
        if(this.debug) logm("console enabled");
    }
    if(key == "p") {
        paused = true;
        if(paused) logm("game paused");
    }
}

// FUNCTIONS //

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

function addHealth(x, y, amount) {
    if(amount == 0) return;
    let particleSystem = entitiesManager.getParticleSystem();
    if(amount > 0) {
        entitiesManager.addEntity(particleSystem.getTextParticle(x, y, {red:51,green:200,blue:51}, "+" + amount));
    } else {
        entitiesManager.addEntity(particleSystem.getTextParticle(x, y, {red:200,green:51,blue:51}, amount));
    }

    playersHp += amount;
}

function addPoints(x, y, amount) {
    if(amount == 0) return;
    let particleSystem = entitiesManager.getParticleSystem();
    let text = "+" + amount;
    if(amount < 0) text = amount;

    entitiesManager.addEntity(particleSystem.getTextParticle(x, y, {red:51,green:51,blue:51}, text));

    score += amount;
    if(score < 0) score = 0;
}

function logm(message) {
    entitiesManager.getLogger().log(message);
}