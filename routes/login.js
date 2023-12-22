const LoginValidator = require("../middlewares/login");
const LoginController = require("../controllers/login");
const express = require("express");
const loginRouter = express.Router();

loginRouter.post("/", LoginValidator.loginPost, LoginController.login);

module.exports = loginRouter;
