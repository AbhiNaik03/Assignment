const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user_id: Object,
    sub_total: Number,
    phone_number: Number
});

const orders = mongoose.model("orders", orderSchema)

module.exports = orders;