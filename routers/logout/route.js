/*/logout*/
const express = require("express");
const db = require("../../db");
const router = express.Router();
const LOGOUT_END_POINT = "/logout";


//ログアウト処理を行なってからログインページを表示するGETのAPI
router.route(LOGOUT_END_POINT).get((req, res) => {
    res.clearCookie('user_id');
    res.clearCookie('name');
    res.clearCookie('password');
    return res.status(200).render("login.ejs");
});

module.exports = router;
