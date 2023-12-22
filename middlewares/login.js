const Joi = require("joi");

class LoginValidator {
  async loginPost(req, res, next) {
    try {
      const { email, password } = req.body;

      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
      });

      const schemaResult = schema.validate({
        email,
        password,
      });

      if (schemaResult.error) {
        res.send(schemaResult.error.message);
      } else {
        next();
      }
    } catch (error) {
      console.log("error in login middleware loginpost", error);
    }
  }
}

module.exports = new LoginValidator();
