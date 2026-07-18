const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
 addTransaction,
 getTransactions,
 getTransactionById,
 updateTransaction,
 deleteTransaction
} = require("../controllers/transactionController");


const router = express.Router();


router.post("/", protect, addTransaction);

router.get("/", protect, getTransactions);

router.get("/:id", protect, getTransactionById);

router.put("/:id", protect, updateTransaction);

router.delete("/:id", protect, deleteTransaction);


module.exports = router;