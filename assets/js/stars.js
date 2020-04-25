class stars {
    constructor(x, img, starRadius) {
        this.x = x;
        this.y = -50;
        this.dy = 2.5;
        this.starRadius = starRadius;
        this.img = img;
    }

    Trigger() {
        this.y += this.dy;

        this.drawStar();

        return true;
    }


    drawStar() {
        CTX.drawImage(this.img, this.x, this.y, this.starRadius, this.starRadius);
    }
}