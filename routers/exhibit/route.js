/*/exhibit*/
const express = require("express");
const db = require("../../db"); //db処理で使う。
const router = express.Router(); //api定義で使う。これを使えばファイル分割してapi作れる。
const EXHIBIT_END_POINT = "/exhibit"; //APIのURL


//出品する中古車両のID(car_id)を受け取り、出品登録するPOSTのAPI
router.route(EXHIBIT_END_POINT).post(async (req, res) => {
  /* ☆手順１：リクエストボディから処理に必要なデータを取り出す。☆*/
  /*
  bodyの中はこんな感じ。必要なデータはbodyのdataの中に入れて送ることになったよ。↓
  {
    data:{
        car_id(出品する中古車のid)
        start_data(開始する日時)
    }
  }
  */

  //db登録に必要なデータをbodyから取得。
  const body = req.body;
  const carId = body.car_id;
  const startDate = body.start_date;

  /* ☆手順２：データベースに新しい出品データを登録。（出品テーブルに新しいカラムを挿入）☆*/
  db.mysql_connection.connect((err) => {
    const placeholder = [carId, startDate]; //↓のsql文の「？」に当てはめる変数を定義
    db.mysql_connection.query(
      "INSERT INTO exhibits(car_id,start_date) VALUE(?,?);SELECT c.car_id,c.picture_path,c.type_name,c.purchace_price FROM cars c LEFT JOIN exhibits e ON c.car_id = e.car_id WHERE e.exhibit_id IS NULL;", //主キーのexhibit_idは自動生成される。
      placeholder, //ここで「？」に当てはめる変数を定義したplaceholder配列を渡せば、「？」に順に当てはめてくれる。
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        return res.status(200).json(result[1]);
      }
    );
  });
});



//出品登録されていない車両データをすべて返すGETのAPI
router.route(EXHIBIT_END_POINT).get(async (req, res) => {
  //DB処理
  db.mysql_connection.connect((err) => {
    db.mysql_connection.query(
      "SELECT c.car_id,c.picture_path,c.type_name,c.purchace_price FROM cars c LEFT JOIN exhibits e ON c.car_id = e.car_id WHERE e.exhibit_id IS NULL;",
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        return res.status("200").render("emp_exhibit.ejs", {values: result});
        //テスト用
        //return res.status("200").render("exhibit_get_test.ejs", {values: result});
      }
    );
  });
});

module.exports = router;
