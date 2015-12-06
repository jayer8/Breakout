/**
 * Last updated: November 29, 2015.
 * @author Javier Rugerio.
 */

/**
 * Used to destroy the blocks on the screen and not to leave the stage.
 * @param {Number} x 	  Position in the x axis.
 * @param {Number} y	  Position in the y axis.
 * @param {Number} radius Ball radius.
 */
function Ball(x, y, radius) {
	/**
	 * Ball color.
	 */
	this.color = "#0095DD";
	/**
	 * Ball speed on the x axis..
	 */
	this.dx = 2;
	/**
	 * Ball speed on the x axis.
	 */
	this.dy	= -this.dx;
	this.radius = radius;
	this.x = x;
	this.y = y;
}

/**
 * Draws the object in the context.
 * @param {Object} context Object lets you draw on the canvas.
 */
Ball.prototype.draw = function(context) {
	context.beginPath();
	context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
	context.fillStyle = this.color;
	context.fill();
	context.closePath();
};

/**
 * Increases the speed of the ball in a percentage of the current value.
 * @param {Number} percentage Value between 0 and 1. 
 */
Ball.prototype.increaseSpeed = function(percentage) {
	percentage += 1;
	this.dx *= percentage;
	this.dy *= percentage;
};

/**
 * Updates the position of the ball.
 */
Ball.prototype.move = function() {
	this.x += this.dx;
	this.y += this.dy;
};

/**
 * Sets the speed of the ball to their initial values.
 */
Ball.prototype.resetSpeed = function() {
	this.dx = 2;
	this.dy = -this.dx;
};