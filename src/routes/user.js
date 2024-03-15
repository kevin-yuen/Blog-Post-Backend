const express = require("express");
const router = express.Router();
const {signupUser, loginUser} = require("../controllers/user");

router.post("/signup", signupUser);
router.post("/login", loginUser);   // "post" as we need to get username and password from req.body

module.exports = router;