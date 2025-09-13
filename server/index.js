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
  "http://localhost:3000", // for local dev
  "https://blog-project-1-5ih2.onrender.com", // your deployed React app
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow no-origin requests (like Postman or server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

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
