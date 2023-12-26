const bcrypt = require("bcrypt");
const prisma = require("../prisma/prismaClient");

class SignupController {
  async signup(req, res) {
    try {
      const { username, email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });
      console.log("Newly created user!", newUser);
      res.json(newUser);
    } catch (error) {
      console.log("Error in signup controller", error);
    }
  }
}

module.exports = new SignupController();
