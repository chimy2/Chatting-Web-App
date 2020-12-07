const express = require('express');
const router = express.Router();


const data = {'id': 'qwert', 'password': '1234'};

router.get('/', (req, res) => {
  res.send(data);
});

module.exports = router;