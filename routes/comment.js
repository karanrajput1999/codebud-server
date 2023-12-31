const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const CommentValidator = require("../middlewares/comment");
const CommentController = require("../controllers/comment");

commentRouter.post(
  "/",
  CommentValidator.commentPost,
  CommentController.commentPost
);
commentRouter.delete("/:commentId", CommentController.commentDelete);
commentRouter.patch("/:commentId", CommentController.commentPatch);

module.exports = commentRouter;
