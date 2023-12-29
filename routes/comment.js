const express = require("express");
const commentRouter = express.Router({ mergeParams: true });
const CommentValidator = require("../middlewares/comment");
const CommentController = require("../controllers/comment");

commentRouter.post(
  "/",
  CommentValidator.commentPost,
  CommentController.commentPost
);

module.exports = commentRouter;
