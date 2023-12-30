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
      console.log("Error in question controller post request", error);
    }
  }
  async questionGet(req, res) {
    try {
      const { id } = req.params;
      const question = await prisma.question.findFirst({
        where: { id },
        include: {
          comments: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
            },
          },
        },
      });

      if (question) {
        // increase question view count
        await prisma.question.update({
          where: { id },
          data: { views: { increment: 1 } },
        });

        res.status(200).send(question);
      } else {
        res.send("no questions found");
      }
    } catch (error) {
      console.log("Error in question controller get request", error);
    }
  }
}

module.exports = new QuestionController();
