const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/db.Config");
const xss = require("xss");

//login route implementation FOR already registered users
async function login(req, res) {
  // Sanitize email and password
  const email = xss(req.body.email);
  const password = xss(req.body.password);

  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      error: "Bad Request",
      message: "Please provide all required fields",
    });
  }

  try {
    const userResult = await dbConnection.query(
      "SELECT r.user_name, r.user_id, r.user_email, r.password, p.first_name FROM registration r JOIN profile p ON r.user_id = p.user_id WHERE r.user_email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized", message: "User not found, please register first" });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ error: "Unauthorized", message: "Invalid email or password" }); // Generic message for security
    }

    const userid = user.user_id;
    const username = user.user_name;
    const first_name = user.first_name; // Get first_name from the query result

    const token = jwt.sign({ userid, username }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });

    res.status(StatusCodes.OK).json({
      message: "User login successful",
      userid: user.user_id,
      username: user.user_name,
      email: user.user_email,
      first_name, // Add first_name to the response
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred during login.",
    });
  }
}
module.exports = { login };
