const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
// const { sign } = require('jsonwebtoken');
// const { validateToken } = require('../middlewares/AuthMiddleware');