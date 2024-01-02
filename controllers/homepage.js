const prisma = require("../prisma/prismaClient");

class HomepageController {
  async homepageGet(req, res) {
    try {
      const AllQuestions = await prisma.question.findMany({
        include: {
          user: true,
          answers: true,
        },
      });

      res.status(200).send(AllQuestions);
    } catch (error) {
      console.log("Error in homepage controller", error);
    }
  }
}

module.exports = new HomepageController();
