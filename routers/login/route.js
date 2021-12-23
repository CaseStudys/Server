/*/login*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const LOGIN_END_POINT = "/login";


//ログイン画面を表示するGETのAPI
router.route(LOGIN_END_POINT).get((req, res) => {
    res.status("200").render("login.ejs");
});


//ログイン処理を行うPUTのAPI
router.route(LOGIN_END_POINT).put((req, res) => {
    //データ取得
    const body = req.body;
    const Name = body.name;
    const Password = body.password;

    //sql文生成
    //ログイン
    const selectUser = "SELECT * FROM users WHERE name = ? AND password = ?;";
    //出品中の車両取得
    const nowExhibit = "SELECT c.car_id,c.picture_path,c.type_name,c.purchace_price FROM cars c LEFT JOIN exhibits e ON c.car_id = e.car_id LEFT JOIN projects p ON e.exhibit_id = p.exhibit_id WHERE e.exhibit_id IS NOT NULL AND p.project_id IS NULL;";

    //DB処理
    db.mysql_connection.connect((err) => {
        const placeHolder = [Name, Password];
        db.mysql_connection.query(
        selectUser+nowExhibit,
        placeHolder,
        (err, result) => {
            if (err) {
                return res.status(500).json({ code: 500, message: err });
            }
            //ログイン失敗時-----
            //loginページに値保持させてリダイレクトって感じでいいかな？暫定対応:)
            if (result[0].length == 0) {
                const returnVals = {"name":Name, "password":Password, "message":"ログイン失敗"};
                return res.status("200").render("login.ejs", {values: returnVals});
                //テスト用
                //return res.status(200).json(returnVals);//値確認
                //return res.status("200").render("get_test.ejs", {values: returnVals});//ejs確認
            }

            //ログイン成功時-----
            //cookie有効時間(ミリ秒)
            const limitTime = 10800000;//3時間
            //cookie設定
            res.cookie('user_id', result[0][0].user_id, {maxAge:limitTime, httpOnly:false});
            res.cookie('name', result[0][0].name, {maxAge:limitTime, httpOnly:false});
            res.cookie('password', result[0][0].password, {maxAge:limitTime, httpOnly:false});

            //render
            return res.status("200").render("user_auction.ejs", {values: result[1]});

            //テスト用
            //return res.status(200).json(result);//値確認
            //return res.status("200").render("get_test.ejs", {values: result[1]});//ejs確認
        }
        );
    });
});


module.exports = router;