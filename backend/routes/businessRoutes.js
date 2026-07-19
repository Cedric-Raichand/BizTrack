const express = require("express");
const router = express.Router();

const {
  createBusiness,
  getBusiness,
} = require("../controllers/businessController");

const protect = require("../middleware/authMiddleware");

router.post("/", protect, createBusiness);

router.get("/", protect, getBusiness);

module.exports = router;