import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
    }
});

const categoryModel = new mongoose.model("categories", categorySchema);

export default categoryModel;