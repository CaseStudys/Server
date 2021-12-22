/*/login*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const LOGIN_END_POINT = "/login";


//ログイン画面を表示するGETのAPI
router.route(LOGIN_END_POINT).get((req, res) => {
    res.status("200").render("login.ejs");
});


module.exports = router;
