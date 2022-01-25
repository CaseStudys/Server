/*/management/detail*/
const express = require("express");
const db = require("../../../db");
const router = express.Router();
const MANAGEMENT_DETAIL_END_POINT = "/management/detail";
const auth = require("../../../authentication");

//管理詳細(車両詳細ページ)を表示するGETのAPI
router.route(`${MANAGEMENT_DETAIL_END_POINT}/:car_id`).get(async (req, res) => {
  if (!(await auth(req))) return res.redirect("/login"); //cookie認証に失敗した場合「/login」にリダイレクト

  //値取得
  const carId = req.params.car_id;

  //DB処理
  db.mysql_connection.connect((err) => {
    const placeholder = [carId];
    db.mysql_connection.query(
      "select * from cars where car_id = ?",
      placeholder,
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        console.log("cars!!!", result);
        return res
          .status("200")
          .render("emp_management_details.ejs", { values: result });
        //テスト用
        //res.status(200).json(result);//データ確認
        //return res.status("200").render("get_test.ejs", {values: result});//ejs確認
      }
    );
  });
});

module.exports = router;
