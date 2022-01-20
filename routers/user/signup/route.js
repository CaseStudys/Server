const express = require("express");
const db = require("../../../db");
const router = express.Router();
const USERSIGNUP_END_POINT = "/user/signup";

//サインアップ画面を表示するGETのAPI
router.route(USERSIGNUP_END_POINT).get((req, res) => {
  res.status("200").render("signup.ejs");
});

//会員登録を行うPOSTのAPI
//フロントでe-mailチェックとかpassword暗号化するよね？してる前提で書くよ :)
router.route(USERSIGNUP_END_POINT).post(async (req, res) => {
  //cookie有効時間(ミリ秒)
  const limitTime = 10800000; //3時間

  //db登録に必要なデータをbodyから取得。
  const body = req.body;

  //sql文生成---
  //ユーザー登録
  const insertUser =
    "INSERT INTO users(distinction,name,birthday,address,phone_number,password,trust_flg) VALUES(?,?,?,?,?,?,?);";
  //値を配列に格納
  var valueList = [];
  valueList.push(body.distinction);
  valueList.push(body.name);
  valueList.push(body.birthday);
  valueList.push(body.address);
  valueList.push(body.phone_number);
  valueList.push(body.password);
  valueList.push(body.trust_flg);

  //DB処理
  db.mysql_connection.connect((err) => {
    db.mysql_connection.query(insertUser, valueList, (err, result) => {
      if (err) {
        return res.status(500).json({ code: 500, message: err });
      }
      //cookie設定
      res.cookie("user_id", result.insertId, {
        maxAge: limitTime,
        httpOnly: false,
      });
      res.cookie("name", body.name, { maxAge: limitTime, httpOnly: false });
      res.cookie("password", body.password, {
        maxAge: limitTime,
        httpOnly: false,
      });
      //redirect
      return res.status("200").json({ result: true });
      //テスト用
      //return res.status(200).json(result);//値確認
      //return res.status("200").render("get_test.ejs", {values: result[1]});//ejs確認
    });
  });
});

module.exports = router;
