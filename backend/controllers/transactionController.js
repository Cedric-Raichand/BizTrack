const Transaction = require("../models/Transaction");
const Business = require("../models/Business");
const mongoose = require("mongoose");


// Add transaction
const addTransaction = async (req, res) => {

  try {

    const {
      type,
      title,
      amount,
      category,
      description
    } = req.body;



    // Validation

    if (!type || !title || !amount || !category) {

      return res.status(400).json({
        message:
        "Type, title, amount and category are required"
      });

    }



    if (!["income", "expense"].includes(type)) {

      return res.status(400).json({
        message:
        "Transaction type must be income or expense"
      });

    }



    if (Number(amount) <= 0) {

      return res.status(400).json({
        message:
        "Amount must be greater than zero"
      });

    }




    // Find user's business

    const business = await Business.findOne({
      owner: req.user.id,
    });



    if (!business) {

      return res.status(404).json({
        message:
        "Create a business first"
      });

    }




    const transaction = await Transaction.create({

      business: business._id,

      type,

      title: title.trim(),

      amount: Number(amount),

      category: category.trim(),

      description:
        description ? description.trim() : "",

    });




    res.status(201).json({

      message:
      "Transaction added successfully",

      transaction,

    });



  } catch(error) {

    res.status(500).json({
      message:error.message
    });

  }

};





// Get all transactions

const getTransactions = async (req, res) => {

  try {


    const business = await Business.findOne({
      owner:req.user.id
    });



    if (!business) {

      return res.status(404).json({
        message:"Business not found"
      });

    }



    const {
      type,
      page = 1,
      limit = 10
    } = req.query;




    let filter = {

      business: business._id

    };




    if(type){

      filter.type = type;

    }




    const transactions = await Transaction.find(filter)

      .sort({
        createdAt:-1
      })

      .skip((page - 1) * limit)

      .limit(Number(limit));





    const total =
      await Transaction.countDocuments(filter);





    res.json({

      total,

      page:Number(page),

      pages:
      Math.ceil(total / limit),

      transactions

    });



  } catch(error) {

    res.status(500).json({
      message:error.message
    });

  }

};






// Get single transaction

const getTransactionById = async (req,res)=>{

  try {


    if(!mongoose.Types.ObjectId.isValid(req.params.id)){

      return res.status(400).json({

        message:"Invalid transaction ID"

      });

    }




    const transaction =
      await Transaction.findById(req.params.id);




    if(!transaction){

      return res.status(404).json({

        message:"Transaction not found"

      });

    }




    res.json(transaction);



  } catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};







// Update transaction

const updateTransaction = async (req,res)=>{

  try {


    const {
      type,
      title,
      amount,
      category,
      description
    } = req.body;




    if(type && !["income","expense"].includes(type)){

      return res.status(400).json({

        message:
        "Transaction type must be income or expense"

      });

    }




    if(amount && Number(amount) <= 0){

      return res.status(400).json({

        message:
        "Amount must be greater than zero"

      });

    }




    const transaction =
      await Transaction.findById(req.params.id);




    if(!transaction){

      return res.status(404).json({

        message:"Transaction not found"

      });

    }




    const updatedTransaction =
      await Transaction.findByIdAndUpdate(

        req.params.id,

        {

          type,

          title:
          title ? title.trim() : transaction.title,


          amount:
          amount ? Number(amount) : transaction.amount,


          category:
          category ? category.trim() : transaction.category,


          description:
          description ? description.trim() : transaction.description

        },

        {
          new:true
        }

      );





    res.json({

      message:
      "Transaction updated successfully",

      transaction:
      updatedTransaction

    });



  } catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};








// Delete transaction

const deleteTransaction = async (req,res)=>{

  try {


    const transaction =
      await Transaction.findById(req.params.id);




    if(!transaction){

      return res.status(404).json({

        message:
        "Transaction not found"

      });

    }




    await transaction.deleteOne();




    res.json({

      message:
      "Transaction deleted successfully"

    });



  } catch(error){

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