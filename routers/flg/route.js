const express = require("express");
const db = require("../../db"); //db処理で使う。
const router = express.Router(); //api定義で使う。これを使えばファイル分割してapi作れる。
const FLG_END_POINT = "/flg"; //APIのURL


//スーパーフラグページ用のAPI
router.route(FLG_END_POINT).put(async (req, res) => {

  //値取得
  const body = req.body;
  const keyList = Object.keys(body);//キーだけ取得

  if (keyList[0] == "user_id") {//usersテーブル[(会員)PUT信用フラグのみ]

    const userId = body.user_id;
    const trustFlg = body.trust_flg;

    db.mysql_connection.connect((err) => {
      const placeholder = [trustFlg, userId];
      db.mysql_connection.query(
        "UPDATE users SET trust_flg = ? WHERE user_id = ?;",
        placeholder,
        (err, result) => {
          if (err) {
            return res.status(500).json({ code: 500,message: err });
          }
          return res.status(200).json({ result: true });
        }
      );
    });
  }
  else{//projectsテーブル

    const projectId = body.project_id;
    var cullumName = "";
    var flgValue = null;

    switch (keyList[1]) {//代入処理

      //(会員)PUT書類フラグ
      case "documents_flg":
        cullumName = keyList[1];
        flgValue = body.documents_flg;
        break;

      //(会員)PUT修理フラグ
      case "repair_service_flg":
        cullumName = keyList[1];
        flgValue = body.repair_service_flg;
        break;

      //(会員)PUT車検フラグ
      case "car_inspection_service_flg":
        cullumName = keyList[1];
        flgValue = body.car_inspection_service_flg;
        break;

      //(会員)PUT支払いフラグ
      case "payment_flg":
        cullumName = keyList[1];
        flgValue = body.payment_flg;
        break;

      //(会員)PUT受け取り連絡フラグ
      case "receipt_contact_flg":
        cullumName = keyList[1];
        flgValue = body.receipt_contact_flg;
        break;

      //(従業員)PUT消込フラグ
      case "deposit_apply_flg":
        cullumName = keyList[1];
        flgValue = body.deposit_apply_flg;
        break;

      //(従業員)PUT出荷フラグ
      case "shipped_flg":
        cullumName = keyList[1];
        flgValue = body.shipped_flg;
        break;

      //(従業員)PUT催促フラグ
      case "reminder_flg":
        cullumName = keyList[1];
        flgValue = body.reminder_flg;
        break;

      //(従業員)PUT法的措置フラグ
      case "illegal_action_flg":
        cullumName = keyList[1];
        flgValue = body.illegal_action_flg;
        break;
    }

    //DB処理
    db.mysql_connection.connect((err) => {
      const placeholder = [flgValue, projectId];
      db.mysql_connection.query(
        "UPDATE projects SET "+cullumName+" = ? WHERE project_id = ?;",
        placeholder,
        (err, result) => {
          if (err) {
            return res.status(500).json({ code: 500,message: err });
          }
          return res.status(200).json({ result: true });
        }
      );
    });
  }
});


////スーパーフラグページを表示するGETのAPI
router.route(FLG_END_POINT).get((req, res) => {
  res.status("200").render("super_flg.ejs");
});

module.exports = router;
