const express = require('express');
const path = require('path');
const app = express();
const ChessBoard = require('./js/ChessBoard')
const ChessGame = require('./js/ChessGame')

app.use(express.static(__dirname+'/css'))
app.use(express.static(__dirname+'/js'))
app.use(express.json())

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/new', function (req, res) {
  const board = ChessBoard.initialBoard(ChessGame.TEAMS().WHITE, ChessGame.TEAMS().BLACK)

  res.json(board.toObject());
});

app.put('/new', function (req, res) {
  try {
    const board = ChessBoard.fromObject(req.body.board)
    const chessGame = new ChessGame(board, "white")
    chessGame.movePiece(req.body.movement[0], req.body.movement[1])
    res.json(chessGame.board.toObject());
  } catch (e) {
    res.status(400).json({ error: e.message })
  }  
});

app.post('/move', function (req, res) {
  console.log(req)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});