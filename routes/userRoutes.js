const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { protectedRoute } = require("../middleware/authMiddleware");
const { getAllUsers } = require("../controllers/userController");

//update user
router.put("/:id", async (req, res) => {
  const userId = req.params.id;
  const requestBody = req.body;

  try {
    if (requestBody.userId !== userId || requestBody.isAdmin) {
      return res.status(403).send({
        success: false,
        message: "You can only update your own account!",
      });
    }

    if (requestBody.password) {
      const salt = await bcrypt.genSalt(10);
      requestBody.password = await bcrypt.hash(requestBody.password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(userId, { $set: requestBody });

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Account has been updated",
    });
  } catch (err) {
    console.error("Error updating account:", err);
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});


//delete user
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.post("/user", async (req, res) => { 
  const { id } = req.body;
  try {
    const user = await User.findById(id).populate({
      path: 'friends',
      options: { strictPopulate: false }
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const { password, updatedAt, ...other } = user._doc;
    return res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user: other,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});


//get all friends
router.get("/friends", protectedRoute, async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const friends = await Promise.all(
      user?.friends.map((friendId) => {
        return User.findById(friendId);
      })
    );

    const friendList = friends.map((friend) => {
      const { _id, username, profilePic } = friend;
      return { _id, username, profilePic };
    });

    return res.status(200).send({
      success: true,
      message: "Friend list retrieved successfully",
      friends: friendList,
    });
  } catch (err) {
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

//follow a user

router.put("/:id/follow", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user || !currentUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user._id.equals(currentUser._id)) {
      return res.status(403).json({ success: false, message: "You can't add yourself as a friend" });
    }
    if (currentUser.friends.includes(user._id)) {
      return res.status(403).json({ success: false, message: "This user is already your friend" });
    }
    await currentUser.updateOne({ $push: { friends: user._id } });
    res.status(200).json({ success: true, message: "User has been added to your friends list" });
  } catch (err) {
    console.error("Error adding user to friends list:", err);
    res.status(500).json({ success: false, message: "Failed to add user to friends list. Please try again later." });
  }
});



//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!user || !currentUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (user._id.equals(currentUser._id)) {
      return res.status(403).json({ success: false, message: "You can't unfollow yourself" });
    }
    if (!currentUser.friends.includes(user._id)) {
      return res.status(403).json({ success: false, message: "You don't follow this user" });
    }
    await currentUser.updateOne({ $pull: { friends: user._id } });
    res.status(200).json({ success: true, message: "User has been unfollowed" });
  } catch (err) {
    console.error("Error unfollowing user:", err);
    res.status(500).json({ success: false, message: "Failed to unfollow user. Please try again later." });
  }
});


//get All users
router.get("/allusers",protectedRoute, getAllUsers );

module.exports = router;