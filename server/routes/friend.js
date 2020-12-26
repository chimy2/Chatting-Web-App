const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');

router.get('/list', (req, res) => {

  const { headers, method, url } = req;
  const id = "";
  console.log(JSON.stringify(headers.cookie));
  console.log(req.cookie);
  console.log(req.cookies);
  const sql = `select image, name, nickname, message from profile where id='${id}'`;
  mysql.query(
    sql,
    (err, rows, fields) => {
      console.log(rows);
      res.send(rows);
      // res.send({name: '1234', nickname: '11', message: 'gg'});
    }
  );
});

module.exports = router;