import express from "express";
import { addFood, listFood, removeFood } from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router()    //using this router we can create get,post and many methods

// image storage engine 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})    //a middleware has been created using that we can store image in upload folder

foodRouter.post('/add',upload.single('image'), addFood)   //upload.single() is a middleware to store the images which we got from post req
foodRouter.get('/list',listFood)
foodRouter.post('/remove',removeFood)

export default foodRouter;
