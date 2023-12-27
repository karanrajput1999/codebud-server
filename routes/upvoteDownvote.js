const express = require("express");
const upvoteDownvoteRouter = express.Router({ mergeParams: true });
const UpvoteDownvoteController = require("../controllers/upvoteDownvote");

upvoteDownvoteRouter.patch("/upvote", UpvoteDownvoteController.upvotePatch);
upvoteDownvoteRouter.patch("/downvote", UpvoteDownvoteController.downvotePatch);

module.exports = upvoteDownvoteRouter;
