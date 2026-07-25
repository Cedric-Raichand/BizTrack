const express = require("express");

const router = express.Router();


const {
  createBusiness,
  getBusiness,
  getBusinesses,
} = require("../controllers/businessController");


const protect = require("../middleware/authMiddleware");



// Create business

router.post(
  "/",
  protect,
  createBusiness
);




// Get all businesses

router.get(
  "/all",
  protect,
  getBusinesses
);




// Get single/default business (keep for now)

router.get(
  "/",
  protect,
  getBusiness
);



module.exports = router;