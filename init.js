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
            if (current_array[p].Trigger() == false) {
                current_array.splice(p, 1);
                p--;
            }
        }
    }

    requestAnimationFrame(ScreenTimer);
}


ctx.drawImage(space_image, 0, 0, canvas.width - 1, canvas.height - 1);


ScreenTimer();

var spaces = 50;

var ship_object = new ship();
array_ship.push(ship_object);

var hitbox_object = new hitbox_ship();
array_hitbox.push(hitbox_object);

for (var i = 0; i < 10; i++) {
    var alien_object = new alien(spaces);
    array_alien.push(alien_object);
    spaces += 50;
}

window.onkeydown = function (e) {
    if (array_ship[0]) {
        if (!isFired) {
            if (event.keyCode == 32) {
                // spacebar
                ball_interval = setInterval(function () {
                    shoot(globalX, globalY);
                }, 80);
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