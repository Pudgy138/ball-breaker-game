// Canvas Variables:
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Ball Variables:
// Ball starting placement
let x = canvas.width/2;
let y = canvas.height-45;

// Ball movement speed
let dx = 2;
let dy = -2;

// Ball size
let ballRadius = 12;

// Paddle Variables:
// Paddle size
let paddleHeight = 10;
let paddleWidth = 120;

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

// Score display
let playerScore = 0;
let score = document.querySelector("#score");

// Player lives
let playerLives = 3;
let lives = document.querySelector("#lives");

// Brick creation loop
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}

// Brick drawing function
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
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
}

// Set interval to draw game assets before live game
const preStartInterval = setInterval(init, 8);

// Pre-start setup
init();
function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    paddleBehavior();
    preStartBall();
}

// Event listeners
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("keypress", spaceStart, false);

// Spacebar starts the game
function spaceStart(e) {
    if(e.keyCode == 32){
    clearInterval(preStartInterval);
    let liveGameInterval = setInterval(draw, 8);
    }
}

// Brick collision logic
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    playerScore++;
                    score.textContent = playerScore;
                    if (playerScore == brickRowCount*brickColumnCount) {
                        alert("You Win! Congratulations!!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

// Arrow keyDown for paddle movement
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    } 
}

// Arrow keyUp logic for paddle
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// Draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

// Draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
}

// Live game ball behavior
function liveBallBehavior() {
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX - ballRadius && x < paddleX + paddleWidth) {
            dy = -dy;
            ctx.fillStyle = randomColor({luminosity: 'dark'});
        } else {
            playerLives--;
            lives.textContent = playerLives;
            if (!playerLives) {
                alert("Game Over! Sorry!");
                document.location.reload();
            } else {
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    if (x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
   
   x += dx;
   y += dy;
}

// Paddle behavior for pre-start and live game
function paddleBehavior() {
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
            paddleX += 6;
        } else if (leftPressed && paddleX > 0) {
            paddleX -= 6;
        }
}

// Pre-start ball behavior
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
    collisionDetection();   
    liveBallBehavior();     
    paddleBehavior();
}