const prisma = require("../prisma/prismaClient");

class EditQuestionController {
  async editQuestionPatch(req, res) {
    try {
      const { id } = req.params;
      const { title, bodyText, tags } = req.body;

      const updatedQuestion = await prisma.question.update({
        where: { id },
        data: { title, bodyText, tags },
      });

      res.send(updatedQuestion);
    } catch (error) {
      console.log("error while editing question in editQuestionPatch", error);
    }
  }
}

module.exports = new EditQuestionController();
