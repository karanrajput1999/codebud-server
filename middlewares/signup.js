const Joi = require("joi");

class SignupValidator {
  async signupPost(req, res, next) {
    try {
      const { username, email, password, confirmPassword } = req.body;

      const schema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
        confirmPassword: Joi.string().equal(Joi.ref("password")),
      });

      const schemaResult = schema.validate({
        username,
        email,
        password,
        confirmPassword,
      });

      if (schemaResult.error) {
        res.send(schemaResult.error.message);
      } else {
        next();
      }
    } catch (error) {
      console.log("Error in signup Post middleware", error);
    }
  }
}

module.exports = new SignupValidator();
