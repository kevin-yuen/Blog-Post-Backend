// import the Express
const express = require("express");
const router = express.Router();
const { 
    createPost,
    getAllPosts,
    getPost,
    updatePost,
    deletePost
} = require("../controllers/post");
const {authMiddleware} = require("../middleware/authMiddleware");

// create Router
router.post("/", authMiddleware, createPost);
router.get("/", getAllPosts);
router.get("/:id", getPost);
router.patch("/:id", authMiddleware, updatePost);
router.delete("/:id/delete", authMiddleware, deletePost);

module.exports = router;
