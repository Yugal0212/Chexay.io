const jwt  = require('jsonwebtoken');

// Middleware to verify JWT token
function generateToken(userId,res){
    try{
        const token = jwt.sign({userId} , process.env.JWT_SECRET,{
            expiresIn: '15d'  // 15 days expiry time
        })
        res.cookie("jwt",token,{
            maxAge: 15*24*60*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:true
            // secure: process.env.NODE_ENV !== 'development' 
        })
    }
    catch(e){
        console.error('Error generating JWT token:', e);
        return null;
    }
}

module.exports = {
    generateToken
}