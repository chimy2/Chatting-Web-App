const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');
const cookie = require('cookie');

router.get('/list', (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  const sql = `select image, name, nickname, message from profile where id='${id}'`;
  mysql.query(
    sql,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

module.exports = router;