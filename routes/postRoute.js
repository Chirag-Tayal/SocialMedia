const router = require("express").Router();

const Post = require("../models/postMOdel");
const User = require("../models/userModel");

//create a post

router.post("/", async (req, res) => {
  console.log(req.body);
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).send({message:"Post created succesfully", success: true});
  } catch (err) {
    return res
    .status(500)
    .send({success: false, message: err.message});
  }
});
//update a post

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//delete a post

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//like / dislike a post

router.put("/:id/like", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).send({
        success: false,
        message: "Post not found",
      });
    }

    const isAlreadyLiked = post.likes.includes(req.body.userId);
    const update = isAlreadyLiked ? { $pull: { likes: req.body.userId } } : { $push: { likes: req.body.userId } };
    const updatedPost = await post.updateOne(update);

    const message = isAlreadyLiked ? "The post has been disliked" : "The post has been liked";
    return res.status(200).send({
      success: true,
      message,
    });
  } catch (err) {
    console.error("Error liking/disliking post:", err);
    return res.status(500).send({
      success: false,
      message: err.message,
    });
  }
});

//get a post

router.get("/:id", async (req, res) => {
  console.log('oay');
  console.log(req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts

router.get("/timeline/:userId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's all posts

router.get("/all-posts/:username", async (req, res) => {
   try {
     const user = await User.findOne({ username: req.params.username });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
 

    const posts = await Post.find({ userId: user?._id });
    return res.status(200).send({
      posts : posts,
      success: true,
      message: "All posts of a user retrieved successfully",
    });
  } catch (err) {
    console.error("Error retrieving posts:", err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
});
// Get all the posts till now
router.get("/all/posts", async (req, res) => {
  try { 
    const posts = await Post.find();
    return res.status(200).send({
      posts: posts,
      success: true,
      message: "All posts till now",
    });
  } catch (err) {
    console.error("Error retrieving posts:", err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
});

// Get today's top 10 posts
router.get("/top/ten", async (req, res) => {
  try {  
    const posts = await Post.find().limit(10).sort({ createdAt: -1 });
    return res.status(200).send({
      posts: posts,
      success: true,
      message: "Today's top 10 posts",
    });
  } catch (err) {
    console.error("Error retrieving posts:", err);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
});

module.exports = router;