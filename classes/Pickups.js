class Health extends Pickup {
    constructor(x, y) {
        super(x, y, 40, {red:180,green:51,blue:100});
    }

    pick() {
        playersHp += round(random(10, 20));
        if(playersHp > 100) playersHp = 100;
    }
}

class Score extends Pickup {
    constructor(x, y) {
        super(x, y, 30, {red:51,green:51,blue:51});
    }

    pick() {
        addPoints(this.position.x, this.position.y, round(random(10, 20)));
    }
}

class Ghost extends Pickup {
    constructor(x, y) {
        super(x, y, 30, {red:100,green:51,blue:120});
    }

    pick(player) {
        player.powerups.ghost += 8 * 60;
    }
}