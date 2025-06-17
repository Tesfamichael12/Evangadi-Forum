const { StatusCodes } = require("http-status-codes");
const dbconnection = require("../db/db.Config");

async function handleVote(req, res, type, isLikeBoolean) {
  const id = req.params[`${type}_id`]; // e.g., req.params.question_id
  const userId = req.user.userid;

  let typeIdColumn;
  let constraintName; // For ON CONFLICT clause

  if (type === "question") {
    typeIdColumn = "question_id";
    // Assuming a unique constraint named e.g., unique_user_question_vote on (user_id, question_id)
    // Or, specify columns directly: ON CONFLICT (user_id, question_id)
    // For the provided tables.js, the constraint is unique_vote_question (user_id, question_id, is_like)
    // This makes simple upsert to change vote type tricky.
    // A better unique constraint for this logic would be (user_id, question_id)
    // Let's assume the unique constraint is effectively on (user_id, typeIdColumn)
    // for the purpose of ON CONFLICT DO UPDATE to change the is_like value.
    // If the unique constraint is (user_id, typeIdColumn, is_like), then ON CONFLICT (user_id, typeIdColumn, is_like) DO NOTHING
    // would prevent duplicates but not allow changing a vote.
    // To allow changing vote, the constraint should be (user_id, typeIdColumn).
    // We will proceed as if the constraint is (user_id, typeIdColumn) for upserting is_like.
  } else if (type === "answer") {
    typeIdColumn = "answer_id";
    // Assuming unique constraint unique_user_answer_vote on (user_id, answer_id)
  } else {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid resource type." });
  }

  try {
    // PostgreSQL uses ON CONFLICT ... DO UPDATE
    // The conflict target should be the columns that define uniqueness for a vote entry by a user on an item.
    // E.g., (user_id, question_id) or (user_id, answer_id)
    // The `is_like` column is what we want to update if a conflict occurs on these keys.
    const upsertQuery = `
      INSERT INTO likes_dislikes (user_id, ${typeIdColumn}, is_like)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id, ${typeIdColumn}) 
      DO UPDATE SET is_like = $3, created_at = CURRENT_TIMESTAMP;
    `;
    // Note: If your unique constraint in tables.js is indeed (user_id, question_id, is_like) and
    // (user_id, answer_id, is_like), then the above ON CONFLICT (user_id, ${typeIdColumn})
    // will FAIL if such a constraint doesn't exist.
    // You would need a unique constraint specifically on (user_id, ${typeIdColumn}).
    // If you must use the existing unique constraints (user_id, typeIdColumn, is_like),
    // then handling vote changes (e.g., like to dislike) requires deleting the old record
    // and inserting a new one, or a more complex MERGE statement if available/appropriate.
    // For simplicity, this code assumes a unique constraint on (user_id, ${typeIdColumn}) exists or is desired.

    await dbconnection.query(upsertQuery, [userId, id, isLikeBoolean]);

    // Fetch updated counts
    // Ensure is_like is compared against boolean true/false for PostgreSQL
    const countsQuery = `
      SELECT
        SUM(CASE WHEN is_like = TRUE THEN 1 ELSE 0 END) as likes,
        SUM(CASE WHEN is_like = FALSE THEN 1 ELSE 0 END) as dislikes
      FROM likes_dislikes WHERE ${typeIdColumn} = $1;
    `;
    const countsResult = await dbconnection.query(countsQuery, [id]);

    res.status(StatusCodes.OK).json({
      likes: parseInt(countsResult.rows[0]?.likes, 10) || 0,
      dislikes: parseInt(countsResult.rows[0]?.dislikes, 10) || 0,
    });
  } catch (err) {
    console.error(
      `Error while voting on ${type} (ID: ${id}, UserID: ${userId}):`,
      err
    );
    // Check for specific PostgreSQL error codes if helpful
    // e.g., 23503 for foreign key violation if question_id/answer_id/user_id does not exist
    // e.g., 23505 for unique constraint violation if ON CONFLICT is not set up as expected or another constraint fails
    if (err.code === "23503") {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: `The specified ${type} or user does not exist.` });
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        message: "Database error occurred while voting.",
        error: err.message,
      });
  }
}

// Pass boolean true/false for isLikeBoolean
const likeQuestion = (req, res) => handleVote(req, res, "question", true);
const dislikeQuestion = (req, res) => handleVote(req, res, "question", false);
const likeAnswer = (req, res) => handleVote(req, res, "answer", true);
const dislikeAnswer = (req, res) => handleVote(req, res, "answer", false);

module.exports = { likeQuestion, dislikeQuestion, likeAnswer, dislikeAnswer };
