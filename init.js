window.onkeydown = function (e) {
    if (event.keyCode == 13) {
        this.document.getElementById("welcome").style.display = "none";
        this.startGame();
    }
}

this.document.getElementById("scoreboard").style.display = "none";
this.document.getElementById("labelScore").style.display = "none";
CTX.drawImage(SPACE_IMAGE, 0, 0, CANVAS.width, CANVAS.height);


function ScreenTimer() {
    // clear drawings
    CTX.drawImage(SPACE_IMAGE, 0, 0, CANVAS.width, CANVAS.height);

    this.document.getElementById("scoreboard").innerHTML = SCOREBOARD;

    checkSpawner();

    for (var i = 0; i < ALL_ARRAY.length; i++) {
        var current_array = ALL_ARRAY[i];

        for (var p = 0; p < current_array.length; p++) {
            if ("checkIfDead" in current_array[p]) {
                current_array[p].checkIfDead();
            }

            // remove to array when dead
            if (current_array[p].Trigger() == false || checkIfEntityIsOutside(current_array[p])) {
                current_array.splice(p, 1);
                p--;
            }

        }
    }

    if (IS_GAME_OVER) {
        setTimeout(function () {
            resetGame();
            cancelAnimationFrame(REQUEST_ID);
            return;
        }, 2000);
        IS_GAME_OVER = false;
    }

    REQUEST_ID = requestAnimationFrame(ScreenTimer);
}

function startGame() {


    var ship_object = new ship();
    ARRAY_SHIP.push(ship_object);

    setDefaultBullet();
    spawnEnemies();

    rollRoundBonus();

    ScreenTimer();


    this.document.getElementById("scoreboard").style.display = "block";
    this.document.getElementById("labelScore").style.display = "block";

    this.document.getElementById("scoreboard").innerHTML = SCOREBOARD;


    window.onkeydown = function (e) {
        if (ARRAY_SHIP[0]) {
            if (!IS_FIRED) {
                if (event.keyCode == 32) {
                    // spacebar
                    BALL_INTERVAL = setInterval(function () {
                        CURRENT_BALL_FUNCTION();
                        //shoot(GLOBAL_X, GLOBAL_Y);
                        // shoot(GLOBAL_X - 10, GLOBAL_Y);
                        // shoot(GLOBAL_X + 10, GLOBAL_Y);
                        // shoot(GLOBAL_X - 20, GLOBAL_Y);
                        // shoot(GLOBAL_X + 20, GLOBAL_Y);
                        // //shoot(GLOBAL_X - 30, GLOBAL_Y, 5);
                        // //shoot(GLOBAL_X + 30, GLOBAL_Y, -5);
                        // shoot(GLOBAL_X - 40, GLOBAL_Y);
                        // shoot(GLOBAL_X + 40, GLOBAL_Y);
                        // shoot(GLOBAL_X - 60, GLOBAL_Y);
                        // shoot(GLOBAL_X + 60, GLOBAL_Y);
                        // shoot(GLOBAL_X - 80, GLOBAL_Y);
                        // shoot(GLOBAL_X + 80, GLOBAL_Y);
                        // shoot(GLOBAL_X - 100, GLOBAL_Y);
                        // shoot(GLOBAL_X + 100, GLOBAL_Y);
                        // shoot(GLOBAL_X - 120, GLOBAL_Y);
                        // shoot(GLOBAL_X + 120, GLOBAL_Y);
                        // shoot(GLOBAL_X - 140, GLOBAL_Y);
                        // shoot(GLOBAL_X + 140, GLOBAL_Y);
                        // shoot(GLOBAL_X - 160, GLOBAL_Y);
                        // shoot(GLOBAL_X + 160, GLOBAL_Y);
                        // shoot(GLOBAL_X - 180, GLOBAL_Y);
                        // shoot(GLOBAL_X + 180, GLOBAL_Y);
                        // shoot(GLOBAL_X - 200, GLOBAL_Y);
                        // shoot(GLOBAL_X + 200, GLOBAL_Y);
                    }, 180);
                }
                IS_FIRED = true;
            }

            checkMove();
        }

    };

    window.onkeyup = function (e) {
        IS_FIRED = false;
        if (event.keyCode == 32) {
            // spacebar
            clearInterval(BALL_INTERVAL);
        }
    };
}

// push a method inside arrays and it will be executed by checkSpawner()
function spawnEnemies() {

    for (var i = 0; i <= 100; i++) {
        SPAWNER_ARRAY.push(pattern1);
        SPAWNER_ARRAY.push(pattern_surprise1);
        SPAWNER_ARRAY.push(pattern_alien2);
    }
}

function checkSpawner() {

    if (LAUNCH_NEXT_WAVE && SPAWNER_COUNTER < SPAWNER_ARRAY.length) {
        console.log(CURRENT_ROUND_BONUS + " reounfas");
        if (CURRENT_ROUND_BONUS == null && SPAWNER_COUNTER % 3 == 0) {
            rollRoundBonus();
        }
        if (CURRENT_ROUND_BONUS == SPAWNER_COUNTER) {

            CURRENT_ROUND_BONUS = null;

            let timeout_func = function () {
                spawn_bonus_2x();
            }

            setTimeoutAndSave(timeout_func, roll_thousands(9, 58));
        }

        let timeout_func = function () {
            SPAWNER_ARRAY[SPAWNER_COUNTER]();
            SPAWNER_COUNTER++;
        }

        setSpawnerTimeoutAndSave(timeout_func, 6000);


        LAUNCH_NEXT_WAVE = false;

    }

}

function resetGame() {

    this.document.getElementById("welcome").style.display = "block";

    this.document.getElementById("welcome").innerHTML = "Game over, press ENTER to play again";

    for (var i = 0; i < TIMEOUT_ARRAY.length; i++) {
        clearTimeout(TIMEOUT_ARRAY[i]);

    }

    for (var i = 0; i < SPAWNER_TIMEOUT_ARRAY.length; i++) {
        clearTimeout(SPAWNER_TIMEOUT_ARRAY[i]);

    }

    SPAWNER_TIMEOUT_ARRAY = [];

    LAUNCH_NEXT_WAVE = true;

    SPAWNER_COUNTER = 0;

    IS_GAME_OVER = false;
    SHIP_X = CANVAS.width / 2;
    SHIP_Y = CANVAS.height - 50;
    GLOBAL_X = SHIP_X; // location of ship when it moves
    GLOBAL_Y = SHIP_Y; // location of ship when it moves
    ARRAY_BULLET = [];
    ARRAY_ALIEN = [];
    ARRAY_EXPLODE = [];
    ARRAY_SHIP = [];
    ARRAY_HITBOX = [];
    ARRAY_BONUS = [];
    ARRAY_BONUS_EXPLODE = [];
    ALL_ARRAY = [
        ARRAY_BULLET,
        ARRAY_EXPLODE,
        ARRAY_ALIEN,
        ARRAY_SHIP,
        ARRAY_HITBOX,
        ARRAY_BONUS,
        ARRAY_BONUS_EXPLODE
    ]; // for looping purpose

    SCOREBOARD = 0;

    TIMEOUT_ARRAY = [];

    SPAWNER_ARRAY = [];
    CTX.drawImage(SPACE_IMAGE, 0, 0, CANVAS.width, CANVAS.height);

    window.onkeydown = function (e) {
        if (event.keyCode == 13) {
            this.document.getElementById("welcome").style.display = "none";
            this.startGame();
        }
    }

}