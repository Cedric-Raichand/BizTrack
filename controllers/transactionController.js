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
const getTransactions = async(req,res)=>{

  try{

    const business = await Business.findOne({
      owner:req.user.id
    });


    const transactions = await Transaction.find({
      business:business._id
    }).sort({
      createdAt:-1
    });


    res.json(transactions);


  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};


module.exports={
  addTransaction,
  getTransactions,
};