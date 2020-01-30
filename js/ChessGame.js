class ChessGame {
  constructor(chessBoard, currentTeam = ChessGame.TEAMS().WHITE) {
    this.board = chessBoard
    this.currentTeam = currentTeam
  }

  static TEAMS() {
    return { BLACK: "black", WHITE: "white" };
  }

  movePiece(from, to) {
    const piece = this.board.getPieceAt(from)
    
    if(piece.name() == null) {
      throw new Error("Não há nenhuma peça nessa posição")
    }

    if(piece.can_move(from, to) === false) {
      throw new Error("Impossivel mover esta peça para a posição destino")
    }

    if(piece.team !== this.currentTeam) {
      throw new Error("Impossível mover a peça da outra equipe")
    }

    const pieceAtDestination = this.board.getPieceAt(to)
    if(piece.team === pieceAtDestination.team) {
      throw new Error("Impossivel mover esta peça para a posição destino pois há outra peça nesta posição.")
    }

    this.board.removePieceAt(to)
    this.board.movePiece(from, to)
    this.__changeCurrentTeam()
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