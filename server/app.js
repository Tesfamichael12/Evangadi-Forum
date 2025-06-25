const express = require("express");
const cors = require("cors");
const dbconnection = require("./db/db.Config");
const dotenv = require("dotenv");
const helmet = require("helmet");

// Configuring dotenv
dotenv.config();

const app = express();

app.use(helmet()); // Sets various HTTP headers for security - prevent against clickjacking, MIME-type sniffing, XSS etc.

const limiter = require("./middleware/rateLimiter");

// Middlewares
app.use(
  cors({
    origin: [
      "http://localhost:4321",
      "http://localhost:5173",
      "http://localhost:3000",
      "https://evangadi-forum-beta7.vercel.app",
      "https://evangadi-forum-sepia.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(limiter); // request rate limiter
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import auth middleware
const authMiddleware = require("./middleware/authMiddleware");

// Import admin routes
const initDB_Router = require("./routes/initDB_route");
const createTableRouter = require("./routes/createTablesRoute");
// Import user routes
const registerRouter = require("./routes/registerRoute");
const loginRouter = require("./routes/loginRoute");
const passwordResetRouter = require("./routes/passwordResetRoute");

// Import question and answer routes
const getquestions = require("./routes/getquestionsRoute");
const postQuestionRoutes = require("./routes/postQuestionsRoute");
const getAnswerRouter = require("./routes/getAnswerRoute");
const postAnswerRoutes = require("./routes/postAnswerRoute");
const likeRouter = require("./routes/likeDislikeRoute");
const updateQuestionRouter = require("./routes/updateQuestionRouter");
const updateAnswerRouter = require("./routes/updateAnswerRoute");
const updateCommentRouter = require("./routes/updateCommentRoute");
const getAnswerCommentsRouter = require("./routes/getAnswerCommentRoute");
const postCommentRouter = require("./routes/postCommentRoute");

// All Routes
app.use("/api/admin", initDB_Router);
app.use("/api/admin", createTableRouter);
app.use("/api/user", registerRouter);
app.use("/api/user", loginRouter);
app.use("/api/user", passwordResetRouter);
app.use("/api", getquestions);
app.use("/api", getAnswerRouter);
app.use("/api", getAnswerCommentsRouter);
app.use("/api", authMiddleware, postQuestionRoutes);
app.use("/api", authMiddleware, postAnswerRoutes);
app.use("/api", authMiddleware, likeRouter);
app.use("/api", authMiddleware, postCommentRouter);
app.use("/api", authMiddleware, updateAnswerRouter);
app.use("/api", authMiddleware, updateCommentRouter);
app.use("/api/question", authMiddleware, updateQuestionRouter);

// Profile routes
const profileRoutes = require("./routes/profileRoutes");
app.use("/api/profile", profileRoutes);

// Global error handler
const globalErrorHandler = require("./middleware/globalErrorHandler");
app.use(globalErrorHandler);

// Start server and test database connection
async function startServer() {
  try {
    await dbconnection.query("SELECT 'test'");
    app.listen(process.env.PORT || 5400, () => {
      console.log(
        `Server is running on: http://localhost:${process.env.PORT || 5400}`
      );
      console.log("Database connection successful");
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
}

startServer();
