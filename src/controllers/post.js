/* --- controller for "post" model --- */

// import Post Schema
const Post = require("../models/post");

// create a Create Post Controller (Create Operation)
// the process will take time; hence async / await
const createPost = async (req, res) => {
  // destructure the body of req
  // req.body needed because the server needs user input to start this api call
  const { title, author, description, likes, comments } = req.body; // the fields should be from "Post" schema

  try {
    const post = await Post.create({
      title,
      author,
      description,
      likes,
      comments,
    });

    res.status(200).json(post); // 200 = OK status code
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all the post (Read Operation)
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      count: posts.length,
      posts,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a single post (Read Operation)
const getPost = async(req, res) => {
    const {id} = req.params;

    try {
        const post = await Post.findById({_id: id});

        if(!post) return res.status(404).json({error: "No post found"});

        res.status(200).json(post);
    } catch(error) {
        res.status(400).json({error: error.message});
    }
}

// update a post (Update Operation)
const updatePost = async(req, res) => {
    const {id} = req.params;

    try {
        const post = await Post.findByIdAndUpdate(
            {_id: id},
            {...req.body},
            // runValidators ensures that the data being passed aligns with the model schema
            {new: true, runValidators: true}
        );

        if (!post) {
            return res.status(404).json({
                error: "No matching post found!"
            });
        };

        res.status(200).json({
            message: "The post has been successfully updated.",
            post
        })
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

// delete a single post (Delete operation)
const deletePost = async(req, res) => {
    const {id} = req.params;

    try {
        const post = await Post.findByIdAndDelete({_id: id});

        if (!post) {
            return res.status(404).json({
                error: "No matching post found!"
            })
        }
        res.status(200).json({message: "The post has been successfully deleted!"});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


module.exports = { 
    createPost, 
    getAllPosts,
    getPost,
    updatePost,
    deletePost };
