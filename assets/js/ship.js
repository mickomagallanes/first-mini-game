class ship {
    constructor() {
        this.x = ship_x;
        this.y = ship_y;
        this.dx = 0;
        this.dy = 0;
        this.isDead = 0;
    }

    Trigger() {
        this.x = globalX;
        this.y = globalY;
        if (!this.isDead) {
            ctx.drawImage(ship_image, this.x - 40, this.y - 40, ship_size, ship_size);
        } else {
            triggerExplode(this);
            return false;
        }

        return true;
    }
}

class hitbox_ship {
    constructor() {
        this.width = ship_size / 2;
        this.height = ship_size - 10;
        this.x = globalX - this.width / 2;
        this.y = globalY - this.height / 2;
    }

    Trigger() {
        // update hitbox, come up with the ship
        this.x = globalX - this.width / 2;
        this.y = globalY - this.height / 2;
        if (!this.isDead) {
            // ctx.beginPath();
            // ctx.rect(this.x, this.y, this.width, this.height);
            // ctx.fillStyle = "red";
            // ctx.fill();

            return true;
        } else return false;


    }

    checkIfDead() {
        for (var i = 0; i < array_alien.length; i++) {
            if (rect2rect_intersects(this, array_alien[i])) {
                // set alien and bullet dead
                this.isDead = 1;
                array_alien[i].isDead = 1;
                array_ship[0].isDead = 1;
                clearInterval(ball_interval);
            }
        }
    }
}