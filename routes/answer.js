const express = require("express");
const answerRouter = express.Router({ mergeParams: true });
const AnswerValidator = require("../middlewares/answer");
const AnswerController = require("../controllers/answer");

answerRouter.post("/", AnswerValidator.answerPost, AnswerController.answerPost);
answerRouter.delete("/:answerId", AnswerController.answerDelete);

module.exports = answerRouter;
