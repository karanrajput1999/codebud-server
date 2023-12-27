const prisma = require("../prisma/prismaClient");
const jwt = require("jsonwebtoken");

class UpvoteDownvoteController {
  async upvotePatch(req, res) {
    try {
      const { id } = req.params;

      const cookies = req.cookies["auth_token"];

      const userId = cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      const question = await prisma.question.findFirst({ where: { id } });

      if (userId) {
        const alreadyUpvoted = question.upvote.includes(userId);
        const alreadyDownvoted = question.downvote.includes(userId);

        if (alreadyUpvoted) {
          const otherUpvotes = question.upvote.filter(
            (item) => item !== userId
          );

          await prisma.question.update({
            where: { id },
            data: { upvote: otherUpvotes },
          });

          res.status(200).send("upvote taken back");
        } else if (alreadyDownvoted) {
          const otherDownvotes = question.downvote.filter(
            (item) => item !== userId
          );
          await prisma.question.update({
            where: { id },
            data: { downvote: otherDownvotes },
          });

          await prisma.question.update({
            where: { id },
            data: { upvote: { push: userId } },
          });
          res.status(200).send("question upvoted");
        } else {
          await prisma.question.update({
            where: { id },
            data: { upvote: { push: userId } },
          });
          res.status(200).send("question upvoted");
        }
      } else {
        res.status(404).send("no user found");
      }
    } catch (error) {
      console.log(
        "Error in upvoteDownvote controller patch request while upvoting",
        error
      );
    }
  }
  async downvotePatch(req, res) {
    try {
      const { id } = req.params;

      const cookies = req.cookies["auth_token"];

      const userId = cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      const question = await prisma.question.findFirst({ where: { id } });

      if (userId) {
        const alreadyUpvoted = question.upvote.includes(userId);
        const alreadyDownvoted = question.downvote.includes(userId);

        if (alreadyUpvoted) {
          const otherUpvotes = question.upvote.filter(
            (item) => item !== userId
          );

          await prisma.question.update({
            where: { id },
            data: { upvote: otherUpvotes },
          });

          await prisma.question.update({
            where: { id },
            data: { downvote: { push: userId } },
          });
          res.status(200).send("question downvoted");
        } else if (alreadyDownvoted) {
          const otherDownvotes = question.downvote.filter(
            (item) => item !== userId
          );
          await prisma.question.update({
            where: { id },
            data: { downvote: otherDownvotes },
          });
          res.status(200).send("downvote taken back");
        } else {
          await prisma.question.update({
            where: { id },
            data: { downvote: { push: userId } },
          });
          res.status(200).send("question downvoted");
        }
      } else {
        res.status(404).send("no user found");
      }
    } catch (error) {
      console.log(
        "Error in upvoteDownvote controller patch request while upvoting",
        error
      );
    }
  }
}

module.exports = new UpvoteDownvoteController();
