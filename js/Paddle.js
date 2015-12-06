/**
 * Last updated: October 17, 2015.
 * @author Javier Rugerio.
 */

/**
 * Possible directions of the paddle.
 */
var Direction = {
	LEFT  : 1,
	RIGHT : 2,
	NONE  : 0
};

/**
 * The paddle allows the player to keep the ball on stage.
 * @param {Number} x	  Position in the x axis.
 * @param {Number} y	  Position in the y axis.
 * @param {Number} width  Paddle width.
 * @param {Number} height Paddle height.
 */
function Paddle(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	/**
	 * Paddle color.
	 */
	this.color = "#0095DD";
	/**
	 * Current direction of the paddle.
	 */
	this.direction = Direction.NONE;
}

/**
 * Draws the object in the context.
 * @param {Object} context Object lets you draw on the canvas.
 */
Paddle.prototype.draw = function(context) {
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.fillStyle = this.color;
	context.fill();
	context.closePath();
};

/**
 * Moves the paddle through the x axis of stage.
 * @param {Number} horizontalLimit Range of motion.
 */
Paddle.prototype.move = function(horizontalLimit) {
	if (this.direction == Direction.RIGHT && this.x < horizontalLimit - this.width) {
		this.x += 7;
	}
	else if (this.direction == Direction.LEFT && this.x > 0) {
		this.x -= 7;
	}
};