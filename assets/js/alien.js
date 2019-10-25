class alien {
    constructor(x) {
        this.x = x;
        this.y = 50;
        this.radius = 20;
        this.isDead = 0;
        this.hitbox_width = (alien_size / 2) - 10;
        this.hitbox_height = alien_size - 65;
        this.hitbox_x = this.x - this.hitbox_width / 2;
        this.hitbox_y = this.y - this.hitbox_height / 2;
    }

    checkIfDead() {
        for (var i = 0; i < array_bullet.length; i++) {

            if (intersects_alien(array_bullet[i], this)) {
                // set alien and bullet dead
                this.isDead = 1;
                array_bullet[i].isDead = 1;
            }
        }

    }

    Trigger() {
        if (!this.isDead) {
            //this.drawHitbox();
            this.drawAlien();
            return true;
        } else {
            triggerExplode(this);
            return false;
        }


    }

    drawHitbox() {
        ctx.beginPath();
        ctx.rect(this.hitbox_x, this.hitbox_y, this.hitbox_width, this.hitbox_height);
        ctx.fillStyle = "green";
        ctx.fill();

    }

    drawAlien() {
        ctx.drawImage(alien_image, this.x - 50, this.y - 50, alien_size, alien_size);
    }

}