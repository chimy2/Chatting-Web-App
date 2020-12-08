const mysql = require('mysql');
const fs = require('fs');
// 상대경로로 설정 시 에러
const database = JSON.parse(fs.readFileSync(__dirname+'/../database.json'));

const connection = mysql.createConnection({
  host: database.host,
  user: database.user,
  password: database.password,
  database: database.database
});
connection.connect();

module.exports = connection;