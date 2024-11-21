const jwt = require('jsonwebtoken');
const loginSchema = require('../modules/schema/loginSchema');

const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;
        if(!token){
            return res.status(401).json({msg: "Not authorized, token is required"})
        }
        const decode = await jwt.verify(token,process.env.JWT_SECRET)
        if(!decode){
            return res.status(401).json({msg: "Not authorized, token is invalid"})
        }
        const user = await loginSchema.findById(decode.userId).select("-password");

        if(!user){
            return res.status(401).json({msg: "Not authorized, user not found"})
        }
        req.user = user;
        next();

        // If token is valid, continue to the next middleware or route handler.

    } catch (e) {
        console.log("error in protectRoute",e)
        res.status(401).json({msg: "Not authorized, token is required"})
    }
}

module.exports = {
    protectRoute
}