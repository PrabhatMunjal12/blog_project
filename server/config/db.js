// import mongoose from "mongoose";
// const connectToMongo = async () => {
//     const res = await mongoose.connect("mongodb://localhost:27017/blog-mern-project");
//     if (res) {
//         console.log("connected successfully");
//     }
// };
// export default connectToMongo;
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// dotenv.config();

// const connectToMongo = async () => {
//     try {
//         const uri = process.env.MONGO_URI_CLOUD;

//         console.log("Trying Mongo URI:", uri || "Not defined");

//         await mongoose.connect(uri);
//         console.log("MongoDB connected successfully");
//     } catch (err) {
//         console.error("MongoDB connection failed:", err.message);
//         process.exit(1);
//     }
// };

// export default connectToMongo;
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectToMongo = async () => {
    try {
        const uri = process.env.MONGO_URI_CLOUD;

        if (!uri) {
            throw new Error("MONGO_URI_CLOUD is not defined in .env");
        }

        console.log("Trying Mongo URI:", uri);

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000, // avoid infinite waiting
        });

        console.log("MongoDB connected successfully");
    } catch (err) {
        console.error("MongoDB connection failed:", err.message);
        process.exit(1);
    }
};

// Optional: log connection events
mongoose.connection.on("error", (err) => {
    console.error("Mongoose connection error:", err);
});
mongoose.connection.on("disconnected", () => {
    console.warn("Mongoose disconnected");
});

export default connectToMongo;

