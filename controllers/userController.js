const User = require("../models/userModel");


exports.getAllUsers=async (req, res) => {
    try {
      const userId = req.body.userId;
      const users = await User.find({ _id: { $ne: userId } });  
      return res.status(200).send({
        success: true,
        message: "All users list",
        users,
      });
    } catch (err) {
      return res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  }