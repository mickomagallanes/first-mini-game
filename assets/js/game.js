function shoot(x, y) {
    var bullet_object = new bullet(x, y);
    array_bullet.push(bullet_object);

    // play gun sound
    gun_sound.pause();
    gun_sound.currentTime = 0;
    gun_sound.play();
}

function checkMove() {
    // left
    if (event.keyCode == 37 && !(globalX <= 0)) {
        globalX -= 10;
    }
    // up
    else if (event.keyCode == 38 && !(globalY <= 0 + ship_radius)) {
        globalY -= 10;
    }
    // right
    else if (event.keyCode == 39 && !(globalX >= canvas.width)) {
        globalX += 10;
    }
    // down
    else if (event.keyCode == 40 && !(globalY >= canvas.height - ship_radius)) {
        globalY += 10;
    }
}

function intersects(circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.width / 2);
    var distY = Math.abs(circle.y - rect.y - rect.height / 2);

    if (distX > rect.width / 2 + circle.radius) {
        return false;
    }
    if (distY > rect.height / 2 + circle.radius) {
        return false;
    }

    if (distX <= rect.width / 2) {
        return true;
    }
    if (distY <= rect.height / 2) {
        return true;
    }

    var dx = distX - rect.width / 2;
    var dy = distY - rect.height / 2;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
}

function intersects_alien(circle, rect) {
    var distX = Math.abs(circle.x - rect.hitbox_x - rect.hitbox_width / 2);
    var distY = Math.abs(circle.y - rect.hitbox_y - rect.hitbox_height / 2);

    if (distX > rect.hitbox_width / 2 + circle.radius) {
        return false;
    }
    if (distY > rect.hitbox_height / 2 + circle.radius) {
        return false;
    }

    if (distX <= rect.hitbox_width / 2) {
        return true;
    }
    if (distY <= rect.hitbox_height / 2) {
        return true;
    }

    var dx = distX - rect.hitbox_width / 2;
    var dy = distY - rect.hitbox_height / 2;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
}

function rect2rect_intersects(rect1, rect2) {

    if (rect1.hitbox_x < rect2.hitbox_x + rect2.hitbox_width &&
        rect1.hitbox_x + rect1.hitbox_width > rect2.hitbox_x &&
        rect1.hitbox_y < rect2.hitbox_y + rect2.hitbox_height &&
        rect1.hitbox_y + rect1.hitbox_height > rect2.hitbox_y) {
        console.log("oo nga");
        return true;
    }
}



function triggerExplode(entity) {
    var explode_object = new explode(entity.x, entity.y);
    array_explode.push(explode_object);

    // play explode sound
    explode_sound.pause();
    explode_sound.currentTime = 0;
    explode_sound.play();
    return false;
}

function roll_2_sides() {
    return Math.floor(Math.random() * 2);
}

function roll_decimal(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min) / 10
}

function roll_whole(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min)
}

function pattern1() {



    var checkerCallback = function () {
        if (!this.isChecked) {
            this.roll_dice = roll_2_sides();
            this.roll_dec = roll_decimal(1, 60);
            this.roll_whole = roll_whole(2, 10);

        }
        this.isChecked = true;

        if (this.y + 80 >= canvas.height / 2) {

            if (this.roll_dice) {
                this.x += this.roll_dec;
            } else {
                this.x -= this.roll_dec;
            }

            this.y += this.roll_whole;

            //this.y += 5;
        } else {

            if (this.roll_dice) {
                this.x -= 0.9;
            } else {
                this.x += 0.9;
            }

            this.y += 2;
        }
    };

    for (let i = 1; i < 200; i++) {

        let spaces = roll_whole(150, 350);

        setTimeout(function timer() {
            var alien_object = new alien(spaces, checkerCallback);
            array_alien.push(alien_object);
        }, i * 500);
    }
}

function pattern2() {
    var spaces = 250;

    var checkerCallback = function () {
        if (this.y >= canvas.height / 2) {
            this.x += 0.6;
            this.y += 3.8;
        } else {
            this.x -= 0.9;
            this.y += 1.8;
        }
    };

    for (let i = 1; i < 20; i++) {
        setTimeout(function timer() {
            var alien_object = new alien(spaces, checkerCallback);
            array_alien.push(alien_object);
        }, i * 1000);
    }
}

function checkIfEntityIsOutside(obj) {
    if (obj.x < -100 || obj.x > canvas.width + 100 || obj.y > canvas.height + 100 || obj.y < -100) {
        return true
    } else {
        return false;
    }
}