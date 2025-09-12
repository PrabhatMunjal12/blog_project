import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        refe: "categories",
    },
    description: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refer: "users",
    },
});

const blogModel = new mongoose.model("blogs", blogSchema);
export default blogModel;