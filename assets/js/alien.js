class alien {
    // life_func is for alien who have multiple life
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
        this.size = ALIEN_SIZE;
        this.y = -50;
        this.isDead = 0;
        this.hitbox_width = this.size - 6;
        this.hitbox_height = this.size - 35;
        this.hitbox_x = this.x - (this.hitbox_width / 2);
        this.hitbox_y = this.y - (this.hitbox_height / 2);
    }

    checkIfDead() {
        for (var i = 0; i < ARRAY_BULLET.length; i++) {

            if (rect2rect_intersects(ARRAY_BULLET[i], this)) {
                if (!this.life_func(ARRAY_BULLET[i])) {
                    addScore();
                    // set alien and bullet dead
                    this.isDead = 1;
                    ARRAY_BULLET[i].isDead = 1;
                }

            }
        }

    }

    Trigger() {

        if (!this.isDead) {

            this.movement_func();

            this.hitbox_x = this.x - (this.hitbox_width / 2);
            this.hitbox_y = this.y - (this.hitbox_height / 2);
            //this.drawHitbox();
            this.drawAlien();

            return true;
        } else {
            triggerExplode(this);
            return false;
        }


    }

    drawHitbox() {
        CTX.beginPath();
        CTX.rect(this.hitbox_x, this.hitbox_y, this.hitbox_width, this.hitbox_height);
        CTX.fillStyle = "green";
        CTX.fill();

    }

    drawAlien() {
        CTX.drawImage(this.alien_img, this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);
    }

}