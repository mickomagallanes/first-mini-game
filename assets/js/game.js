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

    if (rect1.x < rect2.hitbox_x + rect2.hitbox_width &&
        rect1.x + rect1.width > rect2.hitbox_x &&
        rect1.y < rect2.hitbox_y + rect2.hitbox_height &&
        rect1.y + rect1.height > rect2.hitbox_y) {
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