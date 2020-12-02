class Board {
  constructor(state = Array(9).fill('')) {
    this.state = state
  }
  renderBoard() {
    let formattedString = ''
    this.state.forEach((cell, i) => {
      formattedString += cell ? ` ${cell} |` : '   |'
      if ((i + 1) % 3 === 0) {
        formattedString = formattedString.slice(0, -1)
        if (i < 8)
          formattedString +=
            '\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n'
      }
    })
    console.log('%c' + formattedString, 'color: #c11dd4;font-size:16px')
  }

  isSpaceEmpty() {
    return this.state.every(cell => !cell)
  }

  isBoardFull() {
    return this.state.every(cell => cell)
  }

  addMark(mark, position) {
    if (![0, 1, 2, 3, 4, 5, 6, 7, 8].includes(position)) {
      throw new Error(`Cell index ${position} does not exist!`)
    }
    if (!['x', 'o'].includes(mark)) {
      throw new Error('The mark can only be x or o!')
    }
    if (this.state[position]) {
      return false
    }
    this.state[position] = mark
    return true
  }

  getAvailableMoves() {
    const moves = []
    this.state.forEach((cell, index) => {
      if (!cell) moves.push(index)
    })
    return moves
  }

  checkForWinner() {
    if (this.isSpaceEmpty()) return false
    //Horizontal Wins
    if (
      this.state[0] === this.state[1] &&
      this.state[0] === this.state[2] &&
      this.state[0]
    ) {
      return {winner: this.state[0], direction: 'H', row: 1}
    }
    if (
      this.state[3] === this.state[4] &&
      this.state[3] === this.state[5] &&
      this.state[3]
    ) {
      return {winner: this.state[3], direction: 'H', row: 2}
    }
    if (
      this.state[6] === this.state[7] &&
      this.state[6] === this.state[8] &&
      this.state[6]
    ) {
      return {winner: this.state[6], direction: 'H', row: 3}
    }

    //Vertical Wins
    if (
      this.state[0] === this.state[3] &&
      this.state[0] === this.state[6] &&
      this.state[0]
    ) {
      return {winner: this.state[0], direction: 'V', column: 1}
    }
    if (
      this.state[1] === this.state[4] &&
      this.state[1] === this.state[7] &&
      this.state[1]
    ) {
      return {winner: this.state[1], direction: 'V', column: 2}
    }
    if (
      this.state[2] === this.state[5] &&
      this.state[2] === this.state[8] &&
      this.state[2]
    ) {
      return {winner: this.state[2], direction: 'V', column: 3}
    }

    //Diagonal Wins
    if (
      this.state[0] === this.state[4] &&
      this.state[0] === this.state[8] &&
      this.state[0]
    ) {
      return {winner: this.state[0], direction: 'D', diagonal: 'main'}
    }
    if (
      this.state[2] === this.state[4] &&
      this.state[2] === this.state[6] &&
      this.state[2]
    ) {
      return {winner: this.state[2], direction: 'D', diagonal: 'counter'}
    }

    if (this.isBoardFull()) {
      return {winner: "Cat's Game"}
    }

    return false
  }
}
export default Board
