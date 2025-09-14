import mongoose from "mongoose";

export const connectDB = async () => {
    const mongoURL = process.env.MONGODB_SECRET_KEY;

    if (!mongoURL) {
        console.error("MONGODB_SECRET_KEY is not defined in .env");
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURL);
        console.log("DB Connected");
    } catch (error) {
        console.error("DB Connection Failed", error);
        process.exit(1);
    }
};
