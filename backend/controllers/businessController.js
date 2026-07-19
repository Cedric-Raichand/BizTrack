const Business = require("../models/Business");

const createBusiness = async (req, res) => {
  try {
    const { businessName, category, description, location } = req.body;

    const business = await Business.create({
      owner: req.user.id,
      businessName,
      category,
      description,
      location,
    });

    res.status(201).json({
      message: "Business created successfully",
      business,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBusiness = async (req, res) => {
  try {
    const business = await Business.findOne({
      owner: req.user.id,
    });

    res.json(business);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBusiness,
  getBusiness,
};