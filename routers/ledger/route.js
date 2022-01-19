/*/ledger*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const LEDGER_END_POINT = "/ledger";
const auth = require("../../authentication");

//台帳管理画面を表示しプロジェクト一覧を渡すGETのAPI
router.route(LEDGER_END_POINT).get(async (req, res) => {
  if (!(await auth(req))) return res.redirect("/login"); //cookie認証に失敗した場合「/login」にリダイレクト

  //DB処理
  db.mysql_connection.connect((err) => {
    db.mysql_connection.query("SELECT * FROM projects;", (err, result) => {
      if (err) {
        return res.status(500).json({ code: 500, message: err });
      }
      return res
        .status("200")
        .render("emp_ledger_management.ejs", { values: result });
      //テスト用
      //return res.status("200").render("get_test.ejs", {values: result});
    });
  });
});

module.exports = router;
