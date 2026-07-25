const Transaction = require("../models/Transaction");
const Business = require("../models/Business");
const mongoose = require("mongoose");




// Add transaction

const addTransaction = async (req, res) => {

  try {

    const {
      businessId,
      type,
      title,
      amount,
      category,
      description
    } = req.body;



    if (
      !businessId ||
      !type ||
      !title ||
      !amount ||
      !category
    ) {

      return res.status(400).json({

        message:
        "Business, type, title, amount and category are required"

      });

    }




    if (
      !["income", "expense"].includes(type)
    ) {

      return res.status(400).json({

        message:
        "Transaction type must be income or expense"

      });

    }




    if(Number(amount) <= 0){

      return res.status(400).json({

        message:
        "Amount must be greater than zero"

      });

    }





    const business = await Business.findOne({

      _id: businessId,

      owner:req.user.id

    });





    if(!business){

      return res.status(404).json({

        message:"Business not found"

      });

    }





    const transaction = await Transaction.create({

      business:business._id,

      type,

      title:title.trim(),

      amount:Number(amount),

      category:category.trim(),

      description:
      description ? description.trim() : ""

    });





    res.status(201).json({

      message:"Transaction added successfully",

      transaction

    });





  }catch(error){

    res.status(500).json({

      message:error.message

    });

  }

};









// Get all transactions

const getTransactions = async(req,res)=>{

try{


const {

businessId,

type,

period,

page=1,

limit=10

}=req.query;





if(!businessId){

return res.status(400).json({

message:"Business ID is required"

});

}





const business = await Business.findOne({

_id:businessId,

owner:req.user.id

});





if(!business){

return res.status(404).json({

message:"Business not found"

});

}





let filter={

business:businessId

};





if(type){

filter.type=type;

}





const now=new Date();





if(period==="today"){

const start=new Date(now);

start.setHours(0,0,0,0);


filter.createdAt={

$gte:start

};

}





if(period==="month"){


filter.createdAt={

$gte:new Date(

now.getFullYear(),

now.getMonth(),

1

)

};


}





if(period==="year"){


filter.createdAt={

$gte:new Date(

now.getFullYear(),

0,

1

)

};


}







const transactions = await Transaction.find(filter)

.sort({

createdAt:-1

})

.skip((page-1)*Number(limit))

.limit(Number(limit));





const total =
await Transaction.countDocuments(filter);





res.json({

total,

page:Number(page),

pages:Math.ceil(total/Number(limit)),

transactions

});





}catch(error){

res.status(500).json({

message:error.message

});

}


};









// Get single transaction

const getTransactionById = async(req,res)=>{

try{


if(
!mongoose.Types.ObjectId.isValid(req.params.id)
){

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





const business = await Business.findOne({

_id:transaction.business,

owner:req.user.id

});





if(!business){

return res.status(403).json({

message:"Not authorized"

});

}





res.json(transaction);





}catch(error){

res.status(500).json({

message:error.message

});

}


};









// Update transaction

const updateTransaction = async(req,res)=>{

try{


const {

type,

title,

amount,

category,

description

}=req.body;





if(
type &&
!["income","expense"].includes(type)

){

return res.status(400).json({

message:
"Transaction type must be income or expense"

});

}





if(
amount &&
Number(amount)<=0

){

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





const business = await Business.findOne({

_id:transaction.business,

owner:req.user.id

});





if(!business){

return res.status(403).json({

message:"Not authorized"

});

}





const updatedTransaction =
await Transaction.findByIdAndUpdate(

req.params.id,

{


type:type || transaction.type,


title:title
?
title.trim()
:
transaction.title,



amount:amount
?
Number(amount)
:
transaction.amount,



category:category
?
category.trim()
:
transaction.category,



description:description
?
description.trim()
:
transaction.description


},


{
new:true
}

);






res.json({

message:"Transaction updated successfully",

transaction:updatedTransaction

});





}catch(error){

res.status(500).json({

message:error.message

});

}


};









// Delete transaction

const deleteTransaction = async(req,res)=>{

try{


const transaction =
await Transaction.findById(req.params.id);





if(!transaction){

return res.status(404).json({

message:"Transaction not found"

});

}





const business = await Business.findOne({

_id:transaction.business,

owner:req.user.id

});





if(!business){

return res.status(403).json({

message:"Not authorized"

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