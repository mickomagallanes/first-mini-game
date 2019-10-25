class ship {
    constructor() {
        this.x = ship_x;
        this.y = ship_y;
        this.dx = 0;
        this.dy = 0;
        this.isDead = 0;
        this.hitbox_width = ship_size / 2;
        this.hitbox_height = ship_size - 10;
        this.hitbox_x = globalX - this.hitbox_width / 2;
        this.hitbox_y = globalY - this.hitbox_height / 2;

    }

    Trigger() {
        this.x = globalX;
        this.y = globalY;
        this.hitbox_x = globalX - this.hitbox_width / 2;
        this.hitbox_y = globalY - this.hitbox_height / 2;
        if (!this.isDead) {
            this.drawShip();
            //this.drawHitbox();
        } else {
            triggerExplode(this);
            return false;
        }

        return true;
    }

    drawHitbox() {
        ctx.beginPath();
        ctx.rect(this.hitbox_x, this.hitbox_y, this.hitbox_width, this.hitbox_height);
        ctx.fillStyle = "red";
        ctx.fill();

    }

    checkIfDead() {
        for (var i = 0; i < array_alien.length; i++) {
            if (rect2rect_intersects(this, array_alien[i])) {
                // set alien and bullet dead
                this.isDead = 1;
                array_alien[i].isDead = 1;
                clearInterval(ball_interval);
            }
        }
    }

    drawShip() {
        ctx.drawImage(ship_image, this.x - 40, this.y - 40, ship_size, ship_size);
    }
}