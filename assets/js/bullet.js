class bullet {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dx = 0;
        this.dy = -14;
        this.radius = 5;
        this.isDead = 0;
    }

    Trigger() {
        if (this.y > 0 && !this.isDead) {
            this.y += this.dy;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = "yellow";
            ctx.fill();
            ctx.closePath();
        } else return false;

        return true;
    }
}