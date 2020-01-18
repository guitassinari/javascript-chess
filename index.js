const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname+'/css'))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/move', function (req, res) {
  console.log(req)
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
