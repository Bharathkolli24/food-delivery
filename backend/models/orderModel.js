import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default:"Food Processing"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    payment: {
        type: Boolean,
        default: false                         //whenever new order will created the payment state at beginning is false
    }
})   // if we don't add this then the cartData will not be created because we haven't created any cartData in above line. Means it can create empty cart too

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema)   //if the model is already created then the first one will be used and if not the second one will create new model
export default orderModel;