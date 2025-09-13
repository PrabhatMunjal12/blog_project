import express from "express";
import AuthController from "../controllers/authController.js";
import BlogController from "../controllers/blogController.js";
import CategoryController from "../controllers/categoryController.js";
import multer from "multer";
import checkIsUserAuthenticated from "../middlewares/authMiddleware.js";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, `public/upload/`);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post("/user/register", AuthController.userRegistration);
router.post("/user/login", AuthController.userLogin);
router.post("/forget/password", AuthController.forgetPassword);

// Protected Routes

router.get("/get/allblogs", checkIsUserAuthenticated, BlogController.getAllBlogs);
router.post("/add/blog", upload.single("thumbnail"), checkIsUserAuthenticated, BlogController.addNewBlog);
router.get("/get/blog/:id", checkIsUserAuthenticated, BlogController.getSingleBlog);
router.delete("/delete/blog/:id", checkIsUserAuthenticated, BlogController.deleteBlog);
router.get("/get/all/myblogs", checkIsUserAuthenticated, BlogController.getAllMyBlogs);

router.get("/get/categories", checkIsUserAuthenticated, CategoryController.getAllCategories);
router.post("/add/category", checkIsUserAuthenticated, CategoryController.addNewCategory);

export default router;




