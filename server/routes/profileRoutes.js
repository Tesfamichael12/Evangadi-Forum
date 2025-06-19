const express = require("express");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controller/profileController");

router.get("/:user_id", getProfile);
router.put("/:user_id", updateProfile);
router.delete("/:user_id", deleteProfile);

module.exports = router;
