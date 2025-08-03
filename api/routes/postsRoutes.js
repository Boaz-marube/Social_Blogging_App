import express from "express";

import {
  createPost,
  deletePost,
  getAllPost,
  getPost,
  updatePost,
  likePost,
  checkUserLike,
} from "../controllers/postController.js";
import { uploadCoverImage } from "../middleware/uploadMiddleware.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

// CREATE POST
router.post("/", uploadCoverImage, verifyToken, createPost);
// UPDATE POST
router.put("/:id", uploadCoverImage, updatePost);
// DELETE POST
router.delete("/:id", deletePost);
// GET POST
router.get("/:id", getPost);
// GET ALL POSTS
router.get("/", getAllPost);
router.post("/:id/like", likePost);
router.get("/:id/check-like", checkUserLike);
export default router;
