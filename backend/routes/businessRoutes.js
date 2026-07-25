const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");


const {

createBusiness,

getBusiness,

getBusinesses

}=require("../controllers/businessController");



router.post(
"/",
protect,
createBusiness
);



router.get(
"/",
protect,
getBusiness
);



router.get(
"/all",
protect,
getBusinesses
);



module.exports = router;