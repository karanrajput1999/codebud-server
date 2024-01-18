const express = require("express");
const answerCommentRouter = express.Router();
const CommentValidator = require("../middlewares/comment");
const CommentController = require("../controllers/comment");

answerCommentRouter.post(
  "/",
  CommentValidator.commentPost,
  CommentController.answerCommentPost
);

answerCommentRouter.delete("/:commentId", CommentController.commentDelete);
answerCommentRouter.patch("/:commentId", CommentController.commentPatch);

module.exports = answerCommentRouter;
