import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'

// login user
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try {
        const user = await userModel.findOne({email})   //checking whether the user exists with the provided email
        if (!user) {
            return res.json({success:false,message:"User doesn't exist"})
        }

        const isMatched = await bcrypt.compare(password,user.password)   // here we passed two args password is the password entered by the user while logging in and password stored in database.. if both are matched

        if (!isMatched) {
            return res.json({success:false,message:"Invalid credentials"})
        }

        const token = createToken(user._id)
        res.json({success:true,token})

    } catch (error) {
        console.log(Error)
        return res.json({success:false,message:"Error"})

    }
}

const createToken = (id) => {    //id for the users is automatically created by the database
    return jwt.sign({id},process.env.JWT_SECRET)    //we have taken id as a data and generated a token
}

//register user
const registerUser = async (req,res) => {
    const {name,password,email} = req.body         // here we are destructuring the name,email and password from the req body
    try {
        //checking if user exists
        const exists = await userModel.findOne({email})
        if (exists) {
            return res.json({success:false,message:"User already exists"})
        }
        //validating email format and strong password
        if (!validator.isEmail(email)) {            // checking user email is valid or not
            return res.json({success:false,message:"Please enter a valid email"})
        }

        if (password.length<8) {
            return res.json({success:false,message:"Please enter a strong password"})    
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10)       //generating random 10 digit password
        const hashedPassword = await bcrypt.hash(password,salt)  // here the password entered by the user is hashed 

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        const user = await newUser.save()   // the above created newUser has been saved in the database 
        const token = createToken(user._id)
        res.json({success:true, token})
    } catch (error) {
        console.log(Error)
        res.json({success:false,message:'Error'})
    }
}

export {loginUser,registerUser}