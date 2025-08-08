// import express from "express";
// import cors from "cors";
// import path from "path";
// import { fileURLToPath } from "url";
// import cookieParser from "cookie-parser";

// import authRoute from "./routes/authRoutes.js";
// import userRoute from "./routes/userRoutes.js";
// import postRoute from "./routes/postsRoutes.js";
// import categoryRoute from "./routes/categoriesRoutes.js";
// import commentRoute from "./routes/commentsRoutes.js";
// import { connectDB } from "./config/db.js";

// const app = express();

// // Get __dirname in ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(express.json({limit: '10mb'}));

// app.use(cookieParser());
// // CORS options
// const corsOptions = {
//   origin: [ "http://localhost:3000",
//     'http://localhost:3000',  
//     'http://localhost:5173',  
//     'http://127.0.0.1:5173','https://social-blogging-app-rouge.vercel.app'

//   ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization','Cookie']
// };
// app.use(cors(corsOptions));

// // Static files
// app.use(express.static(path.join(__dirname, "public")));

// // Database connection
// // connectDB();
// // Routes
// console.log("✅ Mounting auth route...");
// app.get("/", (req, res) => {
//   res.send("🚀 API is running!");
//   console.log("Wagwan Wadau");
// });
// app.use("/api/auth", authRoute);
// app.use("/api/users", userRoute);
// app.use("/api/posts", postRoute);
// app.use("/api/categories", categoryRoute);
// app.use("/api/comments", commentRoute);

// app.use("/uploads", express.static("public/uploads"));


// const startServer = async () => {
//   try {
//     await connectDB(); // Wait for DB connection
//     const PORT = process.env.PORT || 8080;
//     app.listen(PORT, () => {
//       console.log(`✅ Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("❌ Failed to connect to database:", error);
//     process.exit(1); // Exit the process with failure
//   }
// };

// startServer();

import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import authRoute from "./routes/authRoutes.js";
import userRoute from "./routes/userRoutes.js";
import postRoute from "./routes/postsRoutes.js";
import categoryRoute from "./routes/categoriesRoutes.js";
import commentRoute from "./routes/commentsRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json({ limit: '10mb' })); // Add size limit for large content
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());

// CORS options
const corsOptions = {
  origin: [ 
    "http://localhost:3000",
    'http://localhost:5173',  
    'http://127.0.0.1:5173',
    'https://social-blogging-app-rouge.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization','Cookie']
};
app.use(cors(corsOptions));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static("public/uploads"));

// Routes
app.get("/", (req, res) => {
  res.send("🚀 API is running!");
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/comments", commentRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

const startServer = async () => {
  try {
    await connectDB(); // Make sure this is uncommented!
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();