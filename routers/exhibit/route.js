/*/exhibit*/
const express = require("express");
const db = require("../../db"); //db処理で使う。
const router = express.Router(); //api定義で使う。これを使えばファイル分割してapi作れる。
const EXHIBIT_END_POINT = "/exhibit"; //APIのURL

//出品する中古車両のID(car_id)を受け取り、出品登録するPOSTのAPI
router.route(EXHIBIT_END_POINT).post(async (req, res) => {
  //db登録に必要なデータをbodyから取得。
  const body = req.body;
  const carId = body.car_id;
  const startDate = body.start_date;

  //sql文生成----
  //車両登録
  const insertCar = "INSERT INTO exhibits(car_id,start_date) VALUE(?,?);";
  //register_flgたてる
  const updateRegister = "UPDATE cars SET register_flg = 1 WHERE car_id = ?;";

  //まだ出品登録されていない車両情報を取得
  const selectCars =
    "SELECT car_id,picture_path,type_name,purchace_price FROM cars WHERE register_flg = 0;";

  //DB処理
  db.mysql_connection.connect((err) => {
    const placeholder = [carId, startDate, carId];
    db.mysql_connection.query(
      insertCar + updateRegister + selectCars,
      placeholder,
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        return res.status(200).json(result[2]);
      }
    );
  });
});

//(従業員)登録者出品ページを表示するGETのAPI
//出品登録されていない車両データをすべて返す
router.route(EXHIBIT_END_POINT).get(async (req, res) => {
  //DB処理
  db.mysql_connection.connect((err) => {
    db.mysql_connection.query(
      "SELECT car_id,picture_path,type_name,purchace_price FROM cars WHERE register_flg = 0;",
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        return res.status("200").render("emp_exhibit.ejs", { values: result });
        //テスト用
        //return res.status("200").json(result);//値確認
        //return res.status("200").render("get_test.ejs", {values: result});//ejs確認
      }
    );
  });
});

module.exports = router;
