class bonus {
    constructor(x, bonus_img, bonus_function) {

        this.x = x;
        this.bonus_function = bonus_function;
        this.bonus_img = bonus_img;
        this.y = -50;
        this.isDead = 0;
        this.hitbox_width = BONUS_SIZE;
        this.hitbox_height = BONUS_SIZE;
        this.hitbox_x = this.x - (this.hitbox_width / 2);
        this.hitbox_y = this.y - (this.hitbox_height / 2);
    }

    movementFunc() {
        if (!this.isChecked) {
            this.roll_dice = roll_2_sides();

        }
        this.isChecked = true;

        // bounce off to walls
        if (this.x <= -5) {
            this.x += 5;
            this.roll_dice = invertDice(this.roll_dice);
        } else if (this.x >= CANVAS.width + 5) {
            this.x -= 5;
            this.roll_dice = invertDice(this.roll_dice);
        }


        if (this.roll_dice) {
            this.x -= 2.7;
        } else {
            this.x += 2.7;
        }

        this.y += 0.6;

    }

    checkIfDead() {
        if (rect2rect_intersects(ARRAY_SHIP[0], this)) {
            triggerBonusEffect(ARRAY_SHIP[0]);
            this.bonus_function();
            this.isDead = 1;

        }

    }

    Trigger() {

        if (!this.isDead) {

            this.movementFunc();

            this.hitbox_x = this.x - (this.hitbox_width / 2);
            this.hitbox_y = this.y - (this.hitbox_height / 2);
            // this.drawHitbox();
            this.drawBonus();

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

    drawBonus() {
        CTX.drawImage(this.bonus_img, this.x - (BONUS_SIZE / 2), this.y - (BONUS_SIZE / 2), BONUS_SIZE, BONUS_SIZE);
    }

}