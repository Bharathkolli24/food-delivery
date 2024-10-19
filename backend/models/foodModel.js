import mongoose from "mongoose";

const foodSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
})

const foodModel = mongoose.models.food || mongoose.model('food', foodSchema)  //we create the model only once and when we run this file it will create model again that is why i used ||. That means if model is already present it will be used and if not it will create new model

export default foodModel;

