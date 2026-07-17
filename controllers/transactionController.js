const Transaction = require("../models/Transaction");
const Business = require("../models/Business");


// Add transaction
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


  } catch(error){

    res.status(500).json({
      message:error.message,
    });

  }

};



// Get all transactions
const getTransactions = async (req, res) => {

  try {

    const business = await Business.findOne({
      owner: req.user.id
    });


    if (!business) {
      return res.status(404).json({
        message: "Business not found"
      });
    }


    const { type, page = 1, limit = 10 } = req.query;


    let filter = {
      business: business._id
    };


    // Filter income or expense
    if (type) {
      filter.type = type;
    }


    const transactions = await Transaction.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));


    const total = await Transaction.countDocuments(filter);


    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      transactions
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};
//Get single transaction
const mongoose = require("mongoose");
const getTransactionById = async (req, res) => {

  try {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        message: "Invalid transaction ID"
      });
    }


    const transaction = await Transaction.findById(req.params.id);


    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }


    res.json(transaction);


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};
//Update transaction
const updateTransaction = async (req, res) => {

  try {

    const transaction = await Transaction.findById(req.params.id);


    if (!transaction) {
      return res.status(404).json({
        message:"Transaction not found"
      });
    }


    const updatedTransaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new:true
        }
      );


    res.json({
      message:"Transaction updated successfully",
      transaction: updatedTransaction
    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};

//Delete transaction
const deleteTransaction = async (req,res)=>{

  try{

    const transaction =
      await Transaction.findById(req.params.id);


    if(!transaction){
      return res.status(404).json({
        message:"Transaction not found"
      });
    }


    await transaction.deleteOne();


    res.json({
      message:"Transaction deleted successfully"
    });


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};






module.exports = {
  addTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction
};