const prisma = require("../prisma/prismaClient");
const jwt = require("jsonwebtoken");

class AnswerController {
  async answerPost(req, res) {
    try {
      const { bodyText } = req.body;

      // question id
      const { id } = req.params;

      const cookies = req.cookies["auth_token"];
      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      if (verifyToken) {
        const answer = await prisma.answer.create({
          data: {
            bodyText,
            questionId: id,
            userId: verifyToken,
          },
          include: {
            user: true,
          },
        });

        res.status(201).send(answer);
      } else {
        res.status(404).send("User not found!");
      }
    } catch (error) {
      console.log("error in answerPost controller", error);
    }
  }
  async answerDelete(req, res) {
    try {
      // question id
      const { answerId } = req.params;

      const cookies = req.cookies["auth_token"];

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      if (verifyToken) {
        const quesitonToBeDeleted = await prisma.answer.delete({
          where: {
            id: answerId,
          },
        });

        res.status(201).send(quesitonToBeDeleted);
      } else {
        res.status(404).send("User not found!");
      }
    } catch (error) {
      console.log("error in answerDelete controller", error);
    }
  }
}

module.exports = new AnswerController();
