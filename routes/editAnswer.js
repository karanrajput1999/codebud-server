const express = require("express");
const editAnswerRouter = express.Router({ mergeParams: true });

const AnswerValidator = require("../middlewares/answer");
const EditAnswerController = require("../controllers/editAnswer");

// using AnswerValidtor because we need the same validation for edited answer as well
editAnswerRouter.patch(
  "/",
  AnswerValidator.answerPost,
  EditAnswerController.editAnswerPatch
);

module.exports = editAnswerRouter;
