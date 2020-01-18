const express = require('express');
const path = require('path');
const app = express();
const ChessBoard = require('./js/ChessBoard')

app.use(express.static(__dirname+'/css'))
app.use(express.static(__dirname+'/js'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/new', function (req, res) {
  const board = ChessBoard.initialBoard()
  const object = board.allPositions().reduce((positionObject, position) => {
    positionObject[position.toString()] = board.getPieceAt(position).name()
    return positionObject
  }, {})

  res.json(object);
});

app.post('/move', function (req, res) {
  console.log(req)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});