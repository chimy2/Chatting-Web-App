const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');
const cookie = require('cookie');

router.get('/profile', (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  const sql = `select image, name, nickname, message from profile where id='${id}'`;
  mysql.query(
    sql,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        throw error;
      }
      res.send(rows);
    }
  );
});

router.get('/friend', (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  let sql = `select * from profile where id in 
    (select reqId from friend where resId='${id}' and res=1 
    union all select resId from friend where reqId='${id}' and res=1 order by reqId)`;
  sql = sql.replace("\n", "");
  mysql.query(
    sql,
    (err, rows, fields) => {
      if (err) {
        console.log(err);
        throw error;
      }
      res.send(rows);
    }
  )
});

module.exports = router;