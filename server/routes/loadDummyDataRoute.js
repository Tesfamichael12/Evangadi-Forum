const express = require("express");
const { loadDummyData } = require("../controller/loadDummyDataController");

const loadDummyDataRouter = express.Router();

// It's generally a POST request as it changes the state of the database
loadDummyDataRouter.post("/load-dummy-data", loadDummyData);

module.exports = loadDummyDataRouter;
