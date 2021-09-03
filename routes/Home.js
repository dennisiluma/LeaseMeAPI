const express = require("express");
const router = express.Router();
const { Users, Products } = require("../models");
const bcrypt = require("bcrypt");
// const { sign } = require('jsonwebtoken');
// const { validateToken } = require('../middlewares/AuthMiddleware');



router.get("/", async (req, res) => {
    const products = await Products.findAll();
    res.json(products);
});

/* this is used in the profile page to query data of selected user*/
router.get("/byuserId/:id", async (req, res) => {
    const id = req.params.id;
    const listOfPosts = await Posts.findAll({
        where: { UserId: id },
        include: [Likes], //we included the likes model so well have access to the likes table at our frontend
    });
    res.json(listOfPosts);
});

module.exports = router;