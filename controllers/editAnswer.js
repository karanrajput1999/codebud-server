const prisma = require("../prisma/prismaClient");

class EditAnswerController {
  async editAnswerPatch(req, res) {
    try {
      const { id, answerId } = req.params;
      const { bodyText } = req.body;

      const question = await prisma.question.findFirst({
        where: { id },
        include: { answers: true },
      });

      console.log("question here", question);

      const answer = question?.answers?.find(
        (answer) => answer.id === answerId
      );

      console.log("answer here", answer);

      if (!answer) {
        return res.status(404).send("Answer not found!");
      }

      const updatedAnswer = await prisma.answer.update({
        where: { id: answerId },
        data: { bodyText },
      });

      res.send(updatedAnswer);
    } catch (error) {
      console.log("Error in EditAnswer controller editAnswerPatch", error);
    }
  }
}

module.exports = new EditAnswerController();
