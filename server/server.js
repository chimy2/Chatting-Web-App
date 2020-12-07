const express = require('express');
const app = express();
const api = require('./routes/index');
const port = process.env.PORT || 5000;

app.use('/api', api);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});