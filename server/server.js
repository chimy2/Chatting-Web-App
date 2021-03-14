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
  // console.log(socket.rooms);
  // socket.on('login', (data) => {
  //   console.log("소켓", data);
  // });

  socket.on('join', (data) => {
    const { roomId, id } = data;
    socket.join(roomId);
    console.log(roomId, id, "입장");
    console.log(socket.rooms);    
  });

  socket.on('talk', (data) => {
    const { roomId, id, msg } = data;
    console.log(roomId, id, msg);
    socket.to('33').emit("talk", { roomId, id, msg });
    console.log(socket.rooms);    
  });

  socket.on('leave', (data) => {
    const { roomId, id } = data;
    socket.leave(roomId);
    console.log(roomId, id, "퇴장");
    console.log(socket.rooms);    
  });

  socket.on('disconnect', (reason)=>{
    console.log(socket.id, "연결 종료", reason);
  });
});