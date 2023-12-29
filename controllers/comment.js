const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prismaClient");

class CommentController {
  async commentPost(req, res) {
    try {
      const { commentText } = req.body;
      const cookies = req.cookies["auth_token"];
      const { id } = req.params;

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      if (verifyToken) {
        const comment = await prisma.comment.create({
          data: { commentText, userId: verifyToken, postId: id },
        });
        res.send(comment);
      } else {
        res.status(404).send("User not found");
      }

      commentText;
    } catch (error) {
      console.log("got error in commentController commentPost", error);
    }
  }
}

module.exports = new CommentController();
