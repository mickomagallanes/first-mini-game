class bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.dx = angle;
        this.dy = -14;
        this.isDead = 0;

        this.hitbox_width = bullet_size - 20;
        this.hitbox_height = bullet_size - 10;
        this.hitbox_x = this.x - (this.hitbox_width / 2);
        this.hitbox_y = this.y - (this.hitbox_height / 2);
    }

    Trigger() {
        if (this.y > 0 && !this.isDead) {
            this.y += this.dy;

            if (this.dx != undefined) {
                this.x -= this.dx;
            }

            this.hitbox_x = this.x - (this.hitbox_width / 2);
            this.hitbox_y = this.y - (this.hitbox_height / 2);

            //this.drawHitbox();
            this.drawBullet();


        } else return false;

        return true;
    }

    drawHitbox() {
        ctx.beginPath();
        ctx.rect(this.hitbox_x, this.hitbox_y, this.hitbox_width, this.hitbox_height);
        ctx.fillStyle = "red";
        ctx.fill();
    }

    drawBullet() {
        ctx.drawImage(bullet_image, this.x - (bullet_size / 2), this.y - (bullet_size / 2), bullet_size, bullet_size);
    }
}