/*/car*/
const express = require("express");
const fs = require("fs");
const path = require("path");
const fex = require("fs-extra");
const multer = require("multer");
const db = require("../../db");
const router = express.Router();
const CAR_END_POINT = "/car";
const auth = require("../../authentication");

//画像の一時保存先指定
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//車両登録するPOSTのAPI
router
  .route(CAR_END_POINT)
  .post(multer({ storage: storage }).array("files", 10), async (req, res) => {
    //sql文生成
    //＊＊＊＊カラムをプレースホルダーで入れるとSQL文にシングルクォーテーションが付いてしまう為、暫定的に手打ち＊＊＊＊＊＊＊＊
    var sqlSentence =
      "INSERT INTO cars(employee_id,register_flg,age,type_name,maker,displacement,model_age,grade,model,repair,capacity,door_number,shape,loading_capacity,milage,transmission,drive_system,inspection_deadline,manual,evaluation,handle,exterior_color,exterior_color_number,interior_color,purchace_price,supplier,comment) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);";

    //db登録に必要なデータをbodyから取得。
    const body = req.body;

    //一つの配列にキーを格納してから値を格納する処理(シングルクォーテーション問題が解決したときに使用)
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

    //DB処理
    db.mysql_connection.connect((err) => {
      //車両登録
      db.mysql_connection.query(sqlSentence, valueList, (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        //登録したcar_IDでpicture_pathを登録
        const newId = result.insertId;
        const updatePath =
          "UPDATE cars SET picture_path = 'pictures/?' WHERE car_id = ?;";
        db.mysql_connection.connect((err) => {
          db.mysql_connection.query(
            updatePath,
            [newId, newId],
            (err, result) => {
              if (err) {
                return res.status(500).json({ code: 500, message: err });
              }

              //画像を一時保存フォルダから移動
              fex.copySync("tmp", "pictures/" + newId);
              tmp内の画像全削除
              fs.readdir("tmp", (err, files) => {
                if (err) throw err;
                for (const file of files) {
                  fs.unlink(path.join("tmp", file), (err) => {
                    if (err) throw err;
                  });
                }
              });

              return res.status(200).json({ result: true });
              //return res.status(200).json(result);
            }
          );
        });
      });
    });
  });

//オークション登録フラグをたてるPUTのAPI
router.route(CAR_END_POINT).put(async (req, res) => {
  //値取得
  const body = req.body;
  const carId = body.car_id;

  //DB処理
  //UPDATEしてからSELECT
  db.mysql_connection.connect((err) => {
    db.mysql_connection.query(
      "UPDATE cars SET register_flg = 1 WHERE car_id = ?;SELECT car_id,picture_path,type_name,purchace_price,register_flg FROM cars;",
      [carId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        //フロントのPUT処理でmanagementのGET叩いてるからリザルトいらんけどなかったらうまく動かんから使わんけど返してる
        return res.status(200).json(result[1]);
      }
    );
  });
});

//車両登録画面を表示するGETのAPI
router.route(CAR_END_POINT).get(async (req, res) => {
  return !(await auth(req))
    ? res.status("200").redirect("/login")
    : res.status("200").render("emp_car_register.ejs");
});


//車両登録画面を表示するGETのAPI
router.route(CAR_END_POINT).delete(multer({ storage: storage }).array("files", 10), async (req, res) => {
  console.log(req.files);
});

module.exports = router;
