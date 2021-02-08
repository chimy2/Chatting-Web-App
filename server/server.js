const express = require('express');
const app = express();
const api = require('./routes/index');
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');

// socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:5000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('io 연결', socket);
});

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

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});