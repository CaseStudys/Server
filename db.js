const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "express_db",
});

module.exports.mysql_connection = db;
