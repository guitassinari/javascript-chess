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

  static LETTERS() {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
  }

  static MAX_NUMBER() {
    return 8
  }

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

class Horse {
  constructor(teamColor) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }

  name() {
    return "horse"
  }
}

class Tower {
  constructor(teamColor) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }

  name() {
    return "tower"
  }
}

class Queen {
  constructor(teamColor) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }

  name() {
    return "queen"
  }
}

class Bishop {
  constructor(teamColor) {
    this.team = teamColor
  }

  name() {
    return "bishop"
  }

  can_move(from, to) {
    return true
  }
}

class King {
  constructor(teamColor) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }

  name() {
    return "king"
  }
}

class Pigeon {
  constructor(teamColor, initialPosition) {
    this.team = teamColor
  }

  can_move(from, to) {
    return true
  }

  name() {
    return "pigeon"
  }
}

class NullPiece {
  constructor() {
    this.team = ""
  }

  can_move(from, to) {
    return true
  }

  name() {
    return ""
  }
}

class ChessBoard {
  constructor() {
    this.__emptyBoard()
  }

  static BOARD_SIZE() {
    return 8
  }

  static initialBoard(whiteTeam, blackTeam) {
    const board = new ChessBoard() 

    board.addPiece(new Tower(blackTeam), new Position("H8"))
    board.addPiece(new Horse(blackTeam), new Position("G8"))
    board.addPiece(new Bishop(blackTeam), new Position("F8"))
    board.addPiece(new Queen(blackTeam), new Position("E8"))
    board.addPiece(new King(blackTeam), new Position("D8"))
    board.addPiece(new Bishop(blackTeam), new Position("C8"))
    board.addPiece(new Horse(blackTeam), new Position("B8"))
    board.addPiece(new Tower(blackTeam), new Position("A8"))
    board.addPiece(new Pigeon(blackTeam), new Position("H7"))
    board.addPiece(new Pigeon(blackTeam), new Position("G7"))
    board.addPiece(new Pigeon(blackTeam), new Position("F7"))
    board.addPiece(new Pigeon(blackTeam), new Position("E7"))
    board.addPiece(new Pigeon(blackTeam), new Position("D7"))
    board.addPiece(new Pigeon(blackTeam), new Position("C7"))
    board.addPiece(new Pigeon(blackTeam), new Position("B7"))
    board.addPiece(new Pigeon(blackTeam), new Position("A7"))
    
    board.addPiece(new Tower(whiteTeam), new Position("A1"))
    board.addPiece(new Horse(whiteTeam), new Position("B1"))
    board.addPiece(new Bishop(whiteTeam), new Position("C1"))
    board.addPiece(new Queen(whiteTeam), new Position("D1"))
    board.addPiece(new King(whiteTeam), new Position("E1"))
    board.addPiece(new Bishop(whiteTeam), new Position("F1"))
    board.addPiece(new Horse(whiteTeam), new Position("G1"))
    board.addPiece(new Tower(whiteTeam), new Position("H1"))
    board.addPiece(new Pigeon(whiteTeam), new Position("H2"))
    board.addPiece(new Pigeon(whiteTeam), new Position("G2"))
    board.addPiece(new Pigeon(whiteTeam), new Position("F2"))
    board.addPiece(new Pigeon(whiteTeam), new Position("E2"))
    board.addPiece(new Pigeon(whiteTeam), new Position("D2"))
    board.addPiece(new Pigeon(whiteTeam), new Position("C2"))
    board.addPiece(new Pigeon(whiteTeam), new Position("B2"))
    board.addPiece(new Pigeon(whiteTeam), new Position("A2"))

    return board
  }

  __emptyBoard() {
    this.positions = []
    for(let i = 0; i < ChessBoard.BOARD_SIZE(); i++) {
      this.positions[i] = []
      for(let j = 0; j < ChessBoard.BOARD_SIZE(); j++) {
        this.positions[i][j] = new NullPiece()
      } 
    }
  }

  allPositions() {
    if(!this.__allPositions) {
      this.__allPositions = []
      Position.LETTERS().forEach(letter => {
        [...Array(Position.MAX_NUMBER())].forEach((_, index) => {
          this.__allPositions.push(new Position(`${letter}${index+1}`))
        })
      })  
    }
    
    return this.__allPositions
  }

  addPiece(piece, position) {
    this.__putPieceAtPosition(piece, position)
  }

  removePieceAt(position) {
    this.__putPieceAtPosition(new NullPiece(), position)
  }

  movePiece(from, to) {
    const pieceAtFrom = this.getPieceAt(from)
    const pieceAtDestination = this.getPieceAt(to)
    this.__putPieceAtPosition(pieceAtFrom, to)
    this.__putPieceAtPosition(pieceAtDestination, from)
  }

  getPieceAt(position) {
    const piece = this.positions[position.verticalIndex()][position.horizontalIndex()]
    return piece
  }

  __putPieceAtPosition(piece, position) {
    this.positions[position.verticalIndex()][position.horizontalIndex()] = piece
  }
}

module.exports = ChessBoard