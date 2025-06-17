require("dotenv").config(); // Load environment variables from .env
const { Pool } = require("pg"); // Import the Pool class from pg

// For Render and other platforms that provide a DATABASE_URL
const connectionString = process.env.DATABASE_URL;

let dbconnection;

if (connectionString) {
  // Use connection string if available (common for Render, Heroku, etc.)
  dbconnection = new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false, // Necessary for some cloud providers like Render
    },
  });
  console.log("Connecting to PostgreSQL using DATABASE_URL with SSL.");
} else {
  // Fallback to individual environment variables (for local or other setups)
  console.log(
    "DATABASE_URL not found, attempting connection with individual DB variables."
  );
  dbconnection = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: parseInt(process.env.DB_PORT) || 5432, // Default PostgreSQL port
    connectionLimit: parseInt(process.env.DB_CONNECTION_LIMIT) || 10, // Though Pool manages this differently, it's good to have
  });
  console.log(
    `Connecting to PostgreSQL host: ${process.env.DB_HOST} on port: ${
      parseInt(process.env.DB_PORT) || 5432
    }`
  );
}

// Test the connection
dbconnection.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(
      "Error connecting to PostgreSQL or executing test query:",
      err.stack
    );
  } else {
    console.log(
      "Successfully connected to PostgreSQL. Test query result:",
      res.rows[0]
    );
  }
});

module.exports = dbconnection;
