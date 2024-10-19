import userModel from '../models/userModel.js'

// Add items to users cart
const addToCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)   // we will get _id from the middleware auth.js and while requesting we will not send the id we will send the token and auth.js convert the token into the userId that we have used here 
        let cartData = await userData.cartData
        if (!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;  // If user want to add the product into cart with 1 product id and from that there is no entry in the cart in that case it will create new entry  
        } else {
            cartData[req.body.itemId] += 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})  // this line will update the new cart data in the database
        res.json({success:true,message:'Added to Cart'})
    } catch (error) {
        console.log(Error)
        res.json({success:false,message:'Error'}) 
    }
}

// remove items from users cart
const removeFromCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)   // we will get this userId from the auth.js that will decode our token id and convert into userId
        let cartData = await userData.cartData
        if (cartData[req.body.itemId] > 0) {                   // checking whether the item i want to remove is present in the body or not
            cartData[req.body.itemId] -= 1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})   //we are updating the new cart data
        res.json({success:true,message:"Removed From cart"})
    } catch (error) {
        console.log(Error)
        res.json({success:false,message:"Error"})
    }
}

// Fetch user cart data
const getCart = async (req,res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
        console.log(Error)
        res.json({success:false,message:"Error"})
    }
}


export {addToCart,removeFromCart,getCart}