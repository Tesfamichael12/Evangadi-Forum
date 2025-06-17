// const { StatusCodes } = require("http-status-codes");
// const dbConnection = require("../db/db.Config");

// async function postQuestion(req, res) {
//   try {
//     const { title, description, tag, userId } = req.body;
//     console.log(title, description, userId);

//     // Validate required fields
//     if (!title || !description || !userId) {
//       return res.status(StatusCodes.BAD_REQUEST).json({
//         message: "Title, description and user-ID are required",
//       });
//     }

//     // Generate a unique post_id
//     const postId = Math.floor(Math.random() * 2147483647) + 1;

//     // Insert question into database
//     const [result] = await dbConnection.query(
//       "INSERT INTO question (question_title, question_description, tag, user_id, post_id) VALUES (?, ?, ?, ?, ?)",
//       [title, description, tag || null, userId, postId]
//     );

//     res.status(StatusCodes.CREATED).json({
//       message: "Question posted successfully",
//       // question: question[0],
//     });

//   } catch (error)
//    {
//     console.error("Error posting question:", error);

//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({

//       message: "Error posting question",
//       error: error.message,

//     });
//   }
// }

// module.exports = { postQuestion };

const { StatusCodes } = require("http-status-codes");
const dbconnection = require("../db/db.Config");
const xss = require("xss");

async function postQuestion(req, res) {
  try {
    const { title, description, tag, userId } = req.body; // userId should come from authenticated user (e.g., req.user.userid)

    // Validate required fields
    if (!title || !description || !userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        message: "Title, description, and user ID are required",
      });
    }

    // Validate tag length (max 20 chars per schema)
    if (tag && tag.length > 20) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: "Bad Request",
        message: "Tag must be 20 characters or less",
      });
    }

    // Sanitize inputs to prevent XSS
    const sanitizedTitle = xss(title);
    const sanitizedDescription = xss(description);
    const sanitizedTag = tag ? xss(tag) : null;

    // Generate a unique post_id (integer)
    // Consider a more robust unique ID generation strategy for production (e.g., UUID or a sequence)
    const postId = Math.floor(Math.random() * 2147483647) + 1;

    // Insert question into database and get the new question_id
    const result = await dbconnection.query(
      "INSERT INTO question (question_title, question_description, tag, user_id, post_id) VALUES ($1, $2, $3, $4, $5) RETURNING question_id",
      [sanitizedTitle, sanitizedDescription, sanitizedTag, userId, postId]
    );

    res.status(StatusCodes.CREATED).json({
      message: "Question posted successfully",
      questionId: result.rows[0].question_id, // Get the returned question_id
      postId: postId 
    });
  } catch (error) {
    console.error("Error posting question:", error);
    // Handle potential foreign key violation if userId does not exist in registration table
    if (error.code === '23503') { // Foreign key violation error code in PostgreSQL
        return res.status(StatusCodes.BAD_REQUEST).json({
            error: "Bad Request",
            message: "Invalid user ID. User does not exist."
        });
    }
    // Handle potential unique constraint violation for post_id (though less likely with random generation)
    if (error.code === '23505' && error.constraint === 'question_post_id_key') {
        // This indicates a collision with post_id, ideally retry with a new post_id or use a sequence
        return res.status(StatusCodes.CONFLICT).json({
            error: "Conflict",
            message: "Failed to generate a unique post identifier. Please try again."
        });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: "Internal Server Error",
      message: "An unexpected error occurred while posting the question.",
    });
  }
}

module.exports = { postQuestion };
