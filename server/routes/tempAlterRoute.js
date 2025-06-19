const express = require("express");
const router = express.Router();
const { alterAllTables } = require("../controller/alterTablesController");

router.get("/alter-tables", alterAllTables);

module.exports = router;
