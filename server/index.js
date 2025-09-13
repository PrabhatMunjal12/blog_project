import express from "express";
import cors from "cors";
import connectToMongo from "./config/db.js";
import authRoutes from "./routes/blog.js";
import multer from "multer";
import 'dotenv/config'


const app = express();
const PORT = process.env.PORT || 9000;

connectToMongo();

app.use(cors({
  origin: "https://blog-project-1-5ih2.onrender.com", // your React frontend
  credentials: true, // allow cookies/headers if needed
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
