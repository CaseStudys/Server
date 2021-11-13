const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const cors = require('cors')
const mysql = require('mysql');
app.use(express.json());
app.use(cors());

const msg = [
  "|----------CONNECTED---------|",
  "|---------✋ START ✋--------|"
];

//-------------------------
//接続情報
//-------------------------
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'express_db'
});

//------------------------------
//localhost:8080アクセス時返却
//------------------------------
app.get("/", (req, res) => {
  db.connect((err)=> {
    // if (err) throw err;
    console.log("MySQL Connected!");
      db.query(
        "SELECT * FROM users",
        (err, result) => {
          console.log(msg[2]);
          console.log(result);
          res.status(200).json(result)
        }
      );
  });
});

app.listen(
  PORT,
  console.log(`✋ Server Start:ポート番号${PORT}番 ✋`)
);

