/*/user*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const USER_END_POINT = "/user";


//マイページを表示するGETのAPI
//ユーザー情報と取引車両情報を渡す
router.route(USER_END_POINT).get((req, res) => {
    //データ取得
    const body = req.body;
    const userId = body.user_id;

    //sql文生成
    //ユーザー情報取得
    const selectUser = "SELECT name,phone_number FROM users WHERE user_id = ?;";
    //取引車両情報取得
    const selectTransaction = "SELECT c.car_id,c.type_name,p.price,p.due_date,p.cancel_flg,p.deposit_apply_flg,p.payment_flg,c.picture_path FROM users u LEFT JOIN projects p ON u.user_id = p.buyer_id LEFT JOIN exhibits e ON p.exhibit_id = e.exhibit_id LEFT JOIN cars c ON e.car_id = c.car_id WHERE p.buyer_id = ?;";

    //DB処理
    db.mysql_connection.connect((err) => {
        const placeHolder = [userId, userId];
        db.mysql_connection.query(
        selectUser+selectTransaction,
        placeHolder,
        (err, result) => {
            if (err) {
                return res.status(500).json({ code: 500, message: err });
            }
            return res.status("200").render("user_mypage.ejs", {values: result});

            //テスト用
            //return res.status(200).json(result);//値確認
            //return res.status("200").render("get_test.ejs", {values: result});//ejs確認
        }
        );
    });
});


module.exports = router;
