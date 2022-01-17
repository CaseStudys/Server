/*/bid*/
const express = require("express");
const db = require("../../db"); //db処理で使う。
const router = express.Router(); //api定義で使う。これを使えばファイル分割してapi作れる。
const BID_END_POINT = "/bid"; //APIのURL

const selectExhibit =
  "SELECT * FROM cars c LEFT JOIN exhibits e ON c.car_id = e.car_id where e.car_id = ?;";
const selectHighestBid =
  "SELECT * FROM bids WHERE exhibit_id = (SELECT exhibit_id FROM exhibits WHERE car_id = ? LIMIT 1) ORDER BY price DESC LIMIT 1;";

router.route(`${BID_END_POINT}/:car_id`).get(async (req, res) => {
  const carId = req.params.car_id;
  //DB処理
  db.mysql_connection.connect(async (err) => {
    const placeholder = [carId, carId];
    //出品物の入札データを取得
    //car_idに該当する車両データと出品データを取得
    db.mysql_connection.query(
      selectExhibit + selectHighestBid,
      placeholder,
      (err, result) => {
        const exhibitValues = result[0];
        let bidDataList = result[1];
        //出品データを取得できなかった場合、user_auction.ejsにリダイレクト
        if (exhibitValues.length === 0) return res.redirect("/auction");
        const values = {
          ...exhibitValues[0],
          user_id: "",
          price: 0,
        };
        //取得した出品物のオークション開始日が、現在日時 <= オークション開始日 <=オークション開始日　+五分 でない場合、user_auction.ejsにリダイレクト
        const startDate = new Date(values.start_date); //開始日を取得
        const endDate = new Date(
          startDate.setMinutes(startDate.getMinutes() + 5)
        ); //終了日を取得
        const nowDate = new Date(); //現在の日付を取得
        //現在時間 > オークション終了時間 ||現在時間 < オークション開始五分前
        if (
          endDate - nowDate <
          0 /*||new Date(endDate - nowDate).getMinutes() - 5 > 5*/
        )
          return res.redirect("/auction");

        //入札データをvaluesに連結
        if (bidDataList.length === 0) {
          //まだ入札されていない場合、入札者を表すuserIdを空文字、価格に初期価格を設定
          values.price = values.purchace_price * 1.1;
        } else {
          //入札データがある場合
          values.user_id = bidDataList[0].user_id;
          values.price = bidDataList[0].price;
        }

        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        return res.status("200").render("user_bid.ejs", { values: values });
        //テスト用
        //return res.status("200").json(result);//値確認
        // return res
        //   .status("200")
        //   .render("user_bid_test.ejs", { values: values }); //ejs確認
      }
    );
  });
});

module.exports = router;
