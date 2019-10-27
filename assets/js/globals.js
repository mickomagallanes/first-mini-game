var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var ship_x = canvas.width / 2;
var ship_y = canvas.height - 50;
var ship_size = 80;
var ship_radius = ship_size / 2;

var alien_size = 55;

var alien_image = new Image();
alien_image.src = "assets/img/alien.png";

var alien_image2 = new Image();
alien_image2.src = "assets/img/alien2.png";

var bullet_image = new Image();
bullet_image.src = "assets/img/bullet.png";

var bullet_size = 30;

var isGameOver = false;

var requestId = undefined;

var globalX = ship_x; // location of ship when it moves
var globalY = ship_y; // location of ship when it moves

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

var timeout_array = [];

var ball_interval; // setInterval of shoot when mouse pressed

var isFired = false; // prevents spacebar shoot from being stucked

var ship_image = new Image();
ship_image.src = "assets/img/ship.png";



var explosion_image = new Image();
explosion_image.src = "assets/img/explode.png";

var explode_sound = new Audio("assets/mp3/explode.mp3");
var gun_sound = new Audio("assets/mp3/gun.mp3");

var space_image = new Image();
space_image.src = "assets/img/space.jpg";


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