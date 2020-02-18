function shoot(x, y, angle) {
    var bullet_object = new bullet(x, y, angle);
    ARRAY_BULLET.push(bullet_object);

    // play gun sound
    GUN_SOUND.pause();
    GUN_SOUND.currentTime = 0;
    var promise = GUN_SOUND.play();

    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }
}

function checkMove() {
    // left
    if (event.keyCode == 37 && !(GLOBAL_X <= 0)) {
        GLOBAL_X -= 10;
    }
    // up
    else if (event.keyCode == 38 && !(GLOBAL_Y <= 0 + SHIP_RADIUS)) {
        GLOBAL_Y -= 10;
    }
    // right
    else if (event.keyCode == 39 && !(GLOBAL_X >= CANVAS.width)) {
        GLOBAL_X += 10;
    }
    // down
    else if (event.keyCode == 40 && !(GLOBAL_Y >= CANVAS.height - SHIP_RADIUS)) {
        GLOBAL_Y += 10;
    }
}

function circle2rect_intersects(circle, rect) {
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


function rect2rect_intersects(rect1, rect2) {

    if (rect1.hitbox_x < rect2.hitbox_x + rect2.hitbox_width &&
        rect1.hitbox_x + rect1.hitbox_width > rect2.hitbox_x &&
        rect1.hitbox_y < rect2.hitbox_y + rect2.hitbox_height &&
        rect1.hitbox_y + rect1.hitbox_height > rect2.hitbox_y) {
        return true;
    }
}



function triggerExplode(entity) {
    var explode_object = new explode(entity);
    ARRAY_EXPLODE.push(explode_object);

    // play explode sound
    EXPLODE_SOUND.pause();
    EXPLODE_SOUND.currentTime = 0;
    var promise = EXPLODE_SOUND.play();

    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }

    return false;
}

function triggerBonusEffect(entity) {
    var explode_object = new bonus_explode();
    ARRAY_BONUS_EXPLODE.push(explode_object);

    // play explode sound
    BONUS_SOUND.pause();
    BONUS_SOUND.currentTime = 0;
    var promise = BONUS_SOUND.play();

    if (promise !== undefined) {
        promise.then(_ => {
            // Autoplay started!
        }).catch(error => {
            // Autoplay was prevented.
            // Show a "Play" button so that user can start playback.
        });
    }

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

function roll_thousands(min, max) {
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000
}

function pattern1() {

    var movementFunc = function () {
        if (!this.isChecked) {
            this.roll_dice = roll_2_sides();
            this.roll_dec = roll_decimal(1, 60);
            this.roll_whole = roll_whole(4, 10);

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


        if (this.y + 80 >= CANVAS.height / 2) {

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

    var timeout = undefined;

    for (let i = 1; i <= ALIEN_QUANTITY; i++) {

        let spaces = roll_whole(20, 460);

        let timeout_func = function () {
            var alien_object = new alien(spaces, ALIEN_IMAGE, movementFunc);
            ARRAY_ALIEN.push(alien_object);

            if (i == ALIEN_QUANTITY) {
                LAUNCH_NEXT_WAVE = true;
            }
        };

        setTimeoutAndSave(timeout_func, i * 500);


    }




}

function pattern_surprise1() {

    var movementFunc = function () {
        if (!this.isChecked) {
            this.roll_dice = roll_2_sides();
            this.roll_dec = roll_decimal(1, 30);
            this.roll_whole = roll_whole(2, 5);

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


        if (this.y + 50 >= CANVAS.height / 2) {

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

            this.y += 10;
        }
    };

    var timeout = undefined;

    for (let i = 1; i <= ALIEN_QUANTITY; i++) {

        let spaces = roll_whole(20, 460);

        let timeout_func = function () {
            var alien_object = new alien(spaces, ALIEN_IMAGE, movementFunc);
            ARRAY_ALIEN.push(alien_object);

            if (i == ALIEN_QUANTITY) {
                LAUNCH_NEXT_WAVE = true;
            }

        };

        setTimeoutAndSave(timeout_func, i * 500);

    }



}

function pattern_alien2() {

    var movementFunc = function () {
        if (!this.isChecked) {
            this.roll_dice = roll_2_sides();
            this.roll_dec = roll_decimal(1, 20);
            this.roll_whole = roll_whole(1.2, 2.6);
            this.lives = 1;
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

        if (this.y + 80 >= CANVAS.height / 2) {

            if (this.roll_dice) {
                this.x += this.roll_dec;
            } else {
                this.x -= this.roll_dec;
            }

            this.y += this.roll_whole;

        } else {

            if (this.roll_dice) {
                this.x -= 0.6;
            } else {
                this.x += 0.6;
            }

            this.y += 1.2;
        }
    };

    var lifeFunc = function (bullet) {
        this.y -= 18;
        if (this.lives) {
            this.lives--;
            bullet.isDead = 1;
            return true
        } else {
            return false;
        }
    }

    var timeout = undefined;

    for (let i = 1; i <= ALIEN_QUANTITY; i++) {

        let spaces = roll_whole(20, 460);

        let timeout_func = function () {
            var alien_object = new alien(spaces, ALIEN_IMAGE2, movementFunc, lifeFunc);
            ARRAY_ALIEN.push(alien_object);

            if (i == ALIEN_QUANTITY) {
                LAUNCH_NEXT_WAVE = true;
            }

        };

        setTimeoutAndSave(timeout_func, i * 700);


    }



}

function spawn_bonus_2x() {

    let spaces = roll_whole(20, 460);

    let bonus_object = new bonus(spaces, BONUS_IMAGE_2X, setDoubleBullet);

    ARRAY_BONUS.push(bonus_object);

}

function setDoubleBullet() {
    CURRENT_BALL_FUNCTION = function () {
        shoot(GLOBAL_X - 20, GLOBAL_Y);
        shoot(GLOBAL_X + 20, GLOBAL_Y);
    }

    let timeout_func = function () {
        setDefaultBullet();
    };

    setTimeoutAndSave(timeout_func, 20000);
}

function setDefaultBullet() {
    CURRENT_BALL_FUNCTION = function () {
        shoot(GLOBAL_X, GLOBAL_Y);
    }

}

function checkIfEntityIsOutside(obj) {
    if (obj.x < -100 || obj.x > CANVAS.width + 100 || obj.y > CANVAS.height + 100 || obj.y < -100) {
        return true
    } else {
        return false;
    }
}

function addScore() {
    SCOREBOARD += 100;
}

function invertDice(die) {
    if (die) {
        return 0;
    } else {
        return 1;
    }
}

function setTimeoutAndSave(func, secs) {
    var timeout = setTimeout(func, secs);

    if (timeout) {
        TIMEOUT_ARRAY.push(timeout);
    }
}

function setSpawnerTimeoutAndSave(func, secs) {
    var timeout = setTimeout(func, secs);

    if (timeout) {
        SPAWNER_TIMEOUT_ARRAY.push(timeout);
    }
}