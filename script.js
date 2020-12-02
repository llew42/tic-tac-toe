import Board from './Classes/board.js'
import Player from './Classes/player.js'
import {hasClass, addClass} from './helpers.js'

function newGame(depth = -1, startingPlayer = 1) {
  const player = new Player(depth)
  const board = new Board(Array(9).fill(''))
  const boardDIV = document.getElementById('board')
  boardDIV.className = ''
  boardDIV.innerHTML = `<div class="cells-wrap">
            <button class="cell-0"></button>
            <button class="cell-1"></button>
            <button class="cell-2"></button>
            <button class="cell-3"></button>
            <button class="cell-4"></button>
            <button class="cell-5"></button>
            <button class="cell-6"></button>
            <button class="cell-7"></button>
            <button class="cell-8"></button>
        </div>`
  const htmlCells = [...boardDIV.querySelector('.cells-wrap').children]
  const starting = startingPlayer,
    maximizing = starting
  let playerTurn = starting
  board.state.forEach((cell, i) => {
    htmlCells[i].addEventListener(
      'click',
      () => {
        if (
          hasClass(htmlCells[i], 'x') ||
          hasClass(htmlCells[i], 'o') ||
          board.checkForWinner() ||
          !playerTurn
        )
          return false
        const mark = maximizing ? 'x' : 'o'
        board.addMark(mark, i)
        addClass(htmlCells[i], mark)

        playerTurn = 0
        player.optimalMove(board, !maximizing, best => {
          const mark = !maximizing ? 'x' : 'o'
          board.addMark(mark, parseInt(best))
          addClass(htmlCells[best], mark)
          playerTurn = 1
        })
      },
      false
    )
    if (cell) addClass(htmlCells[i], cell)
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const depth = -1
  const startingPlayer = 1
  newGame(depth, startingPlayer)
  document.getElementById('newGame').addEventListener('click', () => {
    const depth = -1
    const startingPlayer = 1
    newGame(depth, startingPlayer)
  })
})
