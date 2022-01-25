/*/management/detail*/
const express = require("express");
const router = express.Router();
const USER_PAYMENT_END_POINT = "/user_payment";
const auth = require("../../authentication");

//購入確定画面を表示するGETのAPI
router.route(USER_PAYMENT_END_POINT).get(async (req, res) => {
  if (!(await auth(req))) return res.redirect("/login"); //cookie認証に失敗した場合「/login」にリダイレクト

  return res.status("200").render("user_payment.ejs");
});

module.exports = router;
