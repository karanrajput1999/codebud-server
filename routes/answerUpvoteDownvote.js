const express = require("express");
const answerUpvoteDownvoteRouter = express.Router({ mergeParams: true });
const AnswerUpvoteDownvoteController = require("../controllers/answerUpvoteDownvote");

answerUpvoteDownvoteRouter.patch(
  "/upvote",
  AnswerUpvoteDownvoteController.upvotePatch
);
answerUpvoteDownvoteRouter.patch(
  "/downvote",
  AnswerUpvoteDownvoteController.downvotePatch
);

module.exports = answerUpvoteDownvoteRouter;
