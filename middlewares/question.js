const Joi = require("joi");

class QuestionValidator {
  async questionPost(req, res, next) {
    try {
      const { title, bodyText, tags } = req.body;

      const schema = Joi.object({
        title: Joi.string().min(20).required(),
        bodyText: Joi.string().min(40).required(),
        tags: Joi.array().min(1).required(),
      });

      const schemaResult = schema.validate({
        title,
        bodyText,
        tags,
      });

      if (schemaResult.error) {
        res.send(schemaResult.error.message);
      } else {
        next();
      }
    } catch (error) {
      console.log("error in login middleware questionPost", error);
    }
  }
}

module.exports = new QuestionValidator();
