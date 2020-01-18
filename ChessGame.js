class ChessBoard {
  BOARD_SIZE = 8

  constructor() {
    this.__emptyBoard()
  }

  static initialBoard(teamOne, teamTwo) {
    const board = new ChessBoard() 
    
    board.addPiece(new Tower(teamTwo), "H8"),
    board.addPiece(new Horse(teamTwo), "G8"),
    board.addPiece(new Bishop(teamTwo), "F8"),
    board.addPiece(new Queen(teamTwo), "E8"),
    board.addPiece(new King(teamTwo), "D8"),
    board.addPiece(new Bishop(teamTwo), "C8"),
    board.addPiece(new Horse(teamTwo), "B8"),
    board.addPiece(new Tower(teamTwo), "A8"),
    board.addPiece(new Pigeon(teamTwo), "H7"),
    board.addPiece(new Pigeon(teamTwo), "G7"),
    board.addPiece(new Pigeon(teamTwo), "F7"),
    board.addPiece(new Pigeon(teamTwo), "E7"),
    board.addPiece(new Pigeon(teamTwo), "D7"),
    board.addPiece(new Pigeon(teamTwo), "C7"),
    board.addPiece(new Pigeon(teamTwo), "B7"),
    board.addPiece(new Pigeon(teamTwo), "A7"),
    
    board.addPiece(new Tower(teamOne), "A0")
    board.addPiece(new Horse(teamOne), "B0")
    board.addPiece(new Bishop(teamOne), "C0")
    board.addPiece(new Queen(teamOne), "D0")
    board.addPiece(new King(teamOne), "E0")
    board.addPiece(new Bishop(teamOne), "F0")
    board.addPiece(new Horse(teamOne), "G0")
    board.addPiece(new Tower(teamOne), "H0")
    board.addPiece(new Pigeon(teamOne), "H1")
    board.addPiece(new Pigeon(teamOne), "G1")
    board.addPiece(new Pigeon(teamOne), "F1")
    board.addPiece(new Pigeon(teamOne), "E1")
    board.addPiece(new Pigeon(teamOne), "D1")
    board.addPiece(new Pigeon(teamOne), "C1")
    board.addPiece(new Pigeon(teamOne), "B1")
    board.addPiece(new Pigeon(teamOne), "A1")

    return board
  }

  __emptyBoard() {
    this.positions = []
    for(let i = 0; i < this.BOARD_SIZE; i++) {
      this.positions[i] = []
      for(let j = 0; j < this.BOARD_SIZE; j++) {
        this.positions[i][j] = new NullPiece()
      } 
    }
  }

  addPiece(piece, position) {

  }

  removePieceAt(position) {

  }

  movePiece(from, to) {

  }

  getPieceAt(position) {

  }

  __translatePositionToIndexes(position) {

  }
}

class Horse {
  constructor(teamColor, initialPosition) {

  }
}

class Tower {
  constructor(teamColor, initialPosition) {

  }
}

class Queen {
  constructor(teamColor, initialPosition) {

  }
}

class Bishop {
  constructor(teamColor, initialPosition) {

  }
}

class King {
  constructor(teamColor, initialPosition) {

  }
}

class Pigeon {
  constructor(teamColor, initialPosition) {

  }
}

class NullPiece {
  constructor() { }

  can_move(from, to) {
    true
  }

  team() {
    ""
  }
}

class ChessGame {
  TEAMS = { BLACK: "black", WHITE: "white" };

  constructor(chessBoard) {
    this.board = chessBoard
  }

  move(from, to) {
    const piece = this.board.getPieceAt(from)
    if(piece.can_move(from, to) === false) {
      throw new Error("Impossivel mover esta peça para a posição destino")
    }

    const pieceAtDestination = this.board.getPieceAt(to)
    if(piece.team() === pieceAtDestination.team()) {
      throw new Error("Impossivel mover esta peça para a posição destino pois há outra peça nesta posição.")
    }

    this.board.removePieceAt(to)
    this.board.movePiece(from, to)
  }
}

