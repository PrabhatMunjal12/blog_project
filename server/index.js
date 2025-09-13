import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";
import multer from "multer";
import 'dotenv/config'


const app = express();
const PORT = process.env.PORT || 9000;

connectToMongo();

const allowedOrigins = [
  "http://localhost:3000", // React local dev
  "https://blog-project-1-5ih2.onrender.com", // deployed React on Render
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies/authorization headers
}));


app.use(express.json());
app.use(express.static("public/upload"));
// app.use("/uploads", express.static("uploads"));



app.get("/", (req, res) => {
    res.send("API is running..");
});

//api Routes
app.use("/api/v1", authRoutes);

app.listen(PORT, () => {
    console.log(`API is running on http://localhost:${PORT}`);
});
