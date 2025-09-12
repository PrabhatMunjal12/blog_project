import blogModel from "../models/blogModel.js";
class BlogController {
    static getAllBlogs = async (req, res) => {
        try {
            // user: req.user._id 
            const fetchAllBlogs = await blogModel.find({});
            return res.status(200).json({ fetchAllBlogs });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };

    static getAllMyBlogs = async (req, res) => {
        try {
            const fetchAllMyBlogs = await blogModel.find({ user: req.user._id });
            return res.status(200).json({ fetchAllMyBlogs });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    static addNewBlog = async (req, res) => {
        const { title, category, description } = req.body;
        try {
            if (title && category && description) {
                const addBlog = new blogModel({
                    title: title,
                    description: description,
                    category: category,
                    thumbnail: req.file.filename,
                    user: req.user._id,
                });
                const savedBlog = await addBlog.save();
                if (savedBlog) {
                    return res.status(200).json({
                        message: "Blog Added Successfully"
                    });
                }
            } else {
                return res.status(400).json({ message: "All Fields Required" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
    static getSingleBlog = async (req, res) => {
        const { id } = req.params;
        try {
            if (id) {
                const fetchBlogByID = await blogModel.findById(id);
                return res.status(200).json({ fetchBlogByID });
            } else {
                return res.status(400).json({ message: "Invalid URL" });
            }
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    };


    static deleteBlog = async (req, res) => {
        const { id } = req.params;
        try {
            if (!id) {
                return res.status(400).json({ message: "Invalid URL" });
            }
            const deletedBlog = await blogModel.findByIdAndDelete(id);
            if (!deletedBlog) {
                return res.status(404).json({ message: "Blog not found" });
            }
            return res.status(200).json({ message: "Blog deleted successfully" });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

export default BlogController;