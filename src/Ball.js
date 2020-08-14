/**
 * Used to destroy the blocks on the screen and not to leave the stage.
 */
export default class Ball {
  /**
   * Used to destroy the blocks on the screen and not to leave the stage.
   * @param {Number} x      Position in the x axis.
   * @param {Number} y      Position in the y axis.
   * @param {Number} radius Ball radius.
   */
  constructor (x, y, radius) {
    /**
     * Ball color.
     */
    this.color = '#0095DD'
    /**
     * Ball speed on the x axis..
     */
    this.dx = 2
    /**
     * Ball speed on the x axis.
     */
    this.dy = -this.dx
    /**
     * Ball radius.
     */
    this.radius = radius
    /**
     * Position in the x axis.
     */
    this.x = x
    /**
     * Position in the y axis.
     */
    this.y = y
  }

  /**
   * Draws the object in the context.
   * @param {RenderingContext} context Object lets you draw on the canvas.
   */
  draw (context) {
    context.beginPath()
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    context.fillStyle = this.color
    context.fill()
    context.closePath()
  }

  /**
   * Increases the speed of the ball in a percentage of the current value.
   * @param {Number} percentage Value between 0 and 1.
   */
  increaseSpeed (percentage) {
    percentage += 1
    this.dx *= percentage
    this.dy *= percentage
  }

  /**
   * Updates the position of the ball.
   */
  move () {
    this.x += this.dx
    this.y += this.dy
  }

  /**
   * Sets the speed of the ball to their initial values.
   */
  resetSpeed () {
    this.dx = 2
    this.dy = -this.dx
  }
}
