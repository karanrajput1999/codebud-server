const prisma = require("../prisma/prismaClient");

class HomepageController {
  async homepageGet(req, res) {
    try {
      const AllQuestions = await prisma.question.findMany();

      res.status(200).send(AllQuestions);
    } catch (error) {
      console.log("Error in question controller", error);
    }
  }
}

module.exports = new HomepageController();
