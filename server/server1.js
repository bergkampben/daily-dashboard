/*const express = require("express");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.options('/', function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});

const http = require('http').Server(app);

const io = require('socket.io')(http);

io.on('connection', (socket) => {
  console.log('Started');
})

const server = http.listen(3001, () => {
      console.log('Started');
});

app.get('/', async (req, res) => {
  res.send({ express: 'Hello From Express' });
});
*/