class alien {
    constructor(x) {
        this.x = x;
        this.y = 50;
        this.radius = 20;
        this.isDead = 0;
    }

    checkIfDead() {
        for (var i = 0; i < array_bullet.length; i++) {
            var distancex = this.x - array_bullet[i].x;
            var distancey = this.y - array_bullet[i].y;
            var distance = Math.sqrt(distancex * distancex + distancey * distancey);
            if (distance < this.radius + array_bullet[i].radius) {
                // set alien and bullet dead
                this.isDead = 1;
                array_bullet[i].isDead = 1;
            }
        }
    }

    Trigger() {
        if (!this.isDead) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.closePath();
        } else {
            triggerExplode(this);
            return false;
        }

        return true;
    }
}