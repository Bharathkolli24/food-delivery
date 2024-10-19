import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://bharathkolli24:9490735256@cluster0.7qsc9.mongodb.net/food-del').then(() => console.log('DB Connected') )
}