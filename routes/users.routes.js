const express = require("express");
const {signUP, login, logout} = require("../controllers/users.controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/add-user", signUP);

router.post("/login-user", login);

router.post("/logout-user", auth, logout);

module.exports = router;