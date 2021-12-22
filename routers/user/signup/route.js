const express = require("express");
const db = require("../../../db");
const router = express.Router();
const USERSIGNUP_END_POINT = "/user/signup";


//サインアップ画面を表示するGETのAPI
router.route(USERSIGNUP_END_POINT).get((req, res) => {
    res.status("200").render("signup.ejs");
});


module.exports = router;
