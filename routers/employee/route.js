/*/employee*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const EMPLOYEE_END_POINT = "/employee";
const auth = require("../../authentication");
//社員情報を送られてきたID(employee_id)で検索して返すGETのAPI
router.route(`${EMPLOYEE_END_POINT}`).get(async (req, res) => {
  if (!(await auth(req))) return res.redirect("/login"); //cookie認証に失敗した場合「/login」にリダイレクト

  return res.status(200).render("emp_mypage.ejs");
});

router.route(`${EMPLOYEE_END_POINT}/:employee_id`).put((req, res) => {
  /* ☆手順１：リクエストパラメータから処理に必要なデータを取り出す。☆*/

  //bodyから、検索に使用する社員のidを取り出す。(employee_id)
  //GETリクエストはreq.getの中に該当データが格納して送られてくる。json可されていないのでそのまま使う
  const employeeId = req.params.employee_id;

  /* ☆手順２：データベースからemployeeIdに一致する社員データを取得する処理↓☆*/
  db.mysql_connection.connect((err) => {
    const placeholder = [employeeId];
    db.mysql_connection.query(
      "select * from employees where employee_id = ?",
      placeholder,
      (err, result) => {
        if (err) {
          res.status(500).json({ message: "エラー" });
        }
        console.log("検索終了");
        console.log(result);
        res.status(200).json(result);
      }
    );
  });
});

module.exports = router;
