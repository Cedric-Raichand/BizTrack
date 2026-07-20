const Transaction = require("../models/Transaction");
const Business = require("../models/Business");
const mongoose = require("mongoose");


// Add Transaction

const addTransaction = async (req, res) => {
  try {
    const { type, title, amount, category, description } = req.body;

    // Find user's business
    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        message: "Create a business first",
      });
    }

    const transaction = await Transaction.create({
      business: business._id,
      type,
      title,
      amount,
      category,
      description,
    });

    res.status(201).json({
      message: "Transaction added successfully",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get All Transactions

const getTransactions = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        message: "Business not found",
      });
    }

    const { type, page = 1, limit = 10 } = req.query;

    let filter = {
      business: business._id,
    };

    if (type) {
      filter.type = type;
    }

    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const total = await Transaction.countDocuments(filter);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      transactions,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Get Single Transaction

const getTransactionById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid transaction ID",
      });
    }

    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        message: "Business not found",
      });
    }

    const transaction = await Transaction.findOne({
      _id: req.params.id,
      business: business._id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Update Transaction

const updateTransaction = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        message: "Business not found",
      });
    }

    const transaction = await Transaction.findOne({
      _id: req.params.id,
      business: business._id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    transaction.type = req.body.type || transaction.type;
    transaction.title = req.body.title || transaction.title;
    transaction.amount = req.body.amount || transaction.amount;
    transaction.category = req.body.category || transaction.category;
    transaction.description =
      req.body.description || transaction.description;

    await transaction.save();

    res.json({
      message: "Transaction updated successfully",
      transaction,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// Delete Transaction

const deleteTransaction = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    });

    if (!business) {
      return res.status(404).json({
        message: "Business not found",
      });
    }

    const transaction = await Transaction.findOne({
      _id: req.params.id,
      business: business._id,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    await transaction.deleteOne();

    res.json({
      message: "Transaction deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};