/**
 * Created by yawenina on 1/11/17.
 */
//Create the canvas
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//ready for img
let bgReady = false;
let bgImg = new Image();
bgImg.onload = function () {
  bgReady = true;
}
bgImg.src = "images/background.png";

let heroReady = false;
let heroImg = new Image();
heroImg.onload = function () {
  heroReady = true;
}
heroImg.src = "images/hero.png";

let monsterReady = false;
let monsterImg = new Image();
monsterImg.onload = function () {
  monsterReady = true;
}
monsterImg.src = "images/monster.png";

//data for the app
let hero = {
  speed: 256
}
const monster = {};
let monstersCaught = 0;

//event handler，为了游戏的连贯性
let keysDown = {};
addEventListener('keydown', function (e) {
  keysDown[e.keyCode] = true;
}, false);
addEventListener('keyup', function (e) {
  delete keysDown[e.keyCode]
}, false);

//reset the game
const reset = function () {
  hero.x = canvas.width/2;
  hero.y = canvas.height/2;

  monster.x = 32 + (Math.random() * (canvas.width - 64));
  monster.y = 32 + (Math.random() * (canvas.height - 64));
}

//update position
const update = function (modifier) {
  if (37 in keysDown) {
    hero.x -= hero.speed * modifier;
  }
  if (38 in keysDown) {
    hero.y -= hero.speed * modifier;
  }
  if (39 in keysDown) {
    hero.x += hero.speed * modifier;
  }
  if (40 in keysDown) {
    hero.y += hero.speed * modifier;
  }

  //Are the touching?
  if (
    hero.x <= (monster.x + 32)
    && monster.x <= (hero.x + 32)
    && hero.y <= (monster.y + 32)
    && monster.y <= (hero.y + 32)
  ) {
    ++monstersCaught;
    reset();
  }
}

const render = function () {
  if (bgReady) {
    ctx.drawImage(bgImg, 0, 0);
  }
  if (heroReady) {
    ctx.drawImage(heroImg, hero.x, hero.y);
  }
  if (monsterReady) {
    ctx.drawImage(monsterImg, monster.x, monster.y)
  }

  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "24px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = 'top';
  ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
}

//main loop for the game
var main = function () {
  const now = Date.now();
  let delta = now - then;
  update(delta/1000);
  render();

  then = now;
  requestAnimationFrame(main);
}

//start the game
let then = Date.now();
reset();
main();

