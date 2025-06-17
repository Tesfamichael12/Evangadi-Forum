const { StatusCodes } = require("http-status-codes");
const dbconnection = require("../db/db.Config");
const { sendAnswerNotification } = require("../services/mailer");
const xss = require("xss");

async function postAnswer(req, res) {
  const { answer, user_id, question_id } = req.body;

  // Validate input
  if (!answer || !user_id || !question_id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Answer, user_id, and question_id are required.",
    });
  }

  // Sanitize answer to prevent XSS
  const sanitizedAnswer = xss(answer);

  // Validate types
  const questionIdNum = parseInt(question_id);
  const userIdNum = parseInt(user_id);
  if (isNaN(questionIdNum) || isNaN(userIdNum)) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: "Invalid question_id or user_id format.",
    });
  }

  // Validate authentication
  if (!req.user || req.user.userid !== userIdNum) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Unauthorized: User ID does not match authenticated user.",
    });
  }

  try {
    // Check if question exists
    const questionResult = await dbconnection.query(
      "SELECT question_id FROM question WHERE question_id = $1",
      [questionIdNum]
    );
    if (questionResult.rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Question not found.",
      });
    }

    // Check if user exists (optional, as FK constraint will catch it, but good for clearer error)
    const userResult = await dbconnection.query(
      "SELECT user_id FROM registration WHERE user_id = $1",
      [userIdNum]
    );
    if (userResult.rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found.", // This error might be redundant if FK constraint is relied upon
      });
    }

    const insertQuery = `
      INSERT INTO answer (answer, user_id, question_id, created_at)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
      RETURNING answer_id
    `;
    const result = await dbconnection.query(insertQuery, [
      sanitizedAnswer,
      userIdNum,
      questionIdNum,
    ]);

    const newAnswerId = result.rows[0].answer_id;

    // Fetch email of the user who asked the question
    const questionOwnerResult = await dbconnection.query(
      `SELECT r.user_email 
       FROM question q 
       JOIN registration r ON q.user_id = r.user_id 
       WHERE q.question_id = $1`,
      [questionIdNum] // Use questionIdNum here
    );

    if (questionOwnerResult.rows.length > 0) {
      const email = questionOwnerResult.rows[0].user_email;
      // Ensure sendAnswerNotification is robust or wrapped in try-catch if it can fail
      try {
        await sendAnswerNotification(email, questionIdNum);
      } catch (mailError) {
        console.error("Failed to send answer notification email:", mailError);
        // Do not fail the entire request if email fails, but log it.
      }
    }

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Answer posted successfully.",
      answerId: newAnswerId,
    });
  } catch (error) {
    console.error("Error posting answer:", {
      message: error.message,
      stack: error.stack,
      code: error.code, // PostgreSQL error code
      constraint: error.constraint // Violated constraint name, if any
    });

    if (error.code === '23503') { // Foreign key violation
      let detail = "Invalid user_id or question_id.";
      if (error.constraint && error.constraint.includes('user_id')) {
        detail = "Posting user does not exist.";
      } else if (error.constraint && error.constraint.includes('question_id')) {
        detail = "The question this answer refers to does not exist.";
      }
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: detail,
      });
    }

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Server error while posting answer. Details: " + error.message,
    });
  }
}

module.exports = { postAnswer };
