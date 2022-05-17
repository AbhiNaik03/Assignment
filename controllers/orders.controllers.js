const orders = require("../models/orders.models");
const users = require("../models/users.models");

const addOrder = async (req, res) => {
    let total = Number.parseInt(req.body.total);
    let number = Number.parseInt(req.body.number);

    let token = req.headers["x-access-token"];

    let userData = await users.find({token: token});

    await orders.create({
        user_id: userData[0]._id,
        sub_total: total,
        phone_number: number
    }).then((order) => {
        res.status(200).send({"order":order, "status":"Order added Successfuly"});
    })
}

const getOrder = async (req, res) => {
    let token = req.headers["x-access-token"];

    let userData = await users.find({token: token});

    let orderData = await orders.find({user_id: userData[0]._id})

    if (orderData.length == 0) {
        res.status(200).send({"status": "No order found!"})
    }
    else {
        res.status(200).send({"status": "Order found!", "order" : orderData});
    }

}


module.exports = {addOrder, getOrder};