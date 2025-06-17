const { Pool } = require("pg");
const dbConfig = require("../db/db.Config"); // To get user/password for admin tasks if needed

// Helper function to connect as a superuser (if necessary) or a user with CREATEDB privileges
// This configuration might need adjustment based on your local setup or deployment environment.
// For Render, you typically don't create the database or roles this way; it's pre-provisioned.
// This script is more for local development convenience.
async function getAdminPool() {
  // Attempt to use environment variables for a superuser or a user with CREATEDB,
  // falling back to the app's user if those aren't specifically set for admin tasks.
  // You might need to set PGADMIN_USER, PGADMIN_PASSWORD, PGADMIN_HOST, PGADMIN_PORT, PGADMIN_DATABASE
  // in your .env for this to connect with higher privileges if the app user cannot create databases/roles.
  return new Pool({
    user: process.env.PGADMIN_USER || dbConfig.user, // or a dedicated admin user
    host: process.env.PGADMIN_HOST || dbConfig.host,
    database: process.env.PGADMIN_DATABASE || "postgres", // Connect to a default db like 'postgres' to create a new one
    password: process.env.PGADMIN_PASSWORD || dbConfig.password,
    port: process.env.PGADMIN_PORT || dbConfig.port,
    ssl: dbConfig.ssl, // Include SSL config if applicable
  });
}

async function initDB(req, res) {
  let adminPool;
  let client; // Client from the admin pool

  // These should ideally come from environment variables or a secure config
  const newDbName = process.env.DB_NAME || "evangadi_forum";
  const newDbUser = process.env.DB_USER || "evangadi_admin";
  const newDbPassword = process.env.DB_PASSWORD || "123456";

  try {
    adminPool = await getAdminPool();
    client = await adminPool.connect();

    // 1. Create database if it doesn't exist
    const dbExistsResult = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [newDbName]
    );

    if (dbExistsResult.rowCount === 0) {
      await client.query(`CREATE DATABASE ${newDbName}`); // Note: Database name cannot be parameterized directly
      console.log(`Database ${newDbName} created.`);
    } else {
      console.log(`Database ${newDbName} already exists.`);
    }

    // 2. Create user (role) if it doesn't exist
    const userExistsResult = await client.query(
      "SELECT 1 FROM pg_roles WHERE rolname = $1",
      [newDbUser]
    );

    if (userExistsResult.rowCount === 0) {
      // Use a parameterized query for the password
      await client.query(`CREATE USER ${newDbUser} WITH PASSWORD $1`, [newDbPassword]); // User name cannot be parameterized
      console.log(`User ${newDbUser} created.`);
    } else {
      console.log(`User ${newDbUser} already exists.`);
      // Optionally, update password if user exists:
      // await client.query(`ALTER USER ${newDbUser} WITH PASSWORD $1`, [newDbPassword]);
      // console.log(`Password for user ${newDbUser} updated.`);
    }

    // 3. Grant privileges on the new database to the new user
    // Note: Must be connected to the *newly created database* to grant schema-level privileges effectively,
    // or grant connect and then grant schema privileges.
    // For simplicity here, granting all on the database.
    await client.query(`GRANT ALL PRIVILEGES ON DATABASE ${newDbName} TO ${newDbUser}`);
    console.log(`All privileges on database ${newDbName} granted to ${newDbUser}.`);
    
    // If you need to grant usage on schema or specific table privileges, you'd connect to the newDbName
    // and then issue those GRANT commands. E.g., GRANT USAGE ON SCHEMA public TO newDbUser;
    // GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO newDbUser;

    res.send("Database and user setup for PostgreSQL completed (or already existed).");
  } catch (err) {
    console.error("Error initializing PostgreSQL database/user:", err);
    // Check for specific PostgreSQL error codes if needed
    if (err.code === '42P04') { // duplicate_database
        res.status(409).send(`Database ${newDbName} already exists. ${err.message}`);
    } else if (err.code === '42710') { // duplicate_object (for role)
        res.status(409).send(`User/Role ${newDbUser} already exists. ${err.message}`);
    } else if (err.code === '28P01') { // invalid_password (authentication failure for adminPool)
        res.status(401).send(`Authentication failed for admin user. Check PGADMIN credentials. ${err.message}`);
    } else {
        res.status(500).send("Error initializing PostgreSQL database/user: " + err.message);
    }
  } finally {
    if (client) {
      client.release(); // Release client back to the pool
    }
    if (adminPool) {
      await adminPool.end(); // Close the admin pool
    }
  }
}

module.exports = { initDB };





