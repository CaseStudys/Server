/*/exhibit*/
const express = require("express");
const db = require("../../db"); //db処理で使う。
const router = express.Router(); //api定義で使う。これを使えばファイル分割してapi作れる。
const EXHIBIT_END_POINT = "/exhibit"; //APIのURL
const auth = require("../../authentication");

//出品する中古車両のID(car_id)を受け取り、出品登録するPOSTのAPI
router.route(EXHIBIT_END_POINT).post(async (req, res) => {
  //db登録に必要なデータをbodyから取得。
  const body = req.body;
  const carId = body.car_id;
  const startDate = body.start_date;

  //sql文生成----
  //exhibits　tableのデータ検索　placeHolder使うと'付いてエラー出るから直入れ
  const selectExhibits =
    "SELECT start_date FROM exhibits where start_date LIKE '%" +
    startDate +
    "%' ORDER BY start_date desc;";
  //車両登録
  var insertExhibit = "";
  //まだ出品登録されていない車両情報を取得
  const selectCars =
    "SELECT c.car_id,c.picture_path,c.type_name,c.purchace_price FROM cars c LEFT JOIN exhibits e ON c.car_id = e.car_id WHERE e.exhibit_id IS NULL;";

  //DB処理
  db.mysql_connection.connect((err) => {
    //日時設定ーーーーーーーーーー
    db.mysql_connection.query(selectExhibits, (err, result) => {
      if (err) {
        return res.status(500).json({ code: 500, message: err });
      }
      //その日程の１台目の場合--
      if (result.length == 0) {
        insertExhibit =
          "INSERT INTO exhibits(car_id,start_date) VALUE(" +
          carId +
          ",'" +
          startDate +
          " 09:00:00');";
      } else {
        //２台目以降の場合--
        var lastTime = result[0].start_date;
        lastTime.setMinutes(lastTime.getMinutes() + 5);
        const hour = lastTime.getHours();
        const minute = lastTime.getMinutes();
        const insertDate = startDate + " " + hour + ":" + minute + ":" + "00";

        insertExhibit =
          "INSERT INTO exhibits(car_id,start_date) VALUE(" +
          carId +
          ",'" +
          insertDate +
          "');";
      }
      db.mysql_connection.query(
        //出品登録ーーーーーーーーーーーーー
        insertExhibit,
        (err, result) => {
          if (err) {
            return res.status(500).json({ code: 500, message: err });
          }
          db.mysql_connection.query(
            //出品登録ーーーーーーーーーーー
            selectCars,
            (err, result) => {
              if (err) {
                return res.status(500).json({ code: 500, message: err });
              }
              return res.status(200).json(result);
              //return res.status("200").render("get_test.ejs", {values: result});こっち？

              //テスト用
              //return res.status("200").json(result);//値確認
              //return res.status("200").render("get_test.ejs", {values: result});//ejs確認
            }
          );
        }
      );
    });
  });
});

//(従業員)登録者出品ページを表示するGETのAPI
//出品登録されていない車両データをすべて返す
router.route(EXHIBIT_END_POINT).get(async (req, res) => {
  if (!(await auth(req))) return res.redirect("/login"); //cookie認証に失敗した場合「/login」にリダイレクト

  //DB処理
  db.mysql_connection.connect((err) => {
    db.mysql_connection.query(
      "SELECT c.car_id,c.picture_path,c.type_name,c.purchace_price FROM cars c LEFT JOIN exhibits e ON c.car_id = e.car_id WHERE e.exhibit_id IS NULL;",
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
