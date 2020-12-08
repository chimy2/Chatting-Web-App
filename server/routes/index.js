const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');

const login = require('./login');

router.use('/login', login);

router.get('/', (req, res) => {
  mysql.query(
    "select * from user",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

module.exports = router;