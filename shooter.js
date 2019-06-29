var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var space_image = new Image();
space_image.src = "./space.jpg";
ctx.drawImage(space_image, 0, 0, canvas.width - 1, canvas.height - 1);

// ctx.fillStyle = "#ffffff";
// ctx.fillRect(0, 0, canvas.width - 1, canvas.height - 1);

var array_bullet = [];
var array_alien = [];
var array_explode = [];
var array_ship = [];
var array_hitbox = [];
var all_array = [
  array_bullet,
  array_explode,
  array_alien,
  array_ship,
  array_hitbox
]; // for looping purpose

var ball_interval; // setInterval of shoot when mouse pressed

var isFired = false; // prevents spacebar shoot from being stucked

var ship_image = new Image();
ship_image.src = "./ship.png";

var ship_x = canvas.width / 2;
var ship_y = canvas.height - 50;
var ship_size = 80;
var ship_radius = ship_size / 2;

var explosion_image = new Image();
explosion_image.src = "./explode.png";

var explode_sound = new Audio("./explode.mp3");
var gun_sound = new Audio("./gun.mp3");

var globalX = ship_x; // location of ship when it moves
var globalY = ship_y; // location of ship when it moves

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

class alien {
  constructor(x) {
    this.x = x;
    this.y = 50;
    this.radius = 20;
    this.isDead = 0;
  }

  checkIfDead() {
    for (var i = 0; i < array_bullet.length; i++) {
      var distancex = this.x - array_bullet[i].x;
      var distancey = this.y - array_bullet[i].y;
      var distance = Math.sqrt(distancex * distancex + distancey * distancey);
      if (distance < this.radius + array_bullet[i].radius) {
        // set alien and bullet dead
        this.isDead = 1;
        array_bullet[i].isDead = 1;
      }
    }
  }

  Trigger() {
    if (!this.isDead) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "red";
      ctx.fill();
      ctx.closePath();
    } else {
      triggerExplode(this);
      return false;
    }

    return true;
  }
}

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

class explode {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.isDead = 0;
    this.sprite_x = 0;
    this.sprite_y = 0;
    this.counter = 0; // to make the animation of explosion slower
  }

  Trigger() {
    if (!this.isDead) {
      // remove object if sprite reaches the last
      if (this.sprite_x / 128 == 4 && this.sprite_y / 128 == 4) {
        this.isDead = 1;
      }
      // switch to lower part of sprite
      else if (this.sprite_x / 128 == 4) {
        this.sprite_x = 0;
        this.sprite_y += 128;
      }

      ctx.drawImage(
        explosion_image,
        this.sprite_x,
        this.sprite_y,
        128,
        128,
        this.x - 40,
        this.y - 40,
        80,
        80
      );

      // for slower animation
      if (this.counter == 2) {
        this.sprite_x += 128;
        this.counter = 0;
      } else {
        this.counter++;
      }
    } else return false;

    return true;
  }
}

class ship {
  constructor() {
    this.x = ship_x;
    this.y = ship_y;
    this.dx = 0;
    this.dy = 0;
    this.isDead = 0;
  }

  Trigger() {
    this.x = globalX;
    this.y = globalY;
    if (!this.isDead) {
      ctx.drawImage(ship_image, this.x - 40, this.y - 40, ship_size, ship_size);
    } else {
      triggerExplode(this);
      return false;
    }

    return true;
  }
}

class hitbox {
  constructor() {
    this.width = ship_size / 2;
    this.height = ship_size - 10;
    this.x = globalX - this.width / 2;
    this.y = globalY - this.height / 2;
  }

  Trigger() {
    // update hitbox, come up with the ship
    this.x = globalX - this.width / 2;
    this.y = globalY - this.height / 2;
    if (!this.isDead) {
      ctx.rect(this.x, this.y, this.width, this.height);
    } else return false;

    return true;
  }

  checkIfDead() {
    for (var i = 0; i < array_alien.length; i++) {
      if (intersects(array_alien[i], this)) {
        // set alien and bullet dead
        this.isDead = 1;
        array_alien[i].isDead = 1;
        array_ship[0].isDead = 1;
        clearInterval(ball_interval);
      }
    }
  }
}

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

function triggerExplode(entity) {
  var explode_object = new explode(entity.x, entity.y);
  array_explode.push(explode_object);

  // play explode sound
  explode_sound.pause();
  explode_sound.currentTime = 0;
  explode_sound.play();
  return false;
}

function init() {
  var spaces = 50;

  var ship_object = new ship();
  array_ship.push(ship_object);

  var hitbox_object = new hitbox();
  array_hitbox.push(hitbox_object);

  for (var i = 0; i < 10; i++) {
    var alien_object = new alien(spaces);
    array_alien.push(alien_object);
    spaces += 50;
  }
}

// use it like a timer
ScreenTimer();
init();

window.onkeydown = function(e) {
  if (array_ship[0]) {
    if (!isFired) {
      if (event.keyCode == 32) {
        // spacebar
        ball_interval = setInterval(function() {
          shoot(globalX, globalY);
        }, 80);
      }
      isFired = true;
    }

    checkMove();
  }
};

window.onkeyup = function(e) {
  isFired = false;
  if (event.keyCode == 32) {
    // spacebar
    clearInterval(ball_interval);
  }
};
