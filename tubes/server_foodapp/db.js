const mysql = require('mysql2');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'foodapp'
});
conn.connect(err => {
  if (err) throw err;
  console.log('MySQL connected');
});
module.exports = conn;