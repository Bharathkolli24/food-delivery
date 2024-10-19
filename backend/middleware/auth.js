import JWT from 'jsonwebtoken'

const authMiddleware = async (req,res,next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({success:false,message:'Not Authorized Login Again'});
    }
    try {
        const token_decode = JWT.verify(token,process.env.JWT_SECRET);   //we will get token from users header which is written in above const \
        req.body.userId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({success:false,message:'Error'})
    }
}

export default authMiddleware;