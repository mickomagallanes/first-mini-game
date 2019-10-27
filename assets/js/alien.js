class alien {
    constructor(x, alien_img, movement_func, life_func) {
        this.movement_func = movement_func;

        if (life_func != undefined) {
            this.life_func = life_func;
        } else {
            this.life_func = function (x) {
                return false
            }
        }

        this.x = x;
        this.alien_img = alien_img;
        this.y = -50;
        this.radius = 20;
        this.isDead = 0;
        this.hitbox_width = alien_size - 6;
        this.hitbox_height = alien_size - 35;
        this.hitbox_x = this.x - (this.hitbox_width - 2);
        this.hitbox_y = this.y - (this.hitbox_height + 13);
    }

    checkIfDead() {
        for (var i = 0; i < array_bullet.length; i++) {

            if (intersects_alien(array_bullet[i], this)) {
                if (!this.life_func(array_bullet[i])) {
                    // set alien and bullet dead
                    this.isDead = 1;
                    array_bullet[i].isDead = 1;
                }

            }
        }

    }

    Trigger() {

        if (!this.isDead) {

            this.movement_func();

            this.hitbox_x = this.x - (this.hitbox_width - 2);
            this.hitbox_y = this.y - (this.hitbox_height + 13);

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
        ctx.drawImage(this.alien_img, this.x - 50, this.y - 50, alien_size, alien_size);
    }

}