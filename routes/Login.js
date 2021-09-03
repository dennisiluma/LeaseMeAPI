const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');


router.post("/", async (req, res) => {
    const { phonenumberOrEmail, password } = req.body;

    const userWithThisPhonenumberInDatabase = await Users.findOne({ where: { phonenumber: phonenumberOrEmail } }); //this is a user in the database with this phonenumber
    const userWithThisemailInDatabase = await Users.findOne({ where: { email: phonenumberOrEmail } }); //this is a user with this email in the database

    if (userWithThisPhonenumberInDatabase || userWithThisemailInDatabase) {
        if (userWithThisPhonenumberInDatabase) {
            bcrypt.compare(password, userWithThisPhonenumberInDatabase.password).then((match) => {
                if (!match) res.json({ error: "The Password used with this phone number doesn't match" });
                /**Generate Token */
                const accessToken = sign({ username: userWithThisPhonenumberInDatabase.username, id: userWithThisPhonenumberInDatabase.id }, "importantSecreet"); //generate token using user's username and id
                res.json({ token: accessToken, username: userWithThisPhonenumberInDatabase.username, id: userWithThisPhonenumberInDatabase.id });

            });

        } else if (userWithThisemailInDatabase) {
            bcrypt.compare(password, userWithThisemailInDatabase.password).then((match) => {
                if (!match) {
                    res.json({ error: "The password used for this email doesn't match" });

                } else {

                    res.json("You are logged in via Email");

                }
                /**Generate Token */
                const accessToken = sign({ username: userWithThisemailInDatabase.username, id: userWithThisemailInDatabase.id }, "importantSecreet"); //generate token using user's username and id
                res.json({ token: accessToken, username: userWithThisemailInDatabase.username, id: userWithThisemailInDatabase.id });

            });

        } else {
            res.json({ error: `${email} is not registered` });
        }

    } else {
        res.json({ error: "You don't have an account with us. Click on the register below to Register" });
    }

});

module.exports = router;