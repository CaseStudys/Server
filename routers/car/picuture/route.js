/*/car*/
const express = require("express");
const router = express.Router();
const CAR_PICTURE_END_POINT = "/car/picture/:carId";
const auth = require("../../../authentication");
const db = require("../../../db");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "tmp/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

//urlのcar_idに関する画像のパスを全て返す。（一車両の全画像パスを返す）
//
router.route(CAR_PICTURE_END_POINT).get(async (req, res) => {
  console.log("ffffdfdfdfdfdfdfdfdf");
  if (!(await auth(req))) return res.redirect("/login"); //cookie認証に失敗した場合「/login」にリダイレクト

  const carId = req.params.carId;

  db.mysql_connection.connect((err) => {
    db.mysql_connection.query(
      "SELECT * FROM car_pictures WHERE car_id = ?",
      [carId],
      (err, result) => {
        if (err) {
          return res.status(500).json({ code: 500, message: err });
        }
        console.log("path!!!", result);
        return res.status(200).json({ paths: result });
        //return res.status(200).json(result);
      }
    );
  });
});

//car_picturesにcarに関連する複数の写真のパスを追加する処理。car_idはurlに連結して渡す。(car/picture/:carId)
router
  .route(CAR_PICTURE_END_POINT)
  .post(multer({ storage: storage }).array("files", 10), (req, res) => {
    const carId = req.params.carId;
    const files = req.files;
    console.log("files", files);
    const filePaths = [];
    for (let i = 0; i < files.length; i++) {
      filePaths.push(`/${carId}/${files[i].originalname}`);
    }
    db.mysql_connection.connect((err) => {
      //追加複数画像追加処理for文で取得した画像パス分insert
      for (let i = 0; i < filePaths.length; i++) {
        db.mysql_connection.query(
          "insert into car_pictures (car_id,picture_path) values (?,?)",
          [carId, filePaths[i]],
          (err, result) => {
            if (err) throw err;
          }
        );
      }
      return res.status(200).json({ result: true });
    });
  });

module.exports = router;
