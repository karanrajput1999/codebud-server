const prisma = require("../prisma/prismaClient");
const jwt = require("jsonwebtoken");

class AnswerUpvoteDownvoteController {
  async upvotePatch(req, res) {
    try {
      const { answerId } = req.params;

      const cookies = req.cookies["auth_token"];

      const userId = cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      const answer = await prisma.answer.findFirst({ where: { id: answerId } });

      if (userId) {
        const alreadyUpvoted = answer.upvote.includes(userId);
        const alreadyDownvoted = answer.downvote.includes(userId);

        if (alreadyUpvoted) {
          const otherUpvotes = answer.upvote.filter((item) => item !== userId);

          await prisma.answer.update({
            where: { id: answerId },
            data: { upvote: otherUpvotes },
          });

          res.status(200).send("upvote taken back");
        } else if (alreadyDownvoted) {
          const otherDownvotes = answer.downvote.filter(
            (item) => item !== userId
          );
          await prisma.answer.update({
            where: { id: answerId },
            data: { downvote: otherDownvotes },
          });

          await prisma.answer.update({
            where: { id: answerId },
            data: { upvote: { push: userId } },
          });
          res.status(200).send("answer upvoted");
        } else {
          await prisma.answer.update({
            where: { id: answerId },
            data: { upvote: { push: userId } },
          });
          res.status(200).send("answer upvoted");
        }
      } else {
        res.status(404).send("no user found");
      }
    } catch (error) {
      console.log(
        "Error in answerUpvoteDownvote controller patch request while upvoting",
        error
      );
    }
  }
  async downvotePatch(req, res) {
    try {
      const { answerId } = req.params;

      const cookies = req.cookies["auth_token"];

      const userId = cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      const answer = await prisma.answer.findFirst({ where: { id: answerId } });

      if (userId) {
        const alreadyUpvoted = answer.upvote.includes(userId);
        const alreadyDownvoted = answer.downvote.includes(userId);

        if (alreadyUpvoted) {
          const otherUpvotes = answer.upvote.filter((item) => item !== userId);

          await prisma.answer.update({
            where: { id: answerId },
            data: { upvote: otherUpvotes },
          });

          await prisma.answer.update({
            where: { id: answerId },
            data: { downvote: { push: userId } },
          });
          res.status(200).send("answer downvoted");
        } else if (alreadyDownvoted) {
          const otherDownvotes = answer.downvote.filter(
            (item) => item !== userId
          );
          await prisma.answer.update({
            where: { id: answerId },
            data: { downvote: otherDownvotes },
          });
          res.status(200).send("downvote taken back");
        } else {
          await prisma.answer.update({
            where: { id: answerId },
            data: { downvote: { push: userId } },
          });
          res.status(200).send("answer downvoted");
        }
      } else {
        res.status(404).send("no user found");
      }
    } catch (error) {
      console.log(
        "Error in answerUpvoteDownvote controller patch request while downvoting answer",
        error
      );
    }
  }
}

module.exports = new AnswerUpvoteDownvoteController();
