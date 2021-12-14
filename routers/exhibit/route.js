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
  const body = req.body;

  //db登録に必要なデータをbodyから取得。
  const carId = body.data.car_id;
  const startDate = body.data.start_date;

  /* ☆手順２：データベースに新しい出品データを登録。（出品テーブルに新しいカラムを挿入）☆*/
  db.mysql_connection.connect((err) => {
    const placeholder = [carId, startDate]; //↓のsql文の「？」に当てはめる変数を定義
    db.mysql_connection.query(
      "insert into exhibits(car_id,start_date) values(?,?)", //主キーのexhibit_idは自動生成される。
      placeholder, //ここで「？」に当てはめる変数を定義したplaceholder配列を渡せば、「？」に順に当てはめてくれる。
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
        //get(selectするAPI)じゃなくてpost（insertするAPI）だから特に返す値がない。成功したことさえ伝えればいいんかな？
        return res.status(200).json({ message: "成功" });
      }
    );
  });
});

module.exports = router;

//select * from cars inner join exhibits on cars.car_id = exhibits.car_id where cars.car_id = ?
