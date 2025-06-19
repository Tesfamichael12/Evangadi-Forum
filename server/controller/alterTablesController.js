const dbconnection = require("../db/db.Config");
const { StatusCodes } = require("http-status-codes");

async function alterAllTables(req, res) {
  // IMPORTANT: THIS IS A TEMPORARY AND DANGEROUS ENDPOINT.
  // DELETE THE CONTROLLER AND ROUTE FILES IMMEDIATELY AFTER USE.

  const alterCommands = [
    "ALTER TABLE registration ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE;",
    "ALTER TABLE question ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE;",
    "ALTER TABLE answer ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE;",
    "ALTER TABLE likes_dislikes ALTER COLUMN created_at TYPE TIMESTAMP WITH TIME ZONE;",
    "ALTER TABLE profile ADD CONSTRAINT unique_user_id UNIQUE (user_id);",
  ];

  const results = [];
  let errorOccurred = false;

  try {
    for (const command of alterCommands) {
      try {
        await dbconnection.query(command);
        results.push({ command: command, status: "Success" });
        console.log(`Successfully executed: ${command}`);
      } catch (err) {
        errorOccurred = true;
        results.push({
          command: command,
          status: "Failed",
          error: err.message,
        });
        console.error(`Failed to execute: ${command}`, err);
        // Optionally, break on first error or collect all results
        // break;
      }
    }

    if (errorOccurred) {
      return res.status(StatusCodes.MULTI_STATUS).json({
        message: "Some alter commands failed. Check results for details.",
        results: results,
      });
    }

    res.status(StatusCodes.OK).json({
      message:
        "All specified tables altered successfully (if they existed and needed alteration).",
      results: results,
    });
  } catch (error) {
    // This catch block might be redundant if individual errors are caught above,
    // but good for unexpected issues.
    console.error("General error during alter tables operation:", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "A general error occurred while attempting to alter tables.",
      error: error.message,
      results: results, // Send partial results if any
    });
  }
}

module.exports = { alterAllTables };
