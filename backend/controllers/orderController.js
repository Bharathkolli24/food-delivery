//////////////////   PAYMENT PAGE  ////////////////////////

import orderModel from "../models/orderModel.js";
import userModel from '../models/userModel.js'
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// placing user order from frontend
const placeOrder = async (req,res) => {

    const frontend_url = 'http://localhost:5173'

    try {
        const userId = req.body.userId;
        if (!userId) {
            return res.json({ success: false, message: 'User ID is required.' });
        }
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        await newOrder.save()                  // this line is to save the newOrder into the database 
        await userModel.findByIdAndUpdate(userId,{cartData:{}})    // this  line is to clear the cart data after placing the order. first it will find the user and then it will empty the cart data 

        // whatever item,s we are getting from user we are getting this line_items. It is a logic to create the payment link using the stripe 
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100,       //item.price*100 we will get the paisa
            },
            quantity: item.quantity
        }));        

        line_items.push({
            price_data: {   
                currency: 'inr',
                product_data: {
                    name: 'Delivery charges'
                },
                unit_amount: 2*100   // we provided delivery charges as 2 rupees in frontend 2*100 = 200 paisa
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}` ,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}` ,
        }) 
        res.json({success:true, session_url:session.url})
    } catch (error) {
        console.log(Error)
        res.json({success:false,message:'Error'})
    }
}

const verifyOrder = async (req,res) => {
    const {orderId,success} = req.body;
    try {
        if (success==='true') {    // we are calling true as a string while calling the API we will pass this as a string 
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:'Paid'});
        } else {
            await orderModel.findByIdAndDelete(orderId);       // if user cancels the payment then this will executes and delete that orderId in the database            res.json({success:false,message:'Not Paid'});
        }
    } catch (error) {
        console.log(Error)
        res.json({success:false,message:'Error'});
    }
} 

//user orders for frontend
const userOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(Error)
        res.json({success:false,message:"Error"})
    }
}

// Listing all the orders made by users 
const listOrders = async (req,res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:'Error'})
    }
}

// API for updating order status
const updateStatus = async (req,res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:'Error'})
    }
}

export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}