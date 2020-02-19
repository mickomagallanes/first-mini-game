class ship {
    constructor() {
        this.x = SHIP_X;
        this.y = SHIP_Y;
        this.dx = 0;
        this.dy = 0;
        this.size = SHIP_SIZE;
        this.isDead = 0;
        this.hitbox_width = this.size / 2;
        this.hitbox_height = this.size - 10;
        this.hitbox_x = GLOBAL_X - this.hitbox_width / 2;
        this.hitbox_y = GLOBAL_Y - this.hitbox_height / 2;

    }

    Trigger() {
        this.x = GLOBAL_X;
        this.y = GLOBAL_Y;
        this.hitbox_x = GLOBAL_X - this.hitbox_width / 2;
        this.hitbox_y = GLOBAL_Y - this.hitbox_height / 2;
        if (!this.isDead) {
            this.drawShip();
            //this.drawHitbox();
        } else {
            triggerExplode(this);
            IS_GAME_OVER = true;
            return false;
        }

        return true;
    }

    drawHitbox() {
        CTX.beginPath();
        CTX.rect(this.hitbox_x, this.hitbox_y, this.hitbox_width, this.hitbox_height);
        CTX.fillStyle = "red";
        CTX.fill();

    }

    checkIfDead() {
        for (var i = 0; i < ARRAY_ALIEN.length; i++) {
            if (rect2rect_intersects(this, ARRAY_ALIEN[i])) {
                // set alien and bullet dead
                //this.isDead = 1;
                ARRAY_ALIEN[i].isDead = 1;
                //clearInterval(BALL_INTERVAL);
            }
        }
    }

    drawShip() {
        CTX.drawImage(SHIP_IMAGE, this.x - 40, this.y - 40, this.size, this.size);
    }
}