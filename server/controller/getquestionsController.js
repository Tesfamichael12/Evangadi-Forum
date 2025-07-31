const { StatusCodes } = require("http-status-codes");
const dbconnection = require("../db/db.Config");

// this module contains both endpoints related with fetching questions

/**
 * Fetches all questions, joining with user_name and like/dislike counts.
 */
async function getquestions(req, res) {
  try {
    const userId = req.user?.userid;
    // Pagination params
    const page = parseInt(req.query.page, 10) || 1;
    const pageSize = parseInt(req.query.pageSize, 10) || 10;
    const offset = (page - 1) * pageSize;
    // Sorting
    const sort = req.query.sort === "popular" ? "popular" : "recent";
    let orderBy = "q.created_at DESC";
    if (sort === "popular") {
      orderBy = "likes DESC, q.created_at DESC";
    }
    // Search
    const search = req.query.search ? req.query.search.trim() : null;
    let whereClause = "";
    let searchParams = [];
    if (search) {
      whereClause = `WHERE (q.tag ILIKE $1 OR q.question_title ILIKE $2 OR q.question_description ILIKE $3)`;
      const likeSearch = `%${search}%`;
      searchParams = [likeSearch, likeSearch, likeSearch];
    }
    // Get total count for pagination
    const countQuery = `SELECT COUNT(*) as total FROM question q ${whereClause}`;
    const { rows: countRows } = await dbconnection.query(
      countQuery,
      searchParams
    );
    const total = parseInt(countRows[0]?.total || 0, 10);
    // Build main query parameters
    const mainParams = [userId || 0];
    if (search) {
      const likeSearch = `%${search}%`;
      mainParams.push(likeSearch, likeSearch, likeSearch);
    }
    mainParams.push(pageSize, offset);
    // Build WHERE clause for main query
    let mainWhereClause = "";
    if (search) {
      mainWhereClause = `WHERE (q.tag ILIKE $2 OR q.question_title ILIKE $3 OR q.question_description ILIKE $4)`;
    }

    const questionsQuery = `
      SELECT
        q.*,
        r.user_name,
        r.user_uuid,
        COALESCE(ld.likes, 0) AS likes,
        COALESCE(ld.dislikes, 0) AS dislikes,
        CASE
          WHEN ul.is_like = true THEN 'up'
          WHEN ul.is_like = false THEN 'down'
          ELSE NULL
        END AS user_vote_type
      FROM
        question q
      JOIN
        registration r ON q.user_id = r.user_id
      LEFT JOIN (
        SELECT
          question_id,
          SUM(CASE WHEN is_like = true THEN 1 ELSE 0 END) AS likes,
          SUM(CASE WHEN is_like = false THEN 1 ELSE 0 END) AS dislikes
        FROM
          likes_dislikes
        GROUP BY
          question_id
      ) AS ld ON q.question_id = ld.question_id
      LEFT JOIN likes_dislikes ul ON ul.question_id = q.question_id AND ul.user_id = $1
      ${mainWhereClause}
      ORDER BY
        ${orderBy}
      LIMIT $${mainParams.length - 1} OFFSET $${mainParams.length};
    `;
    const { rows: questions } = await dbconnection.query(
      questionsQuery,
      mainParams
    );
    res.status(StatusCodes.OK).json({
      questions,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error retrieving questions:", error.message);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retrieving questions" });
  }
}

/**
 * Fetches a single question by ID, including user_name and like/dislike counts.
 */
async function getSingleQuestion(req, res) {
  try {
    const { question_uuid } = req.params;
    const userId = req.user?.userid;
    const { rows: questions } = await dbconnection.query(
      `
      SELECT
        q.*,
        r.user_name,
        r.user_uuid,
        COALESCE(ld.likes, 0) AS likes,
        COALESCE(ld.dislikes, 0) AS dislikes,
        CASE
          WHEN ul.is_like = true THEN 'up'
          WHEN ul.is_like = false THEN 'down'
          ELSE NULL
        END AS user_vote_type
      FROM
        question q
      JOIN
        registration r ON q.user_id = r.user_id
      LEFT JOIN (
        SELECT
          question_id,
          SUM(CASE WHEN is_like = true THEN 1 ELSE 0 END) AS likes,
          SUM(CASE WHEN is_like = false THEN 1 ELSE 0 END) AS dislikes
        FROM
          likes_dislikes
        GROUP BY
          question_id
      ) AS ld ON q.question_id = ld.question_id
      LEFT JOIN likes_dislikes ul ON ul.question_id = q.question_id AND ul.user_id = $1
      WHERE q.question_uuid = $2
    `,
      [userId || 0, question_uuid]
    );

    if (questions.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Question not found" });
    }
    res.status(StatusCodes.OK).json({ question: questions[0] });
  } catch (error) {
    console.error(
      `Error retrieving question with id ${req.params.id}:`,
      error.message
    );
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Error retrieving question" });
  }
}

module.exports = { getquestions, getSingleQuestion };
