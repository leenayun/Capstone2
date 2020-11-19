var mysql = require('mysql');
const db = mysql.createPool({
  host: '192.168.63.2',
  user: 'nayun',
  password: '123',
  database: 'conference',
  port: 3306,
});

module.exports = db;
