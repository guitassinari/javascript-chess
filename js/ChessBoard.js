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
    return false
  }

  name() {
    return null
  }
}

class ChessBoard {
  constructor() {
    this.__emptyBoard()
  }

  static BOARD_SIZE() {
    return 8
  }

  static fromObject(boardObject) {
    const board = new ChessBoard()
    Object.entries(boardObject).forEach(([tileId, [piece, team]]) => {
      switch (piece) {
        case 'horse': board.addPiece(new Horse(team), tileId); break;
        case 'tower': board.addPiece(new Tower(team), tileId); break;
        case 'bishop': board.addPiece(new Bishop(team), tileId); break;
        case 'king': board.addPiece(new King(team), tileId); break;
        case 'queen': board.addPiece(new Queen(team), tileId); break;
        case 'pigeon': board.addPiece(new Pigeon(team), tileId); break;
      }
    })
    return board
  }

  static initialBoard(whiteTeam, blackTeam) {
    const board = new ChessBoard() 

    board.addPiece(new Tower(blackTeam), "H8")
    board.addPiece(new Horse(blackTeam), "G8")
    board.addPiece(new Bishop(blackTeam), "F8")
    board.addPiece(new Queen(blackTeam), "E8")
    board.addPiece(new King(blackTeam), "D8")
    board.addPiece(new Bishop(blackTeam), "C8")
    board.addPiece(new Horse(blackTeam), "B8")
    board.addPiece(new Tower(blackTeam), "A8")
    board.addPiece(new Pigeon(blackTeam), "H7")
    board.addPiece(new Pigeon(blackTeam), "G7")
    board.addPiece(new Pigeon(blackTeam), "F7")
    board.addPiece(new Pigeon(blackTeam), "E7")
    board.addPiece(new Pigeon(blackTeam), "D7")
    board.addPiece(new Pigeon(blackTeam), "C7")
    board.addPiece(new Pigeon(blackTeam), "B7")
    board.addPiece(new Pigeon(blackTeam), "A7")
    
    board.addPiece(new Tower(whiteTeam), "A1")
    board.addPiece(new Horse(whiteTeam), "B1")
    board.addPiece(new Bishop(whiteTeam), "C1")
    board.addPiece(new Queen(whiteTeam), "D1")
    board.addPiece(new King(whiteTeam), "E1")
    board.addPiece(new Bishop(whiteTeam), "F1")
    board.addPiece(new Horse(whiteTeam), "G1")
    board.addPiece(new Tower(whiteTeam), "H1")
    board.addPiece(new Pigeon(whiteTeam), "H2")
    board.addPiece(new Pigeon(whiteTeam), "G2")
    board.addPiece(new Pigeon(whiteTeam), "F2")
    board.addPiece(new Pigeon(whiteTeam), "E2")
    board.addPiece(new Pigeon(whiteTeam), "D2")
    board.addPiece(new Pigeon(whiteTeam), "C2")
    board.addPiece(new Pigeon(whiteTeam), "B2")
    board.addPiece(new Pigeon(whiteTeam), "A2")

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

  toObject() {
    return this.allPositions().reduce((positionObject, position) => {
      const piece = this.getPieceAt(position.toString())
      positionObject[position.toString()] = [piece.name(), piece.team]
      return positionObject
    }, {})
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

  getPieceAt(positionString) {
    const position = new Position(positionString)
    const piece = this.positions[position.verticalIndex()][position.horizontalIndex()]
    return piece
  }

  __putPieceAtPosition(piece, positionString) {
    const position = new Position(positionString)
    this.positions[position.verticalIndex()][position.horizontalIndex()] = piece
  }
}

module.exports = ChessBoard