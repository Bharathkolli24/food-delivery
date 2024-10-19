import cors from "cors"
import 'dotenv/config'
import express from "express"
import { connectDB } from "./config/db.js"
import cartRouter from "./routes/cartRoute.js"
import foodRouter from "./routes/foodRoute.js"
import orderRouter from "./routes/orderRoute.js"
import userRouter from "./routes/userRoute.js"


// app - config
const app = express()
const PORT = process.env.PORT || 4000;

// middleware
app.use(express.json())  //whenever we will get the request from frontend to backend we will be parsing this using this json
app.use(cors())          //using this we can access backend from any frontend

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter)
app.use('/images', express.static('uploads'))   //we will get images from uploads folder which we can access using /images/filename
app.use('/api/user', userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

app.get('/' , (req,res) => {
    res.send("API Working")
})

app.listen(PORT, () => console.log(` Server started on http://localhost:${PORT}`))


