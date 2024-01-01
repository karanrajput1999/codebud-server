class AnswerController {
  async answerPost(req, res) {
    try {
      const { bodyText } = req.body;

      res.send(bodyText);
    } catch (error) {
      console.log("error in answerPost controller", error);
    }
  }
}

module.exports = new AnswerController();
