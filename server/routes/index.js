const express = require('express');
const router = express.Router();
const mysql = require('../db/mysql');
const member = require('./member');
const friend = require('./friend');

router.use('/member', member);
router.use('/friend', friend);

// router.get('/', (req, res) => {
//   mysql.query(
//     "select * from user",
//     (err, rows, fields) => {
//       res.send(rows);
//     }
//   );
// });

module.exports = router;