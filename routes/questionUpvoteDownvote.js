const express = require("express");
const questionUpvoteDownvoteRouter = express.Router({ mergeParams: true });
const QuestionUpvoteDownvoteController = require("../controllers/questionUpvoteDownvote");

questionUpvoteDownvoteRouter.patch(
  "/upvote",
  QuestionUpvoteDownvoteController.upvotePatch
);
questionUpvoteDownvoteRouter.patch(
  "/downvote",
  QuestionUpvoteDownvoteController.downvotePatch
);

module.exports = questionUpvoteDownvoteRouter;
