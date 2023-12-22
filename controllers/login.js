const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class LoginController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const registeredUser = await prisma.user.findFirst({ where: { email } });
      console.log("this is registered user's account", registeredUser);
      if (!registeredUser) {
        res.send("user not found!");
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        registeredUser.password
      );

      if (!passwordMatch) {
        res.send("wrong password!");
        return;
      }

      res.json(registeredUser);
    } catch (error) {
      console.log("Error in login controller", error);
    }
  }
}

module.exports = new LoginController();
