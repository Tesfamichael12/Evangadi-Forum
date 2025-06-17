const express = require("express");
const router = express.Router();
const { alterAllTables } = require("../controller/alterTablesController");

// WARNING: TEMPORARY AND DANGEROUS ENDPOINT.
// DELETE THIS ROUTE FILE AND THE CONTROLLER (alterTablesController.js) IMMEDIATELY AFTER USE.
// Accessing this endpoint will attempt to alter your database table schemas.
router.get("/execute-temporary-alter-commands-now", alterAllTables);

module.exports = router;
