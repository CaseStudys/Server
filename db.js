const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "express_db",
  multipleStatements: true//複数クエリ発行できる
});

module.exports.mysql_connection = db;
