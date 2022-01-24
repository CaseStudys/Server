/*/test*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const TEST_END_POINT = "/test";

router.route(`${TEST_END_POINT}`).get((req, res) => {
  const now = new Date();
  const fullYear = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const fullMonth = month < 10 ? `0${month}` : month;
  const fullDay = day < 10 ? `0${day}` : day;
  console.log("now", now);
  console.log("y", fullYear, "m", month, "d", day);
  const fullDate = `${fullYear}-${fullMonth}-${fullDay}`;
  console.log("fullDate", fullDate);
  db.mysql_connection.connect((err) => {
    db.mysql_connection.query(
      "SELECT exhibits.exhibit_id,COALESCE(a.user_id,0) as user_id,COALESCE(b.price,0) as price,exhibits.start_date from bids a INNER JOIN (SELECT exhibit_id,MAX(price) AS price FROM bids GROUP BY exhibit_id) b ON a.price = b.price RIGHT JOIN exhibits ON b.exhibit_id = exhibits.exhibit_id WHERE DATE_FORMAT(exhibits.start_date, '%Y-%m-%d') = DATE_FORMAT(?, '%Y-%m-%d');",
      [fullDate],
      (err, result) => {
        console.log(result);
        if (err) {
          throw err;
          return res.status(500).json({ message: err });
        }
        return res.status("200").render("test.ejs");
      }
    );
  });
});

router.route(`/user_payment`).get((req, res) => {
  return res.status("200").render("user_payment.ejs");
});

module.exports = router;
