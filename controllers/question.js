const prisma = require("../prisma/prismaClient");
const jwt = require("jsonwebtoken");

class QuestionController {
  async questionPost(req, res) {
    try {
      const { title, bodyText, tags } = req.body;

      const cookies = req.cookies["auth_token"];

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      const newQuestion = await prisma.question.create({
        data: { title, bodyText, tags, userId: verifyToken },
      });

      console.log("new question created", newQuestion);
      res.status(200).send(newQuestion);
    } catch (error) {
      console.log("Error in question controller", error);
    }
  }
}

module.exports = new QuestionController();
