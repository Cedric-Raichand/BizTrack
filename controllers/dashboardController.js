const Transaction = require("../models/Transaction");
const Business = require("../models/Business");


const getDashboard = async (req, res) => {

  try {

    // Find user's business
    const business = await Business.findOne({
      owner: req.user.id
    });


    if (!business) {
      return res.status(404).json({
        message: "Business not found"
      });
    }


    // Get all transactions
    const transactions = await Transaction.find({
      business: business._id
    });


    let totalIncome = 0;
    let totalExpenses = 0;


    transactions.forEach((transaction) => {

      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      }

      if (transaction.type === "expense") {
        totalExpenses += transaction.amount;
      }

    });


    const profit = totalIncome - totalExpenses;


    res.json({
      totalIncome,
      totalExpenses,
      profit,
      transactionCount: transactions.length
    });


  } catch(error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = getDashboard;