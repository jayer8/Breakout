import Ball from './Ball'
import Brick from './Brick'
import { Paddle } from './Paddle'

import beep from '../assets/beep.ogg'
import gol from '../assets/gol.ogg'
import plop from '../assets/plop.ogg'

/**
 * Creates a board Brickout, where the goal is to destroy all the bricks with a ball
 * that must be maintained on stage using a paddle.
 */
export default class Breakout {
  /**
   * Creates a board Brickout, where the goal is to destroy all the bricks with a ball
   * that must be maintained on stage using a paddle.
   * @param {String} canvasId Id of the canvas where the game will be displayed.
   */
  constructor (canvasId) {
    this.canvas = document.getElementById(canvasId)
    /**
     * Context of the canvas.
     */
    this.context = this.canvas.getContext('2d')
    /**
     * Initial matrix of bricks.
     */
    this.bricks = []
    /**
     * Number of bricks in the matrix.
     */
    this.bricksCounter = 0
    /**
     * Ball to be hit to destroy bricks.
     */
    this.ball = new Ball(0, 0, 10)
    /**
     * Bricks hit by the ball.
     */
    this.destroyedBricks = []
    /**
     * Number of attempts to advance in the game.
     */
    this.lives = 3
    /**
     * Player palette with which to hit the ball.
     */
    this.paddle = new Paddle(0, 0, 75, 10)
    /**
     * Player score.
     */
    this.score = 0
    /**
     * Sound effects.
     */
    this.sounds = [
      new Audio(beep),
      new Audio(gol),
      new Audio(plop)
    ]

    this.startLevel()
  }

  /**
   * Checks that the ball has not hit a brick.
   */
  collisionDetection () {
    for (var r = 0; r < this.bricks.length; r++) {
      for (var c = 0; c < this.bricks[r].length; c++) {
        if (this.ball.x > this.bricks[r][c].x &&
          this.ball.x < this.bricks[r][c].x + this.bricks[r][c].width &&
          this.ball.y > this.bricks[r][c].y &&
          this.ball.y < this.bricks[r][c].y + this.bricks[r][c].height) {
          this.sounds[2].play()
          this.ball.dy = -this.ball.dy
          this.destroyedBricks.push(r)
          this.destroyedBricks.push(c)
          this.bricksCounter--
          this.score += 10
        }
      }
    }
  }

  /**
   * Creates an array of bricks of random dimensions not exceeding three rows and five
   * columns.
   */
  createBricks () {
    var brickColumnCount
    var brickRowCount = Math.floor(Math.random() * 3) + 1
    var brickPadding = 10
    var brickOffset = 30
    for (var r = 0; r < brickRowCount; r++) {
      this.bricks[r] = []
      brickColumnCount = Math.floor(Math.random() * 5) + 1
      this.bricksCounter += brickColumnCount
      for (var c = 0; c < brickColumnCount; c++) {
        this.bricks[r][c] = new Brick(0, 0, 75, 20)
        this.bricks[r][c].x = (c * (this.bricks[r][c].width + brickPadding)) + brickOffset
        this.bricks[r][c].y = (r * (this.bricks[r][c].height + brickPadding)) + brickOffset
      }
    }
  }

  /**
   * Deletes the bricks hit by the ball.
   */
  deleteBricks () {
    for (var i = 0; i < this.destroyedBricks.length; i += 2) {
      this.bricks[this.destroyedBricks[i]].splice(this.destroyedBricks[i + 1], 1)
    }
    this.destroyedBricks = []
  }

  /**
   * Displays the score and the number of lives the player.
   */
  drawLivesScore () {
    this.context.font = '16px Arial'
    this.context.fillStyle = '#0095DD'
    this.context.fillText('Score: ' + this.score, 8, 20)
    this.context.fillText('Lives: ' + this.lives, this.canvas.width - 65, 20)
  }

  /**
   * Places the player's paddle in his starting position.
   */
  loseOneLife () {
    this.ball.x = this.canvas.width / 2
    this.ball.y = this.canvas.height - 30
    this.paddle.x = (this.canvas.width - this.paddle.width) / 2
  }

  /**
   * Sets all variables to their initial values and creates a new stage.
   */
  restart () {
    this.startLevel()
    this.ball.resetSpeed()
    this.lives = 3
    this.score = 0
  }

  /**
   * Updates thestatus of the game.
   */
  run () {
    // Clear the canvas.
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)

    // Draw the objects.
    for (var c = 0; c < this.bricks.length; c++) {
      for (var r = 0; r < this.bricks[c].length; r++) {
        this.bricks[c][r].draw(this.context)
      }
    }
    this.ball.draw(this.context)
    this.paddle.draw(this.context)
    this.drawLivesScore()

    // Collision detection and deleting bricks.
    this.collisionDetection()
    this.deleteBricks()

    // End of the game.
    if (this.bricksCounter === 0) {
      alert('YOU WIN, CONGRATULATIONS!\nYOUR SCORE: ' + this.score)
      this.startLevel()
    }

    // Moving the ball
    if (this.ball.x + this.ball.dx < this.ball.radius ||
      this.ball.x + this.ball.dx > this.canvas.width - this.ball.radius) {
      this.ball.dx = -this.ball.dx
      this.sounds[2].play()
    }
    if (this.ball.y + this.ball.dy < this.ball.radius) {
      this.ball.dy = -this.ball.dy
      this.sounds[2].play()
    } else if (this.ball.y + this.ball.dy > this.canvas.height - this.ball.radius) {
      if (this.ball.x > this.paddle.x && this.ball.x < this.paddle.x + this.paddle.width) {
        this.ball.dy = -this.ball.dy
        // Increase the speed of the ball.
        this.ball.increaseSpeed(0.05)
        this.sounds[2].play()
      } else {
        this.lives--
        if (!this.lives) {
          alert('GAME OVER')
          this.restart()
        } else {
          this.ball.resetSpeed()
          this.sounds[1].play()
          this.loseOneLife()
        }
      }
    }

    // Move the paddle
    this.paddle.move(this.canvas.width)
    // Move the ball.
    this.ball.move()

    var self = this
    requestAnimationFrame(function () {
      self.run()
    })
  }

  /**
   * Create a new scenario keeping the ball speed and the number of player's lives.
   */
  startLevel () {
    this.loseOneLife()
    this.paddle.y = this.canvas.height - this.paddle.height
    this.bricksCounter = 0
    this.createBricks()
  }
}
