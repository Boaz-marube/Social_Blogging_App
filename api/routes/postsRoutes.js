// import express from "express";

// import {
//   createPost,
//   deletePost,
//   getAllPost,
//   getPost,
//   updatePost,
//   likePost,
//   checkUserLike,
// } from "../controllers/postController.js";
// import { uploadCoverImage } from "../middleware/uploadMiddleware.js";
// import { verifyToken } from "../middleware/verifyToken.js";
// const router = express.Router();

// // CREATE POST
// router.post("/", uploadCoverImage, verifyToken, createPost);
// // UPDATE POST
// router.put("/:id", uploadCoverImage, updatePost);
// // DELETE POST
// router.delete("/:id", deletePost);
// // GET POST
// router.get("/:id", getPost);
// // GET ALL POSTS
// router.get("/", getAllPost);
// router.post("/:id/like", verifyToken, likePost);
// router.get("/:id/check-like", verifyToken, checkUserLike);
// export default router;

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

// GET ALL POSTS (must be before /:id to avoid conflicts)
router.get("/", getAllPost);

// POST ROUTES (protected)
router.post("/", uploadCoverImage, verifyToken, createPost);
router.post("/:id/like", verifyToken, likePost);

// SPECIFIC GET ROUTES (before generic /:id)
router.get("/:id/check-like", verifyToken, checkUserLike);

// GENERIC GET ROUTE (after specific routes)
router.get("/:id", getPost);

// UPDATE POST (needs auth)
router.put("/:id", uploadCoverImage, verifyToken, updatePost);

// DELETE POST (needs auth)
router.delete("/:id", verifyToken, deletePost);

export default router;