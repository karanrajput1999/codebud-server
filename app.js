require("dotenv").config();
const colors = require("./ansiColors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const questionRouter = require("./routes/question");
const homepageRouter = require("./routes/homepage");
const upvoteDownvoteRouter = require("./routes/upvoteDownvote");
const commentRouter = require("./routes/comment");
const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  next();
});

app.use(cookieParser());

app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/questions/ask", questionRouter);
app.use("/questions/:id", questionRouter);
app.use("/questions/:id", upvoteDownvoteRouter);
app.use("/questions/:id/comment", commentRouter);
app.use("/homepage", homepageRouter);

app.listen(process.env.PORT, () => {
  console.log(
    colors.info.bold.underline(`Server started @ port ${process.env.PORT}`)
  );
});
