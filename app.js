// Canvas Variables:
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Mechanics Variables:

// Ball Variables:
let x = canvas.width/2;
let y = canvas.height-45;
let dx = 2;
let dy = -2;
let ballRadius = 10;

// Paddle Variables:
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth)/2;
let paddleY = canvas.height-20;
let rightPressed = false;
let leftPressed = false;

// Brick Variables:
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// Brick Creation Loop:
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0};
    }
}

init();

function init() {
    drawBall();
    drawPaddle();
}

// arrow and spacebar listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", spaceStart, false);

// spacebar starts the game
function spaceStart(e) {
    if(e.keyCode == 32){
    setInterval(draw, 8);
    }
}

// arrow keyDown paddle movement
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

// arrow keyUp logic
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// draw the bricks
function drawBricks() {
    for ( let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r].x = 0;
            bricks[c][r].y = 0;
            ctx.beginPath();
            ctx.rect(0, 0, brickWidth, brickHeight);
            ctx.fillStyle = "#000000";
            ctx.fill();
            ctx.closePath();
        }
    }
}

// draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

// draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
}

// ball behavior once game starts
function ballBehavior() {
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX - ballRadius && x < paddleX + paddleWidth) {
            dy = -dy;
            ctx.fillStyle = randomColor({luminosity: 'light'});
        } else {
            // alert("GAME OVER");
            document.location.reload();
        }
    }

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
   
   x += dx;
   y += dy;
}

// paddle behavior for pre-start and live game
function paddleBehavior() {
    if (rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 8;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 8;
    }
}

// pre-start ball behavior
function preStartBall() {
    // This if statement allows the ball to move with the paddle before the game begins
    if (rightPressed && ballRadius < paddleWidth) {
        x += dx;
    } else if (leftPressed && ballRadius < paddleWidth) {
        x -= dx;
    }
}

// 
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();   
    ballBehavior();     
    paddleBehavior();   
}

