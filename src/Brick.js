/**
 * A brick must be destroyed by the ball.
 */
export default class Brick {
  /**
   * A brick must be destroyed by the ball.
   * @param {Number} x      Position in the x axis.
   * @param {Number} y      Position in the y axis.
   * @param {Number} width  Brick width.
   * @param {Number} height Brick height.
   */
  constructor (x, y, width, height) {
    /**
     * Position in the x axis
     */
    this.x = x
    /**
     * Position in the y axis
     */
    this.y = y
    /**
     * Brick width
     */
    this.width = width
    /**
     * Brick height
     */
    this.height = height
    /**
     * Brick color.
     */
    this.color = '#0095DD'
  }

  /**
   * Draws the object in the context.
   * @param {RenderingContext} context Object lets you draw on the canvas.
   */
  draw (context) {
    context.beginPath()
    context.rect(this.x, this.y, this.width, this.height)
    context.fillStyel = this.color
    context.fill()
    context.closePath()
  }
}
