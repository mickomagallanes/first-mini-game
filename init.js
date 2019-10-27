function ScreenTimer() {
    // clear drawings
    ctx.drawImage(space_image, 0, 0, canvas.width, canvas.height);

    for (var i = 0; i < all_array.length; i++) {
        var current_array = all_array[i];

        for (var p = 0; p < current_array.length; p++) {
            if ("checkIfDead" in current_array[p]) {
                current_array[p].checkIfDead();
            }

            // remove to array when dead
            if (current_array[p].Trigger() == false || checkIfEntityIsOutside(current_array[p])) {
                current_array.splice(p, 1);
                p--;
            }

            if (isGameOver) {
                setTimeout(function () {
                    resetGame();
                    cancelAnimationFrame(requestId);
                    return;
                }, 2000);
                isGameOver = false;
            }

        }
    }

    requestId = requestAnimationFrame(ScreenTimer);
}


ctx.drawImage(space_image, 0, 0, canvas.width, canvas.height);

function init() {
    ScreenTimer();

    var ship_object = new ship();
    array_ship.push(ship_object);


    setTimeout(function () {
        //pattern1();
        //pattern_surprise1();
        pattern_alien2();
    }, 4000);

    // pattern1();
    // pattern_alien2();
    // pattern_surprise1();
    window.onkeydown = function (e) {
        if (array_ship[0]) {
            if (!isFired) {
                if (event.keyCode == 32) {
                    // spacebar
                    ball_interval = setInterval(function () {
                        shoot(globalX, globalY);
                        //shoot(globalX - 10, globalY);
                        //shoot(globalX + 10, globalY);
                        // shoot(globalX - 20, globalY);
                        // shoot(globalX + 20, globalY);
                        // shoot(globalX - 30, globalY, 5);
                        // shoot(globalX + 30, globalY, -5);
                    }, 180);
                }
                isFired = true;
            }

            checkMove();
        }

    };

    window.onkeyup = function (e) {
        isFired = false;
        if (event.keyCode == 32) {
            // spacebar
            clearInterval(ball_interval);
        }
    };
}

window.onkeydown = function (e) {
    if (event.keyCode == 13) {
        this.document.getElementById("welcome").style.display = "none";
        this.init();
    }
}

function resetGame() {

    this.document.getElementById("welcome").style.display = "block";

    this.document.getElementById("welcome").innerHTML = "GAME OVER, PRESS ENTER TO PLAY AGAIN";

    console.log(timeout_array.length);
    for (var i = 0; i < timeout_array.length; i++) {
        clearTimeout(timeout_array[i]);
        timeout_array.splice(i, 1);
    }

    isGameOver = false;
    ship_x = canvas.width / 2;
    ship_y = canvas.height - 50;
    globalX = ship_x; // location of ship when it moves
    globalY = ship_y; // location of ship when it moves
    array_bullet = [];
    array_alien = [];
    array_explode = [];
    array_ship = [];
    array_hitbox = [];
    all_array = [
        array_bullet,
        array_explode,
        array_alien,
        array_ship,
        array_hitbox
    ]; // for looping purpose

    ctx.drawImage(space_image, 0, 0, canvas.width, canvas.height);

    window.onkeydown = function (e) {
        if (event.keyCode == 13) {
            this.document.getElementById("welcome").style.display = "none";
            this.init();
        }
    }

}