const express = require("express");
const editQuestionRouter = express.Router({ mergeParams: true });

const QuestionValidator = require("../middlewares/question");
const EditQuestionController = require("../controllers/editQuestion");

// using QuestionValidtor because we need the same validation for edited question as well
editQuestionRouter.patch(
  "/",
  QuestionValidator.questionPost,
  EditQuestionController.editQuestionPatch
);

module.exports = editQuestionRouter;
