const express = require("express");
const signupRouter = express.Router();
const SignupValidator = require("../middlewares/signup");
const SignupController = require("../controllers/signup");

signupRouter.post("/", SignupValidator.signupPost, SignupController.signup);

module.exports = signupRouter;
