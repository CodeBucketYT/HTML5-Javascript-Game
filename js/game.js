//Canvas//
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
var ctx2 = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

//background//
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/bg.png";

//Hero//
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/masterDoge.png";

//Monster//
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/dorito.png";

//Bomb//
var bombReady = false;
var bombImage = new Image();
bombImage.onload = function () {
	bombReady = true;
};
bombImage.src = "images/pedo0000.png";

//Game objects//
var x = Math.floor((Math.random() * 500) + 100);
var hero = {speed: 150}; //256 
var monster = {speed: x};
var monster2 = {speed: x};
var bomb = {speed: 256};
//movement in pixels per second//
var monstersCaught = 0;
var lifes = 3;

//Handle keyboard controls//
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

//Reset the game when the player catches a monster//
var spawnmonster1 = function () {
	//--hero.x = canvas.width / 2;
	//--hero.y = canvas.height / 2;
	//Throw the monster somewhere on the screen randomly//
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
	//Throw the bomb somewhere on the screen randomly//
	//--bomb.x = 32 + (Math.random() * (canvas.width - 64));
	//--bomb.y = 32 + (Math.random() * (canvas.height - 64));
};

var spawnmonster2 = function () {
	monster2.x = 32 + (Math.random() * (canvas.width - 64));
	monster2.y = 32 + (Math.random() * (canvas.height - 64));
};

var start = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
	
	bomb.x = 32 + (Math.random() * (canvas.width - 64));
	bomb.y = 32 + (Math.random() * (canvas.height - 64));
}

//Update game objects//
var update = function (modifier) {

	if (38 in keysDown) { // Player holding up
		hero.y -= hero.speed * modifier;
		bomb.y += bomb.speed * modifier;
		if (hero.y<=0) {
			hero.y=540;
		}
		if (bomb.y>=540) {
			bomb.y=0;
		}
	}
	if (40 in keysDown) { // Player holding down
		hero.y += hero.speed * modifier;
		bomb.y -= bomb.speed * modifier;
		if (hero.y>=540) {
			hero.y=0;
		}
		if (bomb.y<=0) {
			bomb.y=540;
		}
	}
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		bomb.x += bomb.speed * modifier;
		if (hero.x<=0) {
			hero.x=540;
		}
		if (bomb.x>=540) {
			bomb.x=0;
		}
		
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		bomb.x -= bomb.speed * modifier;
		if (hero.x>=540) {
			hero.x=0;
		}
		if (bomb.x<=0) {
			bomb.x=540;
		}
	}

	//Are they touching?//
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;
		spawnmonster1();
	}
	
	if (
		hero.x <= (monster2.x + 32)
		&& monster2.x <= (hero.x + 32)
		&& hero.y <= (monster2.y + 32)
		&& monster2.y <= (hero.y + 32)
	) {
		++monstersCaught;
		spawnmonster2();
	}
	
	if (
		hero.x <= (bomb.x + 32)
		&& bomb.x <= (hero.x + 32)
		&& hero.y <= (bomb.y + 32)
		&& bomb.y <= (hero.y + 32)
	) {
		--lifes;
		spawnmonster1();
		spawnmonster2();
		start();
	}
	
	if (lifes < 0) {
		lifes = 3;
		monstersCaught = 0;
		start();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}
	
	if (monsterReady) {
		ctx.drawImage(monsterImage, monster2.x, monster2.y);
	}
		
	if (bombReady) {
		ctx.drawImage(bombImage, bomb.x, bomb.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Doritos caught: " + monstersCaught, 32, 32);
	
	ctx2.fillStyle = "rgb(250, 250, 250)";
	ctx2.font = "24px Helvetica";
	ctx2.textAlign = "left";
	ctx2.textBaseline = "top";
	ctx2.fillText("Lifes: " + lifes, 400, 32);
};

//The main game loop//
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

//Let's play this game!//
var then = Date.now();
spawnmonster1();
spawnmonster2();
start();
main();

setTimeout(function(){
   window.location.reload(1);
}, 60000);

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    var fiveMinutes = 60 * 1,
        display = document.querySelector('#time');
    startTimer(fiveMinutes, display);
};
