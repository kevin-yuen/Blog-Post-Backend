// post.js

// import mongoose
const mongoose = require("mongoose");

// create a schema model
const postSchema = new mongoose.Schema({
    title: { type: String, required: true},  // "required: true" = title field is mandatory
    author: { type: String, required: true},
    description: {type: String, required: true},
    likes: {type: Number, required: true},
    comments: [{body: String}]
});

const Post = mongoose.model("Post", postSchema);    // "Post" will be the name of the collection

// Export the Post Model
module.exports = Post;