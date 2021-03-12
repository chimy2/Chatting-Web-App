const express = require('express');
const app = express();
const api = require('./routes/index');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

// bodyParser
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', api);

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const server=app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


// socket.io
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log(`${new Date()} ${socket.id} 연결`);
  console.log('rooms', socket.rooms);
  socket.on('login', (data) => {
    console.log("소켓", data);
  });

  socket.on('talk', (roomId ,nickname, msg) => {
    console.log(roomId, nickname, msg);
  });

  socket.on('disconnect', (reason)=>{
    console.log(socket.id, "연결 종료", reason);
  });
});