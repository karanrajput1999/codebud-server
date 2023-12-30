const Joi = require("joi");

class CommentValidator {
  async commentPost(req, res, next) {
    try {
      const { commentText } = req.body;

      const schema = Joi.object({
        commentText: Joi.string().min(15),
      });

      const schemaResult = schema.validate({
        commentText,
      });

      if (schemaResult.error) {
        res.send(schemaResult.error.message);
      } else {
        next();
      }
    } catch (error) {
      console.log("error in comment middleware commentPost", error);
    }
  }
}

module.exports = new CommentValidator();
