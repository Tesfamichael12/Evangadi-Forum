const dbconnection = require("../db/db.Config");
const { StatusCodes } = require("http-status-codes");

async function getAnswers(req, res) {
  const { question_id } = req.params;
  const userId = req.user?.userid;
  // Pagination params
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const offset = (page - 1) * pageSize;
  // Sorting
  const sort = req.query.sort === "popular" ? "popular" : "recent";
  let orderBy = "a.created_at DESC";
  if (sort === "popular") {
    orderBy = "likes DESC, a.created_at DESC"; // Ensure 'likes' alias is available or use the aggregate directly
  }
  try {
    // Get total count for pagination
    const totalResult = await dbconnection.query(
      `SELECT COUNT(*) as total FROM answer WHERE question_id = $1`,
      [question_id]
    );
    const total = parseInt(totalResult.rows[0].total, 10);

    if (total === 0) {
      return res.status(StatusCodes.OK).json({
        answers: [],
        pagination: { total: 0, page, pageSize, totalPages: 1 },
      });
    }

    // Main query to fetch answers
    // Note: The orderBy clause is constructed from validated input, which is acceptable.
    // For user_vote_type, ensure likes_dislikes.is_like is boolean in PostgreSQL (true/false)
    // or adjust the CASE statement accordingly if it's integer (1/0).
    // Assuming is_like is BOOLEAN: CASE WHEN ul.is_like THEN 'up' WHEN NOT ul.is_like THEN 'down' ELSE NULL END
    // If is_like is INTEGER (0 or 1): CASE WHEN ul.is_like = 1 THEN 'up' WHEN ul.is_like = 0 THEN 'down' ELSE NULL END
    const query = `
      SELECT 
        a.answer_id,
        a.answer,
        a.created_at,
        r.user_name,
        p.first_name,
        p.last_name,
        COALESCE(ld.likes, 0) AS likes,
        COALESCE(ld.dislikes, 0) AS dislikes,
        CASE
          WHEN ul.is_like = TRUE THEN 'up'  -- Assuming is_like is BOOLEAN
          WHEN ul.is_like = FALSE THEN 'down' -- Assuming is_like is BOOLEAN
          ELSE NULL
        END AS user_vote_type
      FROM answer a -- Start from answer table as we are fetching answers
      LEFT JOIN registration r ON a.user_id = r.user_id
      LEFT JOIN profile p ON a.user_id = p.user_id
      LEFT JOIN (
        SELECT
          answer_id,
          SUM(CASE WHEN is_like = TRUE THEN 1 ELSE 0 END) AS likes, -- Assuming is_like is BOOLEAN
          SUM(CASE WHEN is_like = FALSE THEN 1 ELSE 0 END) AS dislikes -- Assuming is_like is BOOLEAN
        FROM
          likes_dislikes
        GROUP BY
          answer_id
      ) AS ld ON a.answer_id = ld.answer_id
      LEFT JOIN likes_dislikes ul ON ul.answer_id = a.answer_id AND ul.user_id = $1
      WHERE a.question_id = $2 -- Filter answers for the given question_id
      ORDER BY ${orderBy} -- orderBy is sanitized
      LIMIT $3 OFFSET $4;
    `;
    
    const results = await dbconnection.query(query, [userId || null, question_id, pageSize, offset]);

    // If the question exists but has no answers (total > 0 but results.rows.length === 0 after pagination)
    // This check might be redundant if the initial total check handles it,
    // but it's good for clarity if somehow results are empty despite total > 0 (e.g., page out of bounds, though offset handles this)
    if (results.rows.length === 0) {
      return res.status(StatusCodes.OK).json({
        answers: [],
        pagination: {
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
        },
      });
    }

    res.status(StatusCodes.OK).json({
      answers: results.rows,
      pagination: {
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (err) {
    console.error(
      `Error fetching answers for question_id ${question_id}:`,
      err
    );
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to retrieve answers.",
      error: err.message,
    });
  }
}

module.exports = { getAnswers };
