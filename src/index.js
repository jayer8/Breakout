import Breakout from './Breakout'
import { Direction } from './Paddle'

/***
 * Invokes a user-defined function every (1000 / 60) ms.
 */
window.requestAnimationFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60)
    }
})()

const breakout = new Breakout('myCanvas')

/**
 * Manages events from GUI.
 */

document.body.onkeydown = function (e) {
  if (e.keyCode === 37) {
    breakout.paddle.direction = Direction.LEFT
  } else if (e.keyCode === 39) {
    breakout.paddle.direction = Direction.RIGHT
  }
}

document.body.onkeyup = function (e) {
  if (e.keyCode === 37 || e.keyCode === 39) {
    breakout.paddle.direction = Direction.NONE
  }
}

document.body.onmousemove = function (e) {
  const relativeX = e.clientX - breakout.canvas.offsetLeft
  if (relativeX > (breakout.paddle.width / 2) && relativeX < breakout.canvas.width - (breakout.paddle.width / 2)) {
    breakout.paddle.x = relativeX - breakout.paddle.width / 2
  }
}

/*
  * Entry point.
  */
breakout.run()
