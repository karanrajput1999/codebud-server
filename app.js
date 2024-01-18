require("dotenv").config();
const colors = require("./ansiColors");
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const questionRouter = require("./routes/question");
const homepageRouter = require("./routes/homepage");
const questionUpvoteDownvoteRouter = require("./routes/questionUpvoteDownvote");
const answerUpvoteDownvoteRouter = require("./routes/answerUpvoteDownvote");
const commentRouter = require("./routes/comment");
const answerCommentRouter = require("./routes/answerComment");
const editQuestionRouter = require("./routes/editQuestion");
const answerRouter = require("./routes/answer");
const editAnswerRouter = require("./routes/editAnswer");

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

app.use("/homepage", homepageRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/questions/ask", questionRouter);
app.use("/questions/:id", questionRouter);
app.use("/questions/:id", questionUpvoteDownvoteRouter);
app.use("/questions/:id/edit", editQuestionRouter);
app.use("/questions/:id/comment", commentRouter);
app.use("/questions/:id/answer/:answerId/comment", answerCommentRouter);
app.use("/questions/:id/answer", answerRouter);
// app.use("/questions/:id/answer/:answerId/edit", answerUpvoteDownvoteRouter);
app.use("/questions/:id/answer/:answerId", answerUpvoteDownvoteRouter);
app.use("/questions/:id/answer/:answerId/edit", editAnswerRouter);

app.listen(process.env.PORT, () => {
  console.log(
    colors.info.bold.underline(`Server started @ port ${process.env.PORT}`)
  );
});
