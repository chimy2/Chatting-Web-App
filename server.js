const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

const data = [
  {'id': 'qwert', 'password': '1234'}
];

app.post('/', (req, res) => {
  console.log('도착');
  console.log(data);
  res.json(data);
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});