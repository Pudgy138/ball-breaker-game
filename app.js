// Canvas Variables
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// Mechanics Variables:


// Ball Variables
let x = canvas.width/2;
let y = canvas.height-45;
let dx = 2;
let dy = -2;
let ballRadius = 10;

// Paddle Variables
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width-paddleWidth)/2;
let paddleY = canvas.height-20;
let rightPressed = false;
let leftPressed = false;

// Brick Variables
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// Brick Creation Loop
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0};
    }
}

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

// This tells the draw() function how to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}

// This tells the draw() function how to draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
}

// Drawing the canvas, ball and paddle
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();        

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

    if (rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 8;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 8;
    }
}

// This is for when the arrow key is pressed
document.addEventListener("keydown", keyDownHandler, false);
function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
}

// This is for when the arrow key is no longer being pressed
document.addEventListener("keyup", keyUpHandler, false);
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

// This function lets the spacebar key start the game
document.addEventListener("keyup", spaceStart, false);
function spaceStart(e) {
    if(e.keyCode == 32){
        setInterval(draw, 8);
    }
}

// This function is the "pre-start" function, where you can position the ball and paddle before you begin
function preStart() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    // This function defines the arrow keys functionality when pressed
    document.addEventListener("keydown", keyDownHandler, false);
    function keyDownHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = true;
        } else if (e.keyCode == 37) {
            leftPressed = true;
        }
    }

    // This function defines the arrow keys functionality when no longer pressed
    document.addEventListener("keyup", keyUpHandler, false);
    function keyUpHandler(e) {
        if (e.keyCode == 39) {
            rightPressed = false;
        } else if (e.keyCode == 37) {
            leftPressed = false;
        }
    }
    
    // This if statement allows the paddle to move before the game begins
    if (rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 2;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 2;
    }

    // This if statement allows the ball to move with the paddle before the game begins
    if (rightPressed && ballRadius < paddleWidth) {
        x += dx;
    } else if (leftPressed && ballRadius < paddleWidth) {
        x -= dx;
    }    
    
    // This function lets the spacebar key start the game
    document.addEventListener("keyup", spaceStart, false);
    function spaceStart(e) {
        if(e.keyCode == 32){
            clearInterval(preStart);
        } 
    }
}

setInterval(preStart, 8);