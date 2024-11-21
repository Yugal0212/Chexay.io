const loginSchema = require('../modules/schema/loginSchema');
const {generateToken} = require('../modules/generateToken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const Mailgen = require('mailgen');
const registerOtpsave = require('../modules/schema/registerOtpsave');
const forgotPassOtps = require('../modules/schema/forgotPassOtps');
const bcrypt = require('bcrypt');

const loginWithUserAndPass = async (req ,res) =>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        // verify username and email and password and authenticate user
        const data = await loginSchema.findOne({$or:[{username:username},{email:username}]});
        if(data){
            const ispasswordCorrect = await bcrypt.compare(password,data.password);
            if(ispasswordCorrect){
                generateToken(data._id,res)
                res.json({
                    "_id":data._id,
                    "username":data.username,
                    "profilepic":data.profilepic
                })
            }
            else{
                res.json({
                    "error": "password is incorrect"
                })
            }
        }
        else{
            res.json({
                "error": "username or email not found"
            })
        }
    }
    catch(e){
        console.log("error in loginwithuserAndPass",e)
        res.status(500).json("internal server error")
    }
}

const registerUser = async (req,res) => {
    try{
        const reqData = req.body;
        let data = await loginSchema.findOne({username:reqData.username})
        if(data){
            res.json({
                "error": "username already exists"
            })
            return
        }
        data = await loginSchema.findOne({email:reqData.email})
        if(data){
            res.json({
                "error": "email already exists"
            })
            return
        }
        const Otpdata = await registerOtpsave.findOne({email:reqData.email});
        if(Otpdata){
            if(Otpdata.otp == reqData.otp){
                //Hase password
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(reqData.password, salt);
                const boyPic = `https://avatar.iran.liara.run/public/boy?username=${reqData.username}`
                const girlPic = `https://avatar.iran.liara.run/public/girl?username=${reqData.username}`
                const dbSave = new loginSchema({
                    username: reqData.username,
                    email: reqData.email,
                    password: hashedPassword,
                    gender: reqData.gender,
                    profilepic : reqData.gender == 'male' ? boyPic : girlPic 
                });
                generateToken(dbSave._id,res);
                const data = await dbSave.save();
                await registerOtpsave.deleteOne({email:reqData.email});
                res.json({
                    "_id":data._id,
                    "username":data.username,
                    "profilepic":data.profilepic
                })
            }
            else{
                res.json({
                    "error": "Invalid OTP"
                })
                return
            }
        }
        else{
            res.json({
                "error": "OTP not sent yet"
            })
            return
        }
    }
    catch(e){
        console.log("error in registerUser File",e);
        res.status(500).json({"message": 'Internal Server Error'});
    }
}

const otpVerification = async (req,res)=>{
    const data = req.body;
    let otp;
    let user = await loginSchema.findOne({username:data.username});
    if(user){
        res.json({
            "error": "username already exists"
        })
        return
    }
    user = await loginSchema.findOne({email:data.email});
    if(user){
        res.json({
            "error": "email already exists"
        })
        return
    }
    otp = Math.floor(1000+Math.random()*9000);
    await registerOtpsave.deleteOne({email:data.email});
    const dbSave = new registerOtpsave({
        email: data.email,
        otp: otp
    });
    await dbSave.save();
    let config = {
        service :'gmail',
        auth:{
            user: process.env.send_email,
            pass: process.env.send_email_password,
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: 'default',
        product :{
            name:'Chatting application',
            link:'https://mailgen.js/'
        }
    })

    let response = {
        body:{
            name:'User',
            intro:"Welcome to the Chatting application",
            table:{
                data:[{
                    OTP:`<h1>${otp}</h1>`
                }]
            },
            outro :"thanks for register"
        }
    }

    let mail = MailGenerator.generate(response)

    let massage = {
        from: process.env.send_email,
        to: data.email,
        subject: 'Welcome to ChatApp',
        html: mail
    }

    
    transporter.sendMail(massage).then(()=>{
        res.json({success:"success"})
    }).catch((e)=>{
        res.json({
            "error": "Failed to send email"
        })
        console.log('error in otpVerification function',e)
    })
}


const logout = async(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({"massage":"logged out successfully"});
    } catch (e) {
        console.log("error in logout controller",e)
        res.status(500).json("internal server error")
    }
}

const forPassOtpGen = async (req , res)=>{
    const reqData = req.body;
    const data = await loginSchema.findOne({email:reqData.email})
    if(!data){
        res.json({
            "error":"email not found"
        })
        return
    }
    await forgotPassOtps.deleteOne({email:data.email});
    let otp = Math.floor(1000+Math.random()*9000);
    const dbSave = new forgotPassOtps({
        email: data.email,
        otp: otp
    });
    await dbSave.save();
    let config = {
        service :'gmail',
        auth:{
            user: process.env.send_email,
            pass: process.env.send_email_password,
        }
    }

    let transporter = nodemailer.createTransport(config);

    let MailGenerator = new Mailgen({
        theme: 'default',
        product :{
            name:'Chatting application',
            link:'https://mailgen.js/'
        }
    })

    let response = {
        body:{
            name:`${data.username}`,
            intro:"your Otp for Changging Password",
            table:{
                data:[{
                    OTP:`<h1>${otp}</h1>`
                }]
            },
        }
    }

    let mail = MailGenerator.generate(response)

    let massage = {
        from: process.env.send_email,
        to: reqData.email,
        subject: 'Welcome to ChatApp',
        html: mail
    }

    try{
        transporter.sendMail(massage)
        res.json({message:'otp sent successfully'})
    }
    catch(e){
        response.json({
            "error": "Failed to send email"
        })
        console.log('error in forPassOtpGen function',e)
    }
}

const changePassword = async (req, res) => {
    try {
        const  reqData = req.body;
        console.log(reqData)
        const data = await loginSchema.findOne({email:reqData.email})
        if(!data){
            res.json({
                "error":"email not found"
            })
            return
        }
        const ispasswordCorrect = await bcrypt.compare(data.password, reqData.password || "");
        const otp = await forgotPassOtps.findOne({email:reqData.email})
        if(!otp){
            res.json({
                "error":"otp is not generated"
            })
            return
        }
        if(reqData.otp == otp.otp){
            if(!ispasswordCorrect){
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(reqData.password, salt);
                const data1 = await loginSchema.findOneAndUpdate({email:reqData.email},{password:hashedPassword});
                if(data1){
                    await forgotPassOtps.deleteOne({email:reqData.email});
                    res.json({
                        message:"password updated successfully"
                    })
                } else{
                    res.json({
                        "error":"failed to update password"
                    })
                    return
                }
            }
            else{
                res.json({
                    "error": "new password is not like old password please change"
                })
                return
            }
        } 
        else{
            res.json({
                "error": "OTP is incorrect"
            })
            return
        }
    } catch (e) {
        console.log("error in changePassword controller",e)
        res.status(500).json("internal server error")
    }
}

module.exports = {
    loginWithUserAndPass,
    registerUser,
    otpVerification,
    changePassword,
    logout,
    forPassOtpGen
}