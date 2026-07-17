const registerUser = async (req, res) => {
  res.json({
    message: "Register user route",
  });
};

const loginUser = async (req, res) => {
  res.json({
    message: "Login user route",
  });
};

module.exports = {
  registerUser,
  loginUser,
};