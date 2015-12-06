/**
 * Last updated: October 24, 2015.
 * @author Vecko
 */

/**
 * A brick must be destroyed by the ball.
 * @param {Number} x	  Position in the x axis.
 * @param {Number} y	  Position in the y axis.
 * @param {Number} width  Brick width.
 * @param {Number} height Brick height.
 */
function Brick(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	/**
	 * Brick color.
	 */
	this.color = "#0095DD";
}

/**
 * Draws the object in the context.
 * @param {Object} context Object lets you draw on the canvas.
 */
Brick.prototype.draw = function(context) {
	context.beginPath();
	context.rect(this.x, this.y, this.width, this.height);
	context.fillStyel = this.color;
	context.fill();
	context.closePath();
};