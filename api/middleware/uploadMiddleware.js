// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/uploads/"); // Store images here
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     const ext = path.extname(file.originalname);
//     cb(null, `post-${uniqueSuffix}${ext}`); // e.g., post-1234567890.jpg
//   },
// });

// // 👇 Modified to ensure proper form-data parsing
// const upload = multer({
//   storage,
//   fileFilter: (req, file, cb) => {
//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
//     if (allowedTypes.includes(file.mimetype)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only JPEG, PNG, or WebP images are allowed"), false);
//     }
//   },
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB limit
//     fields: 10, // Allow up to 10 non-file fields
//     parts: 20, // Allow up to 20 parts (files + fields)
//   },
// });

// // 👇 Export both single-file and any-file handlers for flexibility
// export const uploadCoverImage = upload.single("coverImage");
// export const uploadAnyFiles = upload.any(); // Alternative for multiple files

import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadPath = "public/uploads";
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Configure storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Save files to public/uploads/
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `post-${uniqueSuffix}${ext}`);
  },
});

// Allowed image types
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

const fileFilter = (req, file, cb) => {
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, PNG, or WebP images are allowed"), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size: 5MB
    fields: 10,
    parts: 20,
  },
});

// Export middlewares
export const uploadCoverImage = upload.single("coverImage"); // For single image upload
export const uploadAnyFiles = upload.any(); // For handling multiple files
