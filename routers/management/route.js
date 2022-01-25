/*/management*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const MANAGEMENT_END_POINT = "/management";
const auth = require("../../authentication");

//(従業員)出品者管理一覧を表示するGETのAPI
//取引中、出品中、登録車両全て　を返す
router.route(MANAGEMENT_END_POINT).get(async (req, res) => {
  if (!(await auth(req))) return res.redirect("/login"); //cookie認証に失敗した場合「/login」にリダイレクト

  //sql文生成----
  //取引中
  const nowProject =
    "SELECT c.car_id,c.picture_path,c.type_name,p.price FROM cars c LEFT JOIN exhibits e ON c.car_id = e.car_id LEFT JOIN projects p ON e.exhibit_id = p.exhibit_id WHERE p.project_id IS NOT NULL;";
  //オークション登録中
  const nowExhibit =
    "SELECT c.car_id,c.picture_path,c.type_name,c.purchace_price FROM cars c LEFT JOIN exhibits e ON c.car_id = e.car_id WHERE register_flg = 1 AND e.exhibit_id IS NULL;"
  //取引中とオークション登録中を除いた全車両
  const withoutProEx =
    "SELECT car_id,picture_path,type_name,purchace_price,register_flg FROM cars WHERE register_flg =0;";
  //全車両
  //const allCars = "SELECT car_id,picture_path,type_name,purchace_price,register_flg FROM cars";

  //DB処理
  db.mysql_connection.connect((err) => {
    db.mysql_connection.query(
      nowProject + nowExhibit + withoutProEx,
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        return res.status("200").render("emp_exhibit_management.ejs", { values: result });

        //テスト用
        //return res.status(200).json(result);//データ確認
        //return res.status("200").render("get_test.ejs", {values: result});//ejs確認
      }
    );
  });
});

module.exports = router;
