const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const dbConnection = require("../db/db.Config");
const xss = require("xss");

async function register(req, res) {
  try {
    const { username, first_name, last_name, email, password } = req.body;
    if (!username || !first_name || !last_name || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        message: "Please provide all required fields",
      });
    }

    // Validate email format
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        message: "Invalid email format",
      });
    }

    // Validate password strength
    if (password.length < 8) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        message: "Password must be at least 8 characters",
      });
    }

    const sanitizedUsername = xss(username);
    const sanitizedFirstName = xss(first_name);
    const sanitizedLastName = xss(last_name);
    const sanitizedEmail = xss(email);

    // Check for existing user
    const existingUserResult = await dbConnection.query(
      "SELECT user_id, user_name, user_email FROM registration WHERE user_name = $1 OR user_email = $2",
      [sanitizedUsername, sanitizedEmail]
    );

    if (existingUserResult.rows.length > 0) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Conflict", message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into registration table and get the new user_id
    const registrationResult = await dbConnection.query(
      "INSERT INTO registration (user_name, user_email, password) VALUES ($1, $2, $3) RETURNING user_id",
      [sanitizedUsername, sanitizedEmail, hashedPassword]
    );

    const newUserId = registrationResult.rows[0].user_id;

    // Insert into profile table
    await dbConnection.query(
      "INSERT INTO profile (user_id, first_name, last_name) VALUES ($1, $2, $3)",
      [newUserId, sanitizedFirstName, sanitizedLastName]
    );

    const token = jwt.sign(
      { userid: newUserId, username: sanitizedUsername },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(StatusCodes.CREATED).json({
      message: "User registered successfully",
      userid: newUserId,
      username: sanitizedUsername,
      email: sanitizedEmail,
      first_name: sanitizedFirstName,
      token,
    });
  } catch (error) {
    console.error("Error during registration:", error);
    // Check for unique constraint violation specifically for user_email (added in tables.js for PostgreSQL)
    if (
      error.code === "23505" &&
      error.constraint === "registration_user_email_key"
    ) {
      // Default constraint name for UNIQUE
      return res.status(StatusCodes.CONFLICT).json({
        error: "Conflict",
        message: "Email address is already registered.",
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred during registration.",
    });
  }
}

module.exports = { register };
