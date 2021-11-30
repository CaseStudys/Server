/* eslint-disable */
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "hal_motor_auction",
});

module.exports.mysql_connection = db;
