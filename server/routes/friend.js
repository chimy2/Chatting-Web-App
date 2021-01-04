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
    union all select resId from friend where reqId='${id}' and res=1 order by reqId)
    order by (case when ascii(substring(nickname, 1)) between 48 and 57 then 3
    when ascii(substring(nickname, 1)) < 128 then 2 else 1 end), nickname`;
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
  );
});

router.post('/search', (req, res) => {
  let search = req.body.search;
  const sql = `select  count(*) as num, image, id, nickname, message from profile where id='${search}' or phone='${search}'`
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

module.exports = router;