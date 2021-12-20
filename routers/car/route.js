/*/car*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const CAR_END_POINT = "/car";


//車両登録するPOSTのAPI
router.route(CAR_END_POINT).post(async (req, res) => {

    //テンプレートsql
    //＊＊＊＊カラムをプレースホルダーで入れるとSQL文にシングルクォーテーションが付いてしまう為、暫定的に手打ち＊＊＊＊＊＊＊＊
    var sqlSentence = "INSERT INTO cars(employee_id,register_flg,age,type_name,maker,displacement,model_age,grade,model,repair,capacity,door_number,shape,loading_capacity,milage,transmission,drive_system,inspection_deadline,manual,evaluation,handle,exterior_color,exterior_color_number,interior_color,purchace_price,supplier,comment,picture_pass) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

    //db登録に必要なデータをbodyから取得。
    const body = req.body;

    //一つの配列にキーを格納してから値を格納する処理ーーー
    //キーを配列に代入
    //const dataList = Object.keys(body);
    //値を配列に代入
    // for (let index = 0; index < 28; index++) {
    //     dataList.push(body[dataList[index]]);
    // }


    //値を配列に格納
    var valueList = [];
    valueList.push(body.employee_id);
    valueList.push(body.register_flg);
    valueList.push(body.age);
    valueList.push(body.type_name);
    valueList.push(body.maker);
    valueList.push(body.displacement);
    valueList.push(body.model_age);
    valueList.push(body.grade);
    valueList.push(body.model);
    valueList.push(body.repair);
    valueList.push(body.capacity);
    valueList.push(body.door_number);
    valueList.push(body.shape);
    valueList.push(body.loading_capacity);
    valueList.push(body.milage);
    valueList.push(body.transmission);
    valueList.push(body.drive_system);
    valueList.push(body.inspection_deadline);
    valueList.push(body.manual);
    valueList.push(body.evaluation);
    valueList.push(body.handle);
    valueList.push(body.exterior_color);
    valueList.push(body.exterior_color_number);
    valueList.push(body.interior_color);
    valueList.push(body.purchace_price);
    valueList.push(body.supplier);
    valueList.push(body.comment);
    valueList.push(body.picture_pass);


    //DB処理
    db.mysql_connection.connect((err) => {
      db.mysql_connection.query(
        sqlSentence,
        valueList,
        (err, result) => {
          if (err) {
            return res.status(500).json({ code: 500, message: err });
          }
          return res.status(200).json({ result: true });
        }
      );
    });

  });



module.exports = router;
