const express = require("express");
const questionRouter = express.Router({ mergeParams: true });

const QuestionValidator = require("../middlewares/question");
const QuestionController = require("../controllers/question");

questionRouter.post(
  "/",
  QuestionValidator.questionPost,
  QuestionController.questionPost
);
questionRouter.post(
  "/accept-answer",
  QuestionController.questionAcceptAnswerPost
);
questionRouter.get("/", QuestionController.questionGet);
questionRouter.delete("/", QuestionController.questionDelete);

module.exports = questionRouter;
