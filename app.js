// Canvas Variables:
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Ball Variables:
// Ball starting placement
let x = canvas.width/2;
let y = canvas.height-45;
// Ball movement speed
let dx = 3;
let dy = -3;
// Ball size
let ballRadius = 12;

// Paddle Variables:
// Paddle size
let paddleHeight = 10;
let paddleWidth = 105;
// Paddle starting placement
let paddleX = (canvas.width-paddleWidth)/2;
let paddleY = canvas.height-20;
// Paddle movement
let rightPressed = false;
let leftPressed = false;

// Brick Variables:
// Brick layout
let brickRowCount = 5;
let brickColumnCount = 15;
// Brick spacing 
let brickPadding = 10;
let brickOffsetTop = 5;
let brickOffsetLeft = 5;
// Brick sizing
let brickWidth = 63.33;
let brickHeight = 18;
// Brick empty array
let bricks = [];

// Brick creation loop
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0};
    }
}

// Brick drawing function
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fill();
            ctx.closePath();
        }
    }
}



const preStartInterval = setInterval(init, 8);

init();

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    paddleBehavior();
    preStartBall();
}

// arrow and spacebar listeners

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", spaceStart, false);

// spacebar starts the game
function spaceStart(e) {
    if(e.keyCode == 32){
    clearInterval(preStartInterval);
    setInterval(draw, 8);
    console.log("live game started");
    }
}

// ball speed increment/decrement
// I would like to increment and decrement the ball speed with the up and down arrows.

// arrow keyDown for paddle movement
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } 
}

// arrow keyUp logic for paddle
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// bricks were here

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
function liveBallBehavior() {
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX - ballRadius && x < paddleX + paddleWidth) {
            dy = -dy;
            ctx.fillStyle = randomColor({luminosity: 'dark'});
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
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 6;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 6;
        }
}

// pre-start ball behavior
function preStartBall() {
    // This if statement allows the ball to move with the paddle before the game begins
    if (rightPressed && ballRadius + x < canvas.width) {
        x += 6;
    } else if (leftPressed && ballRadius + x > ballRadius*2) {
        x -= 6;
    }
}

// Live game
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();   
    liveBallBehavior();     
    paddleBehavior();   
}

