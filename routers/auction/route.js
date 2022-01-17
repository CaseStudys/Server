/*/auction*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const AUCTION_END_POINT = "/auction";


//既にログイン時にオークションページを表示するGETのAPI
router.route(AUCTION_END_POINT).get((req, res) => {
    //sql文生成　出品中の車両取得
    const nowExhibit = "SELECT c.car_id,c.picture_path,c.type_name,c.purchace_price FROM cars c LEFT JOIN exhibits e ON c.car_id = e.car_id LEFT JOIN projects p ON e.exhibit_id = p.exhibit_id WHERE e.exhibit_id IS NOT NULL AND p.project_id IS NULL;";

    //DB処理
    db.mysql_connection.connect((err) => {
        db.mysql_connection.query(
        nowExhibit,
        (err, result) => {
            if (err) {
            return res.status(500).json({ code: 500, message: err });
            }
            return res.status(200).render("user_auction.ejs", {values: result});
            //テスト用
            // return res.status(200).json(result);//値確認
            // return res.status("200").render("get_test.ejs", {values: result});//ejs確認
        }
        );
    });
});

module.exports = router;
