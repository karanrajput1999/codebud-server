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
      res.status(201).send(newQuestion);
    } catch (error) {
      console.log("Error in question controller post request", error);
    }
  }
  async questionAcceptAnswerPost(req, res) {
    try {
      const { answerId } = req.body;
      const { id } = req.params;
      const cookies = req.cookies["auth_token"];

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      const alreadyAccepted = await prisma.question.findFirst({
        where: { id, acceptedAnswer: answerId },
      });

      console.log("already accepted ? => ", verifyToken);

      if (verifyToken) {
        if (alreadyAccepted) {
          await prisma.question.update({
            where: { id },
            data: { acceptedAnswer: "" },
          });
          res.status(201).send("answer unaccepted!");
        } else {
          await prisma.question.update({
            where: { id },
            data: { acceptedAnswer: answerId },
          });
          res.status(201).send("answer accepted!");
        }
      } else {
        res.status(404).send("user not found!");
      }
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
          user: true,
          answers: {
            include: {
              user: {
                select: {
                  id: true,
                  username: true,
                },
              },
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

  async questionDelete(req, res) {
    try {
      const { id } = req.params;

      const cookies = req.cookies["auth_token"];

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      const question = await prisma.question.findFirst({ where: { id } });

      if (verifyToken) {
        if (verifyToken === question.userId) {
          await prisma.question.delete({ where: { id } });
          res.status(200).send("Question deleted");
        } else {
          res
            .status(401)
            .send("You do not have permission to delete this question");
        }
      } else {
        res.status(404).send("user not found!");
      }
    } catch (error) {
      console.log("Error in question controller delete request", error);
    }
  }
}

module.exports = new QuestionController();
