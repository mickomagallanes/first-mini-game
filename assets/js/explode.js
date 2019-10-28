class explode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.isDead = 0;
        this.sprite_x = 0;
        this.sprite_y = 0;
        this.counter = 0; // to make the animation of explosion slower
    }

    Trigger() {
        if (!this.isDead) {
            // remove object if sprite reaches the last
            if (this.sprite_x / 128 == 4 && this.sprite_y / 128 == 4) {
                this.isDead = 1;
            }
            // switch to lower part of sprite
            else if (this.sprite_x / 128 == 4) {
                this.sprite_x = 0;
                this.sprite_y += 128;
            }

            ctx.drawImage(
                explosion_image,
                this.sprite_x,
                this.sprite_y,
                128,
                128,
                this.x - 40,
                this.y - 40,
                80,
                80
            );

            // for slower animation
            if (this.counter == 2) {
                this.sprite_x += 128;
                this.counter = 0;
            } else {
                this.counter++;
            }
        } else return false;

        return true;
    }
}