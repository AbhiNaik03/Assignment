const users = require("../models/users.models");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const signUP = async (req, res) => {
    let name = req.body.name;
    let number = req.body.number;
    let password = req.body.password;

    let usersData = await users.find({phone_number: number});

    if (usersData.length > 0) {
        res.status(200).send({"status":"Try any other number, this number is already registered!"});
    }
    else {

        await users.create({
            name: name,
            phone_number: Number.parseInt(number),
            password: bcrypt.hashSync(password, 10),
            token: ""
        }).then((user) => {
            res.status(200).send({"user":user, "status":"Registration Successfull!"});
        })
    }
}

const login = async (req, res) => {
    let number = Number.parseInt(req.query.number);
    let password = req.query.password;

    let usersData = await users.find({phone_number: number});

    if (usersData.length == 0) {
        res.status(200).send({
            "status": "This number has not been registered!",
            "isAuthenticated": false,
    });
    }
    else {
        let hashPassword = usersData[0].password;

        if (!bcrypt.compareSync(password, hashPassword)) {
            res.status(200).send({
                "status": "Invalid Credentials!",
                "isAuthenticated": false,
        });
        }
        else {
            const token = jwt.sign({ _id: usersData[0]._id }, 'myprivatekey');
            await users.findOneAndUpdate({phone_number: number}, {token: token})
            .then((user) => {
                res.status(200).header("x-access-token", token).send({
                    "name": user.name,
                    "isAuthenticated": true,
                    "token": token
                });
            })
            .catch((err) => {
                res.status(200).send({
                    "status": "Invalid Credentials!",
                    "isAuthenticated": false,
            });
            })
        }
    }
}

const logout = async (req, res) => {
    let token = req.headers["x-access-token"];

    let userData = await users.find({token: token});

    if (userData.length == 0) {
        res.status(401).send({"status": "Please Login first to access this endpoint!"});
        return;
    }

    users.findOneAndUpdate({token: token}, {token: ""})
    .then(() => {
        res.status(200).send({"status": "Logout Successfull", "isAuthenticated": false,});
    }).catch((err) => {
        res.status(200).send({"status": "Logout Unsuccessfull"});
    });
}

module.exports = {signUP, login, logout};