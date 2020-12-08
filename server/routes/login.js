const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');

router.get('/', (req, res) => {
  res.send('<form method="post" action="/api/login"><button type="submit">ddddddd</button></form>');
});

router.post('/', (req, res) => {
  // body-parser 미들웨어를 통해 
  // 매개변수(parameter) req의 body에 저장될 내용을 직접 만들기 
  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
    console.log('안뇽 난 청크야', chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    console.log(body);
  });
  // mysql.query(
  //   "select count(*) from user where id=? and password=?",

  // );
});

module.exports = router;