class ChessGame {
  TEAMS = { BLACK: "black", WHITE: "white" };

  constructor(chessBoard) {
    this.board = chessBoard
    this.currentTeam = TEAMS.WHITE
  }

  movePiece(from, to) {
    const piece = this.board.getPieceAt(from)
    if(piece.can_move(from, to) === false) {
      throw new Error("Impossivel mover esta peça para a posição destino")
    }

    if(piece.team() !== this.currentTeam) {
      throw new Error("Impossível mover a peça da outra equipe")
    }

    const pieceAtDestination = this.board.getPieceAt(to)
    if(piece.team() === pieceAtDestination.team()) {
      throw new Error("Impossivel mover esta peça para a posição destino pois há outra peça nesta posição.")
    }

    this.board.removePieceAt(to)
    this.board.movePiece(from, to)
    this.__changeCurrentTeam()
  }

  __changeCurrentTeam() {
    if(this.currentTeam === this.TEAMS.BLACK) {
      this.currentTeam = this.TEAMS.WHITE
    } else {
      this.currentTeam = this.TEAMS.BLACK
    }
  }
}

