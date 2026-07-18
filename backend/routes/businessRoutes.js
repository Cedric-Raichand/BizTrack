const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
  createBusiness,
  getMyBusiness,
} = require("../controllers/businessController");


const router = express.Router();


router.post("/", protect, createBusiness);

router.get("/", protect, getMyBusiness);


module.exports = router;