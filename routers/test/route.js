const express = require("express");
const db = require("../../db");
const router = express.Router();
const TEST_END_POINT = "/test";

router.route(`${TEST_END_POINT}`).get((req, res) => {
  const employeeId = req.params.employee_id;
  const path = __dirname;
  console.log("path!!!", path);
  db.mysql_connection.connect((err) => {
    const placeholder = [employeeId];
    db.mysql_connection.query(
      "select * from employees where employee_id = ?",
      placeholder,
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: err });
        }
        return res.status("200").render("test.ejs", {
          values: { values: "valuesテスト" },
        });
      }
    );
  });
});

module.exports = router;
