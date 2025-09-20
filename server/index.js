import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";
import multer from "multer";
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 9000;

connectToMongo();

// Configure CORS
app.use(
  cors({
    origin: "https://blog-project-1-5ih2.onrender.com", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors()); // allow preflight requests for all routes

app.use(express.json());
app.use(express.static("public/upload"));

app.get("/", (req, res) => {
    res.send("API is running..");
});

// API Routes
app.use("/api/v1", authRoutes);

app.listen(PORT, () => {
    console.log(`✅ API is running on http://localhost:${PORT}`);
});


