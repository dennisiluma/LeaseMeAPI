const express = require("express");
const router = express.Router();
const { Users, Products } = require("../models");
const bcrypt = require("bcrypt");
// const { sign } = require('jsonwebtoken');
// const { validateToken } = require('../middlewares/AuthMiddleware');

router.post("/", async (req, res) =>{
    const {itemtitle, itemdescription, itemstate, itemcity } = req.body
    
    Products.create({
        itemtitle: itemtitle,
        leaseduration: leaseduration,
        itemdescription: itemdescription,
        itemstate: itemstate,
        itemcity: itemcity,
    });
    res.json({
        itemtitle: itemtitle,
        leaseduration: leaseduration,
        itemdescription: itemdescription,
        itemstate: itemstate,
        itemcity: itemcity,
    });
});
module.exports = router