const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const signupRouter = express.Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

signupRouter.post("/", async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  const schemaResult = schema.validate({ username, email, password });

  const hashedPassword = await bcrypt.hash(password, 10);

  if (schemaResult.error) {
    res.send(schemaResult.error.message);
    return;
  }

  const newUser = await prisma.user.create({
    data: { username, email, password: hashedPassword },
  });
  console.log("Newly created user!", newUser);
  res.json(newUser);
});

module.exports = signupRouter;
