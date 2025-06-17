const { StatusCodes } = require("http-status-codes");
const dbconnection = require("../db/db.Config");

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
      orderBy = "likes DESC, q.created_at DESC"; // Ensure likes is defined in the SELECT if used here
    }
    // Search
    const search = req.query.search ? req.query.search.trim() : null;
    
    let whereClause = "";
    let queryParams = [];
    let paramIndex = 1;

    // User vote subquery parameter
    queryParams.push(userId || 0); // $1 for ul.user_id

    if (search) {
      whereClause = `WHERE (q.tag ILIKE $${paramIndex + 1} OR q.question_title ILIKE $${paramIndex + 2} OR q.question_description ILIKE $${paramIndex + 3})`;
      const likeSearch = `%${search}%`;
      queryParams.push(likeSearch, likeSearch, likeSearch);
      paramIndex += 3;
    }

    const countQuery = `SELECT COUNT(*) as total FROM question q ${whereClause.replace(/\$\d+/g, (match, i) => search ? `$` + (parseInt(match.substring(1)) -1) : match )}`;
    // Adjust countQueryParams by removing the first element (userId for user_vote_type) if it's not part of the WHERE for count
    const countQueryParams = search ? queryParams.slice(1, 1 + 3) : [];
    const countResult = await dbconnection.query(countQuery, countQueryParams);
    const total = parseInt(countResult.rows[0].total, 10);

    const questionsQuery = `
      SELECT
        q.*,
        r.user_name,
        COALESCE(ld.likes, 0) AS likes,
        COALESCE(ld.dislikes, 0) AS dislikes,
        CASE
          WHEN ul.is_like = TRUE THEN 'up'
          WHEN ul.is_like = FALSE THEN 'down'
          ELSE NULL
        END AS user_vote_type
      FROM
        question q
      JOIN
        registration r ON q.user_id = r.user_id
      LEFT JOIN (
        SELECT
          question_id,
          SUM(CASE WHEN is_like = TRUE THEN 1 ELSE 0 END) AS likes,
          SUM(CASE WHEN is_like = FALSE THEN 1 ELSE 0 END) AS dislikes
        FROM
          likes_dislikes
        GROUP BY
          question_id
      ) AS ld ON q.question_id = ld.question_id
      LEFT JOIN likes_dislikes ul ON ul.question_id = q.question_id AND ul.user_id = $1 -- Param for user specific vote
      ${whereClause} -- WHERE clause with $2, $3, $4 if search is active
      ORDER BY
        ${orderBy} -- Safe as it's constructed from controlled inputs
      LIMIT $${paramIndex + 1} OFFSET $${paramIndex + 2};
    `;
    queryParams.push(pageSize, offset);

    const questionsResult = await dbconnection.query(questionsQuery, queryParams);
    
    res.status(StatusCodes.OK).json({
      questions: questionsResult.rows,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error("Error retrieving questions:", error.message, error.stack);
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
    const { id } = req.params;
    const userId = req.user?.userid; 

    const queryParams = [userId || 0, id];

    const questionResult = await dbconnection.query(
      `
      SELECT
        q.*,
        r.user_name,
        COALESCE(ld.likes, 0) AS likes,
        COALESCE(ld.dislikes, 0) AS dislikes,
        CASE
          WHEN ul.is_like = TRUE THEN 'up'
          WHEN ul.is_like = FALSE THEN 'down'
          ELSE NULL
        END AS user_vote_type
      FROM
        question q
      JOIN
        registration r ON q.user_id = r.user_id
      LEFT JOIN (
        SELECT
          question_id,
          SUM(CASE WHEN is_like = TRUE THEN 1 ELSE 0 END) AS likes,
          SUM(CASE WHEN is_like = FALSE THEN 1 ELSE 0 END) AS dislikes
        FROM
          likes_dislikes
        GROUP BY
          question_id
      ) AS ld ON q.question_id = ld.question_id
      LEFT JOIN likes_dislikes ul ON ul.question_id = q.question_id AND ul.user_id = $1
      WHERE q.question_id = $2
    `,
      queryParams
    );

    if (questionResult.rows.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Question not found" });
    }
    res.status(StatusCodes.OK).json({ question: questionResult.rows[0] });
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
