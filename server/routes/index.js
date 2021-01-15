const express = require("express");
const router = express.Router();
const cookie = require("cookie");
const mysql = require("../db/mysql");
const member = require("./member");
const friend = require("./friend");

router.use("/member", member);
router.use("/friend", friend);

router.get("/note", (req, res) => {
  console.log("get");
});
router.post("/note", (req, res) => {
  const { headers } = req;
  const id = cookie.parse(headers.cookie).id;
  const title = req.body.title;
  const content = req.body.content;
  const sql = `insert into note values('${id}', '${title}', '${content}', now())`;
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
  console.log("put");
});
router.delete("/note", (req, res) => {
  console.log("delete");
});

// router.get('/', (req, res) => {
//   mysql.query(
//     "select * from user",
//     (err, rows, fields) => {
//       res.send(rows);
//     }
//   );
// });

module.exports = router;
