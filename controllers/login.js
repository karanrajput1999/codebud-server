const bcrypt = require("bcrypt");
const prisma = require("../prisma/prismaClient");
const jwt = require("jsonwebtoken");

class LoginController {
  async loginPost(req, res) {
    try {
      const { email, password } = req.body;

      const registeredUser = await prisma.user.findFirst({ where: { email } });

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
      } else {
        const { password, ...otherUserDetails } = registeredUser;
        const jwtToken = jwt.sign(registeredUser.id, process.env.JWT_SECRET);

        res.cookie("auth_token", jwtToken, {
          expires: new Date(Date.now() + 900000000),
          httpOnly: true,
          secure: true,
        });
        res.json(otherUserDetails);
      }
    } catch (error) {
      console.log("Error in loginPost controller", error);
    }
  }

  async loginGet(req, res) {
    try {
      const cookies = req.cookies["auth_token"];

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      if (verifyToken) {
        const loggedInUser = await prisma.user.findFirst({
          where: { id: verifyToken },
          include: {
            questions: true,
          },
        });

        console.log("this one came from login", verifyToken);
        // console.log("this one came from login too", );
        if (!loggedInUser) {
          res.status(404).send("User not found");
          return;
        }

        const { password, ...otherUserDetails } = loggedInUser;
        res.status(200).send(otherUserDetails);
      } else {
        res.end();
      }
    } catch (error) {
      console.log("Error in loginGet controller", error);
    }
  }
}

module.exports = new LoginController();
