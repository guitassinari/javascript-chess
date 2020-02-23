const Board = require('./ChessBoard')
const Position = require('./Position')

class ChessGame {
  constructor(chessBoard, currentTeam = ChessGame.TEAMS().WHITE) {
    this.board = chessBoard
    this.currentTeam = currentTeam
  }

  static TEAMS() {
    return { BLACK: "black", WHITE: "white" };
  }

  static newGame() {
    const board = Board.initialBoard(ChessGame.TEAMS().BLACK, ChessGame.TEAMS().WHITE)
    return new ChessGame(board)
  }

  static loadGame(boardObj) {
    const board = Board.fromObject(boardObj)
    return new ChessGame(board, "white")
  }

  movePiece(from, to) {
    const fromPosition = new Position(from)
    const toPosition = new Position(to)
    
    this.__verifyPieceMovementRules(fromPosition, toPosition)

    this.board.removePieceAt(toPosition)
    this.board.movePiece(fromPosition, toPosition)
    this.__changeCurrentTeam()
  }

  __verifyPieceMovementRules(fromPosition, toPosition) {
    const sourcePiece = this.board.getPieceAt(fromPosition)
    const destinationPiece = this.board.getPieceAt(toPosition)

    if(sourcePiece.name() == null) {
      throw new Error("Não há nenhuma peça nessa posição")
    }

    if(sourcePiece.can_move(fromPosition, toPosition) === false) {
      throw new Error("Impossivel mover esta peça para a posição destino")
    }

    if(sourcePiece.team !== this.currentTeam) {
      throw new Error("Impossível mover a peça da outra equipe")
    }

    if(sourcePiece.team === destinationPiece.team) {
      throw new Error("Impossivel mover esta peça para a posição destino pois há outra peça nesta posição.")
    }
  }

  __changeCurrentTeam() {
    if(this.currentTeam === ChessGame.TEAMS().BLACK) {
      this.currentTeam = ChessGame.TEAMS().WHITE
    } else {
      this.currentTeam = ChessGame.TEAMS().BLACK
    }
  }
}

module.exports = ChessGame