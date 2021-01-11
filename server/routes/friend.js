const express = require("express");
const router = express.Router();
const mysql = require("../db/mysql");
const cookie = require("cookie");

router.get("/profile", (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  const sql = `select image, name, nickname, message from profile where id='${id}'`;
  mysql.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      throw error;
    }
    res.send(rows);
  });
});

router.get("/friend", (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  let sql = `select * from profile where id in 
    (select reqId from friend where resId='${id}' and res=1 
    union all select resId from friend where reqId='${id}' and res=1 order by reqId)
    order by (case when ascii(substring(nickname, 1)) between 48 and 57 then 3
    when ascii(substring(nickname, 1)) < 128 then 2 else 1 end), nickname`;
  sql = sql.replace("\n", "");
  mysql.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      throw error;
    }
    res.send(rows);
  });
});

router.post("/search", (req, res) => {
  const { headers } = req;
  const reqId = cookie.parse(headers.cookie).id;
  const search = req.body.search;
  const sql = `select count(*) as num, id from profile where id='${search}' or email='${search}' or phone='${search}'`;
  // 리펙
  mysql.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      throw error;
    }
    if (rows[0].num == 0 || reqId == rows[0].id) {
      res.send(rows);
    } else {
      const resId = rows[0].id;
      const sql2 = `select count(*) as num from friend where reqId='${reqId}' and resId='${resId}' or reqId='${resId}' and resId='${reqId}'`;
      const sql3 = `select image, id, nickname, message from profile where id='${resId}'`;
      mysql.query(sql2, (err2, rows2, fields2) => {
        if (err2) {
          console.log(err2);
          throw error;
        }
        if (rows2[0].num !== 0) {
          res.send(rows2);
        } else {
          mysql.query(sql3, (err3, rows3, fields3) => {
            if (err3) {
              console.log(err3);
              throw error;
            }
            res.send(rows3);
          });
        }
      });
    }
  });
});

router.post("/request", (req, res) => {
  const { headers } = req;
  const reqId = cookie.parse(headers.cookie).id;
  const resId = req.body.resId;
  const sql = `insert into friend(reqId, resId, reqDate) values('${reqId}', '${resId}', now())`;
  mysql.query(sql, (err, rows, fields) => {
    if (err) {
      console.log(err);
      throw error;
    }
    if (rows.affectedRows > 0) {
      res.status(201).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;
