const fs = require('fs').promises; // Using promises version of fs
const path = require('path');
const dbconnection = require("../db/db.Config");
const { StatusCodes } = require("http-status-codes");

async function loadDummyData(req, res) {
  try {
    const sqlFilePath = path.join(__dirname, '..', 'db', 'dummy_data.sql');
    const sqlCommands = await fs.readFile(sqlFilePath, 'utf8');

    // The pg driver can execute a string containing multiple SQL statements separated by semicolons.
    await dbconnection.query(sqlCommands);

    res.status(StatusCodes.OK).send("Dummy data loaded successfully into tables.");
  } catch (err) {
    console.error("Error loading dummy data:", err);
    // Provide more specific error if possible
    let errorMessage = "Error loading dummy data: " + err.message;
    if (err.code) { // PostgreSQL error code
        errorMessage += ` (Code: ${err.code})`;
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(errorMessage);
  }
}

module.exports = { loadDummyData };
