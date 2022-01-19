/*/ledger*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const LEDGER_END_POINT = "/ledger";


//台帳管理画面を表示しプロジェクト一覧を渡すGETのAPI
router.route(LEDGER_END_POINT).get(async (req, res) => {
    //DB処理
    db.mysql_connection.connect((err) => {
      db.mysql_connection.query(
        "SELECT p.project_id,p.exhibit_id,p.buyer_id,p.purchase_date,p.price,p.due_date,p.repair_service_flg,p.car_inspection_service_flg,p.documents_flg,p.shipped_flg,p.delivered_flg,p.deposit_apply_flg,p.reminder_flg,p.cancel_flg,p.illegal_action_flg,p.payment_flg,p.receipt_contact_flg,u.name,u.phone_number FROM projects p LEFT JOIN users u ON p.buyer_id = u.user_id;",
        (err, result) => {
          if (err) {
            return res.status(500).json({ code: 500, message: err });
          }
          return res.status("200").render("emp_ledger_management.ejs", {values: result});
          //テスト用
          //return res.status("200").render("get_test.ejs", {values: result});
          //return res.status(200).json(result);
        }
      );
    });
  });


module.exports = router;
