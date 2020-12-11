const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');

router.post('/join', (req, res) => {
  const { headers, method, url } = req;
  mysql.query(
    'insert into user values (0, ?, ?, ?, ?, ?)',
    [req.body.id, req.body.password, req.body.name, req.body.email, req.body.phone],
    (err, rows, fields) => {
      if (err) throw error;
      if(rows.affectedRows > 0){
        res.writeHead(201, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ headers, method, url }));
      }else if(rows.affectedRows == 0) {
        console.log('회원가입 실패');
        res.writeHead(205, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ headers, method, url }));
      }
    }
  );
});

router.post('/login', (req, res) => {
  // body-parser 미들웨어를 통해 
  // 매개변수(parameter) req의 body에 저장될 내용을 직접 만들기 
  // let body = [];
  // req.on('data', (chunk) => {
  //   body.push(chunk);
  // }).on('end', () => {
  //   body = Buffer.concat(body).toString();
  //   가져온 데이터를 원하는 형태로 가공
  //   )
  // });
  const { headers, method, url } = req;
  mysql.query(
    'select count(*) as body from user where id=? and password=?',
    [req.body.id, req.body.password],
    (err, rows, fields) => {
      const body = rows[0].body;
      if (err) throw error;
      if(body > 0){
        res.writeHead(201, {
          'Content-Type': 'application/json'
        });
        res.end(JSON.stringify({ headers, method, url, body }));
      }else {
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Set-Cookie': [
            'id=1234; path=/'
          ]
        });
        res.end(JSON.stringify({ headers, method, url, body }));
      }
    }
  );
});

module.exports = router;