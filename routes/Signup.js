const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require('jsonwebtoken');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post("/", async (req, res) => {
    const { username, email, phonenumber, state, password } = req.body;

    const phonenumberInDatabase = await Users.findOne({ where: { phonenumber: phonenumber } });
    const emailInDatabase = await Users.findOne({ where: { email: email } });
    const usernameInDatabase = await Users.findOne({ where: { username: username } });

    if (phonenumberInDatabase) {
        res.json({ error: `User With ${phonenumber} already  Exist` });
        
    } else if (emailInDatabase) {
        res.json({ error: `User With ${email} already  Exist` });
   
    } else if (usernameInDatabase) {
        res.json({ error: `User With ${username} already  Exist` });
 
    } else {
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash,
                email: email,
                phonenumber: phonenumber,
                state: state,
            });
            res.json("Succesfully Created a User");
        });
    }
});

module.exports = router;