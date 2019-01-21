var animate =
    window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function (callback) {
        window.setTimeout(callback, 1000 / FPS)
    };

var backgroundImage = new Image();
backgroundImage.src = "images/pandemic.jpg";
var canvas = document.createElement('canvas');
canvas.id = "canvas";
canvas.width = WIDTH;
canvas.height = HEIGHT;
var context = canvas.getContext('2d');

window.onload = function () {
    if (!isCanvasSupported()) {
        print("No support for <canvas>");
        return;
    }

    var body = document.getElementById('body');
    body.appendChild(canvas);
    settingsUpdate();
    animate(step);
};


// Input handling
var keysDown = {};
var mouseDown = false;
var mousePressed = false;
var xOld;
var yOld;
var xNew;
var yNew;
var mousePos;

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});

canvas.addEventListener('mousemove', function(evt) {
    mousePos = getMousePos(canvas, evt);
}, false);

canvas.addEventListener('mousedown', function(evt) {
    mouseDown = true;
    var mousePos = getMousePos(canvas, evt);
    xOld = Math.floor(mousePos.x);
    yOld = Math.floor(mousePos.y);
}, false);

canvas.addEventListener('mouseup', function(evt) {
    mouseDown = false;
    mousePressed = true;
    var mousePos = getMousePos(canvas, evt);
    xNew = Math.floor(mousePos.x);
    yNew = Math.floor(mousePos.y);
}, false);


// Checks canvas support
function isCanvasSupported() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

// Utility
var getMousePos = function(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX-rect.left)/(rect.right-rect.left)*canvas.width,
        y: (evt.clientY-rect.top )/(rect.bottom-rect.top)*canvas.height
    };
}

var settingsUpdate = function() {
    SCALE = document.getElementById('scale').value;
    WIDTH  = SCALE * 1200;
    HEIGHT = SCALE * 849;
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    document.getElementById('body').style.width = WIDTH;
}

// Functionality
var state = "MENU";
var menu = new Menu();
var game;

var step = function () {
	switch (state) {
		case "MENU":
			if (menu.getIsConfigured()) {
				var numberOfPlayers = menu.getNumberOfPlayers();
				var difficulty = menu.getDifficulty();
				game = new Pandemic(numberOfPlayers, difficulty);
				state = "GAME";
			} else {
				menu.render();
				menu.update(mousePressed, xNew, yNew);
				mousePressed = false;
			}
			break;
		case "GAME":
			game.render();
			game.update(mousePressed, xNew, yNew);
			mousePressed = false;
			break;
		default:
			console.log("Invalid state!");
			break;
	}
	animate(step);
};

// Library
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}
