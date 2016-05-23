// Grab the canvas
var canvas = document.getElementById("myCanvas");
// ctx means "context", which is the tool used to draw on canvas
var ctx = canvas.getContext("2d");
var id;

/*
	All steps are done between beginPath() & closePath().
	
	Start creating the ball first:
	
	The code below creates a circle.
	arc defines a circle: arc(push from left(x), push from top(y), radius, start angle, end angle, direction of drawing )
	The last parameter is optional, and is a boolean in which false = clockwise(default) & true = anti-clockwise.
	
	ctx.arc(240, 160, 20, 0, Math.PI*2);		
	
	fillStyle = fills the shape with color
	strokeStyle = fills the outer shape with color				
	
	rect defines the rectangle: rect(push from left, push from top, width, height)
	
	ctx.beginPath();
	ctx.rect(20, 40, 50, 50);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
*/

// score
var score = 0;
// player lives
var lives = 3;
// ball position
var x = canvas.width/2;
var y = canvas.height-30;
// The higher the number, the faster it goes
var dx = 2;
var dy = -2;
var ballRadius = 10;
// paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
// buttons state
var rightPressed = false;
var leftPressed = false;
// brick
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10; // padding between bricks to avoid touching
var brickOffsetTop = 30; // avoid being drawn at the very top of canvas
var brickOffsetLeft = 30; // avoid being drawn at the very left of canvas

var bricks = []; // Store all the bricks in an array
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1};
	}
}

// Function for collision with bricks
function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			var b = bricks[c][r];
			// Calculate
			if(b.status == 1) {
				if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
					dy = -dy;
					b.status = 0;
					score++;
					if(score == brickRowCount*brickColumnCount) {
						// Too annoying to keep atm: alert("YOU WIN, CONGRATULATIONS!"); 
						clearInterval(id);
						ctx.clearRect(0, 0, canvas.width, canvas.height);
					}
				}
			}
		}
	}
}

function draw() {
	// where your drawing loop will occur
	// takes 4 parameters: x, y of top left corner + x, y of bottom right corner. Anytihng within gets cleared.
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawScore();
	drawLives();
	drawBall();
	drawPaddle();
	drawBricks();
	collisionDetection();
	// Check for collision then reverse ball movement
	// Right and left collison
	if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
		dx = -dx;
	}
	// Top collison
	if(y + dy < ballRadius) {
		dy = -dy;
	} else if(y + dy > canvas.height-ballRadius) { //if ball hits the bottom & not on paddle, you lose
		if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy; // Make ball bounce up
		}
		else {
			lives--;
			if(!lives) {
				// Too annoying to keep atm: alert("GAME OVER"); 
				clearInterval(id);
				ctx.clearRect(0, 0, canvas.width, canvas.height);
			}
			else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 3;
				dy = -3;
				paddleX = (canvas.width-paddleWidth)/2;
			}
		}
	}
	
	//Check for buttons pressed then update per frame. The higher the number, the faster it goes.
	if(rightPressed && paddleX < canvas.width-paddleWidth) {
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0) {
		paddleX -= 7;
	}
	// Add small values for each frame for movement
	x += dx;
	y += dy;
}

function drawBall() {
	ctx.beginPath();
	ctx.arc(x, y, ballRadius, 0, Math.PI*2);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
				var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft; // create each brick x (pushed from left)
				var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop; // create each brick y (pushed from top)
				bricks[c][r].x = brickX;
				bricks[c][r].y = brickY;
				ctx.beginPath();
				ctx.rect(brickX, brickY, brickWidth, brickHeight);
				ctx.fillStyle = "#0095DD";
				ctx.fill();
				ctx.closePath();
			}
		}
	}
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function drawScore() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20); // 3 parameters: text, x coordinate, y coordinate
}

function drawPaddle() {
	ctx.beginPath();
	ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
	ctx.fillStyle = "#0095DD";
	ctx.fill();
	ctx.closePath();
}

// The function that will be called when user inputs a key
// key code 37 = left while 39 = right
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode == 37) {
		leftPressed = true;
	} else if(e.keyCode === 0 || e.keyCode == 32) {
		spacePressed = true;
	}
}

// Will take in whatever variable was stored when key was pressed down and make it false to stop movement
function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	} else if(e.keyCode === 0 || e.keyCode == 32) {
		spacePressed = false;
	}
}
/*	Take in user input when key is pressed and released
 	3 parameters: event, function name, useCapture
  	useCapture: specifies whether to use event bubbling or event capturing, totally optional yo
*/
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function play() {
	// setInterval(function, milliseconds)
	id = setInterval(draw, 10); // replace with requestAnimationFrame(draw) at end of draw function, then call draw() instead of setInterval for better response
}