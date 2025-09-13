// import express from "express";
// import cors from "cors";
// import connectToMongo from "./config/db.js";
// import authRoutes from "./routes/blog.js";
// import multer from "multer";
// import 'dotenv/config'


// const app = express();
// const PORT = process.env.PORT || 9000;

// connectToMongo();

// // app.use(cors());
// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://blog-project-1-5ih2.onrender.com",
// ];

// // ✅ CORS middleware (applied before routes)
// app.use((req, res, next) => {
//   const origin = req.headers.origin;
//   // Only set header if origin exists and is allowed
//   if (origin && allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }

//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET,POST,PUT,DELETE,OPTIONS"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Content-Type, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", "true");

//   // Handle preflight requests
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(204); // No Content
//   }

//   next();
// });



// app.use(express.json());
// app.use(express.static("public/upload"));
// // app.use("/uploads", express.static("uploads"));



// app.get("/", (req, res) => {
//     res.send("API is running..");
// });

// //api Routes
// app.use("/api/v1", authRoutes);

// app.listen(PORT, () => {
//     console.log(`API is running on http://localhost:${PORT}`);
// });

import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import apiRoutes from "./routes/blog.js"; // your combined router
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 9000;

// Connect to MongoDB
connectToMongo();

// ✅ CORS setup
const allowedOrigins = [
  "http://localhost:3000",
  "https://blog-project-1-5ih2.onrender.com",
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploads
app.use("/public/upload", express.static("public/upload"));

// Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use API routes
app.use("/api/v1", apiRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`API is running on http://localhost:${PORT}`);
});
