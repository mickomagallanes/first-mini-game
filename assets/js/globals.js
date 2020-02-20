var CANVAS = document.getElementById("myCanvas");
var CTX = CANVAS.getContext("2d");
var SHIP_X = CANVAS.width / 2;
var SHIP_Y = CANVAS.height - 50;
var SHIP_SIZE = 80;
var SHIP_RADIUS = SHIP_SIZE / 2;

var ALIEN_SIZE = 55;

var ALIEN_IMAGE = new Image();
ALIEN_IMAGE.src = "assets/img/alien.png";

var ALIEN_IMAGE2 = new Image();
ALIEN_IMAGE2.src = "assets/img/alien2.png";

var BULLET_IMAGE = new Image();
BULLET_IMAGE.src = "assets/img/bullet.png";

var BONUS_IMAGE_2X = new Image();
BONUS_IMAGE_2X.src = "assets/img/2x-coin.png";

var BONUS_SIZE = 48;

var BULLET_SIZE = 30;

var IS_GAME_OVER = false;

var REQUEST_ID = undefined;

var LAUNCH_NEXT_WAVE = true

var SPAWNER_COUNTER = 0;

var ROUND_COUNTER = 0;

var SPAWNER_TIMEOUT_ARRAY = [];

var ALIEN_QUANTITY = 125;

var SCOREBOARD = 0;

var GLOBAL_X = SHIP_X; // location of ship when it moves
var GLOBAL_Y = SHIP_Y; // location of ship when it moves

var ARRAY_BULLET = [];
var ARRAY_ALIEN = [];
var ARRAY_EXPLODE = [];
var ARRAY_SHIP = [];
var ARRAY_HITBOX = [];
var ARRAY_BONUS = [];
var ARRAY_BONUS_EXPLODE = [];
var ALL_ARRAY = [
    ARRAY_BULLET,
    ARRAY_EXPLODE,
    ARRAY_ALIEN,
    ARRAY_SHIP,
    ARRAY_HITBOX,
    ARRAY_BONUS,
    ARRAY_BONUS_EXPLODE
]; // for looping purpose

var TIMEOUT_ARRAY = [];

var SPAWNER_ARRAY = [];

var BALL_INTERVAL; // setInterval of shoot when mouse pressed

var IS_FIRED = false; // prevents spacebar shoot from being stucked

var CURRENT_BALL_FUNCTION = function () {
    shoot(GLOBAL_X, GLOBAL_Y);
}

var CURRENT_ROUND_BONUS = null;

var SHIP_IMAGE = new Image();
SHIP_IMAGE.src = "assets/img/ship.png";



var EXPLOSION_IMAGE = new Image();
EXPLOSION_IMAGE.src = "assets/img/explode.png";

var EXPLODE_SOUND = new Audio("assets/mp3/explode.mp3");
var GUN_SOUND = new Audio("assets/mp3/gun.mp3");
var BONUS_SOUND = new Audio("assets/mp3/bonus.mp3");

var SPACE_IMAGE = new Image();
SPACE_IMAGE.src = "assets/img/space.jpg";

var BONUS_EFFECT_IMAGE = new Image();
BONUS_EFFECT_IMAGE.src = "assets/img/bonus-effect.png";