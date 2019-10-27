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
        }
    }

    requestAnimationFrame(ScreenTimer);
}


ctx.drawImage(space_image, 0, 0, canvas.width - 1, canvas.height - 1);


ScreenTimer();

var spaces = 50;

var ship_object = new ship();
array_ship.push(ship_object);


setTimeout(function () {
    pattern1();
    //pattern_surprise1();
    //pattern_alien2();
}, 4000);

//pattern1();
//pattern2();

window.onkeydown = function (e) {
    if (array_ship[0]) {
        if (!isFired) {
            if (event.keyCode == 32) {
                // spacebar
                ball_interval = setInterval(function () {
                    shoot(globalX, globalY);
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