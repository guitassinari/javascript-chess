function* allIndexesUpTo(number) {
  for(let i = 0; i < number; i++) {
    yield i
  }
}

class Position {
  constructor(positionString) {
    if (positionString.length !== 2) {
      throw new Error("Uma posição deve ter apenas dois caracteres")
    }

    const [letter, numberString] = positionString.toUpperCase().split("")
    const number = Number(numberString)

    if (number > Position.MAX_NUMBER() || number <= 0 || !Position.LETTERS().includes(letter)) { 
      throw new Error(`Posição ${positionString} inválida`)
    }

    this.letter = letter
    this.number = number
  }

  static allPossiblePositions() {
    if(!this.__allPositions) {
      this.__allPositions = []

      this.LETTERS().forEach(letter => {
        for(let index of allIndexesUpTo(this.MAX_NUMBER())) {
          this.__allPositions.push(new Position(`${letter}${index+1}`))
        }
      })  
    }

    return this.__allPositions
  }

  static LETTERS() { return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] }
  static MAX_NUMBER() { return 8  }

  horizontalIndex() {
    return Position.LETTERS().indexOf(this.letter)  
  }

  verticalIndex() {
    return this.number - 1
  }

  toString() {
    return `${this.letter}${this.number}`
  }
}

module.exports = Position