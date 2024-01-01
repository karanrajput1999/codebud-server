const Joi = require("joi");

class AnswerValidator {
  async answerPost(req, res, next) {
    try {
      const { bodyText } = req.body;

      const schema = Joi.object({
        bodyText: Joi.string().min(40).required(),
      });

      const schemaResult = schema.validate({
        bodyText,
      });

      if (schemaResult.error) {
        res.send(schemaResult.error.message);
      } else {
        next();
      }
    } catch (error) {
      console.log("error in answer middleware", error);
    }
  }
}

module.exports = new AnswerValidator();
