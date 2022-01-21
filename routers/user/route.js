/*/user*/
const express = require("express");
const db = require("../../db");
const auth = require("../../authentication");
const router = express.Router();
const USER_END_POINT = "/user";

//マイページを表示するGETのAPI
//ユーザー情報と取引車両情報を渡す
router.route(USER_END_POINT).get(async (req, res) => {
  if (!(await auth(req))) return res.redirect("/login"); //cookie認証に失敗した場合「/login」にリダイレクト
  //データ取得
  const body = req.body;
  const userId = body.user_id;

  //一つ前の月を取得
  const date = new Date();
  const lastMounth = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    date.getDate()
  );
  const requestMounth =
    lastMounth.getFullYear() + "-" + (lastMounth.getMonth() + 1) + "%";

  //sql文生成
  //ユーザー情報取得
  const selectUser = "SELECT name,phone_number FROM users WHERE user_id = ?;";
  //取引車両情報取得
  const selectTransaction =
    "SELECT p.project_id,c.car_id,c.type_name,p.price,p.due_date,p.deposit_apply_flg,p.payment_flg,c.picture_path FROM users u LEFT JOIN projects p ON u.user_id = p.buyer_id LEFT JOIN exhibits e ON p.exhibit_id = e.exhibit_id LEFT JOIN cars c ON e.car_id = c.car_id WHERE p.cancel_flg = 0 AND p.deposit_apply_flg = 0 AND p.buyer_id = ?;";
  //先月１ヶ月間の購入台数と総額
  const lastProjects =
    "SELECT COUNT(*) AS NumOfunits,SUM(total_price) AS total_price FROM projects WHERE purchase_date LIKE ? AND cancel_flg = 0;";

  //DB処理
  db.mysql_connection.connect((err) => {
    const placeHolder = [userId, userId, requestMounth];
    db.mysql_connection.query(
      selectUser + selectTransaction + lastProjects,
      placeHolder,
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        return res.status("200").render("user_mypage.ejs", { values: result });

        //テスト用
        //return res.status(200).json(result);//値確認
        //return res.status("200").render("get_test.ejs", {values: result});//ejs確認
      }
    );
  });
});

//取引をキャンセルするPUTのAPI
router.route(USER_END_POINT).put((req, res) => {
  //データ取得
  const body = req.body;
  const userId = body.user_id;
  const projectId = body.project_id;

  //現在の日時取得
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  const cancelDate = year + "-" + month + "-" + day;

  //一つ前の月を取得
  const lastMounth = new Date(
    date.getFullYear(),
    date.getMonth() - 1,
    date.getDate()
  );
  const requestMounth =
    lastMounth.getFullYear() + "-" + (lastMounth.getMonth() + 1) + "%";

  //sql文生成
  //取引キャンセルフラグをたてる
  const updateProjectCancel =
    "UPDATE projects SET cancel_flg = 1 WHERE project_id = ?;";
  //キャンセル日時を設定
  const updateUserCalcel =
    "UPDATE users SET cancel_date = ? WHERE user_id = ?;";
  //project_idからcar_id取得
  const selectCarid =
    "SELECT e.car_id FROM projects p LEFT JOIN exhibits e ON p.exhibit_id = e.exhibit_id WHERE p.project_id = ?;";

  //carsのregister_flgを0にする(オークション登録解除)
  const updateRegisterCancel =
    "UPDATE cars SET register_flg = 0 WHERE car_id = ?;";
  //ユーザー情報取得
  const selectUser = "SELECT name,phone_number FROM users WHERE user_id = ?;";
  //取引車両情報取得
  const selectTransaction =
    "SELECT p.project_id,c.car_id,c.type_name,p.price,p.due_date,p.deposit_apply_flg,p.payment_flg,c.picture_path FROM users u LEFT JOIN projects p ON u.user_id = p.buyer_id LEFT JOIN exhibits e ON p.exhibit_id = e.exhibit_id LEFT JOIN cars c ON e.car_id = c.car_id WHERE p.cancel_flg = 0 AND p.deposit_apply_flg = 0 AND p.buyer_id = ?;";
  //先月１ヶ月間の購入台数と総額
  const lastProjects =
    "SELECT COUNT(*) AS NumOfunits,SUM(total_price) AS total_price FROM projects WHERE purchase_date LIKE ? AND cancel_flg = 0;";

  //DB処理
  db.mysql_connection.connect((err) => {
    const placeHolder = [projectId, cancelDate, userId, projectId];
    db.mysql_connection.query(
      updateProjectCancel + updateUserCalcel + selectCarid,
      placeHolder,
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        //取得したcar_idを代入
        const carID = result[2][0].car_id;
        //return res.status(200).json(result[2][0].car_id);//値確認
        db.mysql_connection.connect((err) => {
          const placeHolder = [carID, userId, userId, requestMounth];
          db.mysql_connection.query(
            updateRegisterCancel +
              selectUser +
              selectTransaction +
              lastProjects,
            placeHolder,
            (err, result) => {
              if (err) {
                return res.status(500).json({ code: 500, message: err });
              }
              //いらないデータ削除しuser_GET時と同じ形式に整形
              result.shift(); //updateRegisterCancel分を削除

              return res
                .status("200")
                .render("user_mypage.ejs", { values: result });
              //テスト用
              //return res.status(200).json(result);//値確認
              //return res.status("200").render("get_test.ejs", {values: result});//ejs確認
            }
          );
        });
      }
    );
  });
});

module.exports = router;
