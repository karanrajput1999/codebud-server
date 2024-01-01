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
        });

        res.status(201).send(answer);
      } else {
        res.status(404).send("User not found!");
      }
    } catch (error) {
      console.log("error in answerPost controller", error);
    }
  }
}

module.exports = new AnswerController();
