import Board from './board.js'

export default class Player {
  constructor(maxDepth = -1) {
    this.maxDepth = maxDepth
    this.nodesMap = new Map()
  }
  optimalMove(board, maximizing = true, callback = () => {}, depth = 0) {
    if (depth == 0) this.nodesMap.clear()

    if (board.checkForWinner() || depth === this.maxDepth) {
      if (board.checkForWinner().winner === 'x') {
        return 100 - depth
      } else if (board.checkForWinner().winner === 'o') {
        return -100 + depth
      }
      return 0
    }
    if (maximizing) {
      let bestScore = -100
      board.getAvailableMoves().forEach(index => {
        const newBoard = new Board([...board.state])
        newBoard.addMark('x', index)
        const score = this.optimalMove(newBoard, false, callback, depth + 1)
        bestScore = Math.max(bestScore, score)

        if (depth == 0) {
          const moves = this.nodesMap.has(score)
            ? `${this.nodesMap.get(score)},${index}`
            : index
          this.nodesMap.set(score, moves)
        }
      })
      if (depth == 0) {
        let value
        if (typeof this.nodesMap.get(bestScore) == 'string') {
          const arr = this.nodesMap.get(bestScore).split(',')
          const rand = Math.floor(Math.random() * arr.length)
          value = arr[rand]
        } else {
          value = this.nodesMap.get(bestScore)
        }
        callback(value)
        return value
      }
      return bestScore
    }

    if (!maximizing) {
      let bestScore = 100
      board.getAvailableMoves().forEach(index => {
        const newBoard = new Board([...board.state])
        newBoard.addMark('o', index)
        let score = this.optimalMove(newBoard, true, callback, depth + 1)
        bestScore = Math.min(bestScore, score)
        if (depth == 0) {
          const moves = this.nodesMap.has(score)
            ? this.nodesMap.get(score) + ',' + index
            : index
          this.nodesMap.set(score, moves)
        }
      })
      if (depth == 0) {
        let value
        if (typeof this.nodesMap.get(bestScore) == 'string') {
          const arr = this.nodesMap.get(bestScore).split(',')
          const rand = Math.floor(Math.random() * arr.length)
          value = arr[rand]
        } else {
          value = this.nodesMap.get(bestScore)
        }
        callback(value)
        return value
      }
      return bestScore
    }
  }
}
