const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prismaClient");

class CommentController {
  async commentPost(req, res) {
    try {
      const { commentText } = req.body;
      const { id, answerId } = req.params;

      const cookies = req.cookies["auth_token"];

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      if (answerId) {
        return;
      }

      if (verifyToken) {
        const comment = await prisma.comment.create({
          data: {
            commentText,
            userId: verifyToken,
            postId: id,
          },
        });
        res.status(201).send(comment);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.log("got error in comment controller commentPost", error);
    }
  }
  async answerCommentPost(req, res) {
    try {
      const { commentText, answerId } = req.body;

      const cookies = req.cookies["auth_token"];

      console.log("answer comment post called", answerId);

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      if (verifyToken) {
        const comment = await prisma.comment.create({
          data: {
            commentText,
            userId: verifyToken,
            answerId,
          },
        });
        console.log("commented on answer -> ", comment);
        res.status(201).send(comment);
      } else {
        res.status(404).send("User not found");
      }
    } catch (error) {
      console.log("got error in comment controller commentPost", error);
    }
  }

  async commentDelete(req, res) {
    try {
      const { commentId } = req.params;
      const cookies = req.cookies["auth_token"];

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      const comment = await prisma.comment.findFirst({
        where: { id: commentId },
      });

      if (verifyToken) {
        if (verifyToken === comment.userId) {
          const deletedComment = await prisma.comment.delete({
            where: { id: commentId },
          });
          res.status(200).send(deletedComment);
        } else {
          res
            .status(401)
            .send("You do not have permission to delete this comment");
        }
      } else {
        res.status(404).send("user not found!");
      }
    } catch (error) {
      console.log("got error in comment controller commentDelete", error);
    }
  }
  async commentPatch(req, res) {
    try {
      const { commentId } = req.params;
      const { commentText } = req.body;
      const cookies = req.cookies["auth_token"];

      // verifyToken is id of the user
      const verifyToken =
        cookies && jwt.verify(cookies, process.env.JWT_SECRET);

      const comment = await prisma.comment.findFirst({
        where: { id: commentId },
      });

      if (verifyToken) {
        if (verifyToken === comment.userId) {
          const editedComement = await prisma.comment.update({
            where: { id: commentId },
            data: {
              commentText,
            },
            include: { user: true },
          });
          res.status(200).send(editedComement);
        } else {
          res
            .status(401)
            .send("You do not have permission to edit this comment");
        }
      } else {
        res.status(404).send("user not found!");
      }
    } catch (error) {
      console.log("got error in comment controller commentPatch", error);
    }
  }
}

module.exports = new CommentController();
