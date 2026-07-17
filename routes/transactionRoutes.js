const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
 addTransaction,
 getTransactions
} = require("../controllers/transactionController");


const router = express.Router();


router.post("/", protect, addTransaction);

router.get("/", protect, getTransactions);


module.exports = router;