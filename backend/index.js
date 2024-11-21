//for express
const express = require('express');
//for cors
const cors = require('cors');
//for path
const path = require('path');
//for mongoose
const mongoose = require('mongoose');
//for use .env file
require('dotenv').config();
//server port number
const port = process.env.PORT || 8000
//for routes
const authenticate = require('./routes/authentication');
//connet mongoDB
const connectToMongodb = require('./db/connectToMongoDb');
//cookie parser 
const cookieParser = require('cookie-parser')

//massaged routes
const massageRoutes = require('./routes/massageRoutes')

//friendList routes
const friendList = require('./routes/friendListRoutes')

//middleware
const {app,server} = require('./socket.io/socket')
app.use(cors({
    origin: process.env.frontend_path,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // credentials: 'include',
    credentials: true,
  }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../frontend/build')));
// routes for authentication

app.use('/authentication',authenticate);
app.use('/api',massageRoutes);
app.use('/friendList',friendList);
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})
    
//server configuration
server.listen(port,()=>{
    connectToMongodb();
    console.log(`Server is running on port ${port}`);
})
