require("dotenv").config();
const colors = require("./ansiColors");

const express = require("express");
const cors = require("cors");
const signupRouter = require("./routes/signup");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/signup", signupRouter);

app.listen(process.env.PORT, () => {
  console.log(
    colors.info.bold.underline(`Server started @ port ${process.env.PORT}`)
  );
});
