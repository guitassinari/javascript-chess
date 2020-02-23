const Horse = require('./ChessPieces/Horse')
const Tower = require('./ChessPieces/Tower')
const Queen = require('./ChessPieces/Queen')
const Bishop = require('./ChessPieces/Bishop')
const Pawn = require('./ChessPieces/Pawn')
const King = require('./ChessPieces/King')
const NullPiece = require('./ChessPieces/Null')
const Position = require('./Position')
const InitialBoardObject = require('./InitialBoard')

class ChessBoard {
  constructor() {
    this.__emptyBoard()
  }

  static PIECE_CLASSES() {
    return {
      'horse': Horse,
      'tower': Tower,
      'king': King,
      'queen': Queen,
      'bishop': Bishop,
      'pawn': Pawn
    }
  }

  static BOARD_SIZE() {
    return 8
  }

  static fromObject(boardObject) {
    const board = new ChessBoard()
    Object.entries(boardObject).forEach(([tileId, [piece, team]]) => {
      board.add(piece, team, tileId)
    })
    return board
  }

  static initialBoard() {
    return ChessBoard.fromObject(InitialBoardObject)
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
      const piece = this.getPieceAt(position)
      positionObject[position.toString()] = [piece.name(), piece.team]
      return positionObject
    }, {})
  }

  allPositions() {    
    return Position.allPossiblePositions()
  }

  add(pieceName, team, tileId) {
    const position = new Position(tileId)
    const pieceClass = ChessBoard.PIECE_CLASSES()[pieceName] || NullPiece
    this.addPiece(new pieceClass(team), position)
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