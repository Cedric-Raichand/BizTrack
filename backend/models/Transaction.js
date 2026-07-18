const mongoose = require("mongoose");


const transactionSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },


    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },


    title: {
      type: String,
      required: true,
      trim: true,
    },


    amount: {
      type: Number,
      required: true,
    },


    category: {
      type: String,
      required: true,
    },


    description: {
      type: String,
      default: "",
    },


    date: {
      type: Date,
      default: Date.now,
    },

  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Transaction", transactionSchema);