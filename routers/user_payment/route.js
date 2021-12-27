/*/management/detail*/
const express = require("express");
const router = express.Router();
const USER_PAYMENT_END_POINT = "/user_payment";

//購入確定画面を表示するGETのAPI
router.route(USER_PAYMENT_END_POINT).get((req, res) => {
  return res.status("200").render("user_payment.ejs");
});

module.exports = router;
