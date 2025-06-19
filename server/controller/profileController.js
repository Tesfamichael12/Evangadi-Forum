const db = require("../db/db.Config");

// --- Helper Functions ---

/**
 * Centralized error handler to keep code DRY.
 * @param {object} res - The Express response object.
 * @param {string} message - A user-friendly message for the error.
 * @param {Error} error - The caught error object.
 */
const handleError = (res, message = "An unexpected error occurred.", error) => {
  console.error(message, error);
  res
    .status(500)
    .json({ message, error: error ? error.message : "Unknown error" });
};

/**
 * Fetches a user's combined profile and registration data in a single query.
 * @param {string} userId - The ID of the user to fetch.
 * @returns {Promise<object|null>} The user's profile data or null if not found.
 */
const fetchUserProfile = async (userId) => {
  const query = `
    SELECT 
      r.user_id, 
      r.user_name, 
      r.user_email, 
      COALESCE(p.first_name, '') as first_name, 
      COALESCE(p.last_name, '') as last_name
    FROM registration r
    LEFT JOIN profile p ON r.user_id = p.user_id
    WHERE r.user_id = $1;
  `;
  const { rows } = await db.query(query, [userId]);
  return rows[0];
};

// --- Route Handlers ---

/**
 * GET profile by user_id.
 */
exports.getProfile = async (req, res) => {
  try {
    const profile = await fetchUserProfile(req.params.user_id);

    if (!profile) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(profile);
  } catch (err) {
    handleError(res, "Server error while fetching profile.", err);
  }
};

/**
 * UPDATE a user's profile and registration info.
 */
exports.updateProfile = async (req, res) => {
  const { user_id } = req.params;
  const { first_name, last_name, user_name } = req.body;

  const client = await db.connect(); // Use a client for transactions

  try {
    await client.query("BEGIN");

    // Update registration table
    await client.query(
      "UPDATE registration SET user_name = $1 WHERE user_id = $2",
      [user_name, user_id]
    );

    // Upsert profile table
    const upsertProfileQuery = `
      INSERT INTO profile (user_id, first_name, last_name)
      VALUES ($1, $2, $3)
      ON CONFLICT (user_id)
      DO UPDATE SET first_name = EXCLUDED.first_name, last_name = EXCLUDED.last_name;
    `;
    await client.query(upsertProfileQuery, [user_id, first_name, last_name]);

    await client.query("COMMIT");

    // Fetch the newly updated profile to return
    const updatedProfile = await fetchUserProfile(user_id);

    res.json({
      message: "Profile updated successfully",
      user: {
        userid: updatedProfile.user_id,
        username: updatedProfile.user_name,
        email: updatedProfile.user_email,
        firstname: updatedProfile.first_name,
      },
    });
  } catch (err) {
    await client.query("ROLLBACK");
    handleError(res, "Update failed.", err);
  } finally {
    client.release(); // Release the client back to the pool
  }
};

/**
 * DELETE a user's account.
 */
exports.deleteProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await db.query(
      "DELETE FROM registration WHERE user_id = $1",
      [user_id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "User not found, nothing to delete." });
    }

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (err) {
    handleError(res, "Deletion failed.", err);
  }
};
