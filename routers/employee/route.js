const express = require("express");
const db = require("../../db");
const router = express.Router();
const EMPLOYEE_END_POINT = "/employee";

//社員情報を送られてきたID(employee_id)で検索して返すGETのAPI
router.route(`${EMPLOYEE_END_POINT}/:employee_id`).get((req, res) => {
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
        res.status(200).json(result);
      }
    );
  });
});

module.exports = router;
