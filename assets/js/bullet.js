class bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.dx = angle;
        this.dy = -18;
        this.isDead = 0;

        this.hitbox_width = BULLET_SIZE - 20;
        this.hitbox_height = BULLET_SIZE - 10;
        this.hitbox_x = this.x - (this.hitbox_width / 2);
        this.hitbox_y = this.y - (this.hitbox_height / 2);
    }

    Trigger() {
        if (this.y + this.dy >= 0 && !this.isDead) {
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
        CTX.beginPath();
        CTX.rect(this.hitbox_x, this.hitbox_y, this.hitbox_width, this.hitbox_height);
        CTX.fillStyle = "red";
        CTX.fill();
    }

    drawBullet() {
        CTX.drawImage(BULLET_IMAGE, this.x - (BULLET_SIZE / 2), this.y - (BULLET_SIZE / 2), BULLET_SIZE, BULLET_SIZE);
    }
}