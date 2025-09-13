// import express from "express";
// import AuthController from "../controllers/authController.js";
// import BlogController from "../controllers/blogController.js";
// import CategoryController from "../controllers/categoryController.js";
// import multer from "multer";
// import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, `public/upload/`);
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`);
//     },
// });

// const upload = multer({ storage: storage });

// const router = express.Router();

// router.post("/user/register", AuthController.userRegistration);
// router.post("/user/login", AuthController.userLogin);
// router.post("/forget/password", AuthController.forgetPassword);

// // Protected Routes

// router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlogs);
// router.post("/add/blog", upload.single("thumbnail"), checkIsUserAuthenticated, BlogController.addNewBlog);
// router.get("/get/blog/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);
// router.delete("/delete/blog/:id", checkIsUserAuthenticated, BlogController.deleteBlog);
// router.get("/get/all/myblogs", checkIsUserAuthenticated, BlogController.getAllMyBlogs);

// router.get("/get/categories", checkIsUserAuthenticated, CategoryController.getAllCategories);
// router.post("/add/category", checkIsUserAuthenticated, CategoryController.addNewCategory);

// export default router;



import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

dotenv.config();

const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/upload/`);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});
const upload = multer({ storage: storage });

// ------------------ Auth Routes ------------------
router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);
router.post("/forget/password", AuthController.forgetPassword);

// ------------------ Blog Routes (Protected) ------------------
router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlogs);
router.post("/add/blog", upload.single("thumbnail"), checkIsUserAuthenticated, BlogController.addNewBlog);
router.get("/get/blog/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);
router.delete("/delete/blog/:id", checkIsUserAuthenticated, BlogController.deleteBlog);
router.get("/get/all/myblogs", checkIsUserAuthenticated, BlogController.getAllMyBlogs);

// ------------------ Category Routes (Protected) ------------------
router.get("/get/categories", checkIsUserAuthenticated, CategoryController.getAllCategories);
router.post("/add/category", checkIsUserAuthenticated, CategoryController.addNewCategory);

// ------------------ Unsplash Image Route ------------------
router.get("/image/random", async (req, res) => {
    try {
        const query = req.query.query || "technology"; // default query
        const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

        if (!UNSPLASH_ACCESS_KEY) {
            return res.status(500).json({ message: "Unsplash API key not set" });
        }

        const response = await axios.get(
            "https://api.unsplash.com/photos/random",
            {
                params: { query, orientation: "landscape" },
                headers: { Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}` },
            }
        );

        // Send only the image URL to frontend
        res.json({ url: response.data.urls.full });
    } catch (err) {
        console.error("Unsplash fetch error:", err.message);
        res.status(500).json({ message: "Failed to fetch image" });
    }
});

export default router;
