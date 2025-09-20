// import express from "express";
// import cors from "cors";
// import connectToMongo from "./config/db.js";
// import authRoutes from "./routes/blog.js";
// import multer from "multer";
// import 'dotenv/config'

// const app = express();
// const PORT = process.env.PORT || 9000;

// connectToMongo();
// app.use(cors());


// app.use(express.json());
// app.use(express.static("public/upload"));

// app.get("/", (req, res) => {
//     res.send("API is running..");
// });

// // API Routes
// app.use("/api/v1", authRoutes);

// app.listen(PORT, () => {
//     console.log(`API is running on http://localhost:${PORT}`);
// });


import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";
import multer from "multer";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 9000;

// ✅ Connect to Mongo
connectToMongo();

// ✅ Set your frontend URL
const frontendURL = "https://blog-project-1-5ih2.onrender.com";

// ✅ CORS setup
app.use(cors({
    origin: frontendURL,           // exact frontend URL
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true              // allow cookies/auth headers
}));

// ✅ Handle preflight OPTIONS requests explicitly
app.options("*", cors({
    origin: frontendURL,
    credentials: true
}));

// ✅ Body parser
app.use(express.json());

// ✅ Serve uploaded files
app.use(express.static("public/upload"));

// ✅ Test route
app.get("/", (req, res) => {
    res.send("API is running..");
});

// ✅ API Routes
app.use("/api/v1", authRoutes);

// ✅ Start server
app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
