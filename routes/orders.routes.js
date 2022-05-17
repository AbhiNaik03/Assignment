const express = require("express");
const {addOrder, getOrder} = require("../controllers/orders.controllers");
const auth = require("../middleware/auth");

const router = express.Router();

router.post("/add-order", auth, addOrder);

router.get("/get-order", auth, getOrder);

module.exports = router;