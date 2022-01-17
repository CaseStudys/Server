/*/user*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const USER_END_POINT = "/user";


//マイページを表示するGETのAPI
//ユーザー情報と取引車両情報を渡す
router.route(USER_END_POINT).get((req, res) => {
    //データ取得
    // const body = req.body;
    // const userId = body.user_id;

    const userId = 1;

    //sql文生成
    //ユーザー情報取得
    const selectUser = "SELECT name,phone_number FROM users WHERE user_id = ?;";
    //取引車両情報取得
    const selectTransaction = "SELECT c.car_id,c.type_name,p.price,p.due_date,p.deposit_apply_flg,p.payment_flg,c.picture_path FROM users u LEFT JOIN projects p ON u.user_id = p.buyer_id LEFT JOIN exhibits e ON p.exhibit_id = e.exhibit_id LEFT JOIN cars c ON e.car_id = c.car_id WHERE p.buyer_id = ? AND p.cancel_flg = 0;";

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
            // return res.status(200).json(result);//値確認
            // return res.status("200").render("get_test.ejs", {values: result});//ejs確認
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

    //日時取得
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    const cancelDate = year+"-"+month+"-"+day;

    //sql文生成
    //取引キャンセルフラグをたてる
    const updateProjectCancel = "UPDATE projects SET cancel_flg = 1 WHERE project_id = ?;";
    //キャンセル日時を設定
    const updateUserCalcel = "UPDATE users SET cancel_date = ? WHERE user_id = ?;";
    // console.log(updateUserCalcel);
    // return res.status(200).json({"ok":1});
    //ユーザー情報取得
    const selectUser = "SELECT name,phone_number FROM users WHERE user_id = ?;";
    //取引車両情報取得
    const selectTransaction = "SELECT c.car_id,c.type_name,p.price,p.due_date,p.deposit_apply_flg,p.payment_flg,c.picture_path FROM users u LEFT JOIN projects p ON u.user_id = p.buyer_id LEFT JOIN exhibits e ON p.exhibit_id = e.exhibit_id LEFT JOIN cars c ON e.car_id = c.car_id WHERE p.buyer_id = ? AND p.cancel_flg = 0;";

    //DB処理
    db.mysql_connection.connect((err) => {
        const placeHolder = [projectId, cancelDate, userId, userId, userId];
        db.mysql_connection.query(
        updateProjectCancel+updateUserCalcel+selectUser+selectTransaction,
        placeHolder,
        (err, result) => {
            if (err) {
                return res.status(500).json({ code: 500, message: err });
            }
            //いらないデータ削除しuser_GET時と同じ形式に整形
            result.shift();//updateProjectCancel分を削除
            result.shift();//updateUserCalcel分を削除

            return res.status("200").render("user_mypage.ejs", {values: result});

            //テスト用
            //return res.status(200).json(result);//値確認
            //return res.status("200").render("get_test.ejs", {values: result});//ejs確認
        }
        );
    });
});


module.exports = router;
