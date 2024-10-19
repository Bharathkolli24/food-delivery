import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    cartData: {
        type: Object,
        default: {},
    }
}, {minimize: false})   // if we don't add this then the cartData will not be created because we haven't created any cartData in above line. Means it can create empty cart too

const userModel = mongoose.models.user || mongoose.model('user', userSchema)   //if the model is already created then the first one will be used and if not the second one will create new model
export default userModel;