const express = require("express");
const questionRouter = express.Router();

const QuestionValidator = require("../middlewares/question");
const QuestionController = require("../controllers/question");

questionRouter.post(
  "/",
  QuestionValidator.questionPost,
  QuestionController.questionPost
);

module.exports = questionRouter;
