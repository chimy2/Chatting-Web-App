const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const mysql = require("../db/mysql");
const member = require("./member");
const friend = require("./friend");

router.use("/member", member);
router.use("/friend", friend);

// // socket.io
// const http = require('http').createServer(router);
// const io = require('socket.io')(http);

// // app.get("/socket.io", (req, res) => {
//   // console.log("오는데요?");
//   io.on('connection', (socket) => {
//     console.log('io 연결', socket);
//     socket.on('login', (data) => {
//       console.log("소켓", data);
//     })
//   });
// // })

router.get("/calendar", (req, res) => {
  const sql = `select * from calendar`;
  mysql.query(sql, (err, rows, field) => {
    if (err) {
      console.log(err);
    }
    res.send(rows);
  });
});

router.get("/note", (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  const sql = `select noteId, title, content, date from note where id='${id}' order by noteId desc`;
  mysql.query(sql, (err, rows, field) => {
    if (err) {
      console.log(err);
      throw error;
    }
    res.send(rows);
  });
});

router.post("/note", (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  const title = req.body.title;
  const content = req.body.content;
  const sql = `insert into note(id, title, content, date) values('${id}', '${title}', '${content}', now())`;
  mysql.query(sql, (err, rows, field) => {
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

router.put("/note", (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  const { noteId, title, content } = req.body;
  const sql = `update note set title='${title}', content='${content}' where id='${id}' and noteId=${noteId}`;
  mysql.query(sql, (err, rows, field) => {
    if (err) {
      console.log(err);
      throw error;
    }
    if (rows.affectedRows > 0) {
      res.status(200).end();
    }
  });
});

router.delete("/note", (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  const noteId = req.body.noteId;
  const sql = `delete from note where id='${id}' and noteId=${noteId}`;
  mysql.query(sql, (err, rows, field) => {
    if (err) {
      console.log(err);
      throw error;
    }
    if (rows.affectedRows > 0) {
      res.status(200).end();
    }
  });
});

module.exports = router;
