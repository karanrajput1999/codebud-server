const express = require("express");
const questionRouter = express.Router({ mergeParams: true });

const QuestionValidator = require("../middlewares/question");
const QuestionController = require("../controllers/question");

questionRouter.post(
  "/",
  QuestionValidator.questionPost,
  QuestionController.questionPost
);
questionRouter.get("/", QuestionController.questionGet);
questionRouter.delete("/", QuestionController.questionDelete);

module.exports = questionRouter;
