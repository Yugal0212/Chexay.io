const {Server} = require('socket.io')
const http = require('http');
const express = require('express');
const loginScheme = require('../modules/schema/loginSchema')
const friendList = require('../modules/schema/friendListSchema')
const app = express();

const server = http.createServer(app);
const io = new Server(server,{
    cors: {
        origin: process.env.frontend_path,
        methods: ['GET', 'POST']
    }
});


const getReceiverSocketId = (receiverid) => {
    // Assuming userSocketMap is already defined
    return msgSocketMap[receiverid];
};

// Example usage:
const userSocketMap = {}
const msgSocketMap = {}

const getOnlineUser = async () => {
    try {
        const allOnlineUsers = await loginScheme.find({ online: true }).select('_id');
        return allOnlineUsers.map(user => ({ id: user._id }));
    } catch (err) {
        console.error('Error fetching online users:', err);
        return [];
    }
};


io.on('connection', async (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
        userSocketMap[socket.id] = userId;
        msgSocketMap[userId] = socket.id;
        await loginScheme.findByIdAndUpdate(userId, { online: true });
        
        const onlineUsers = await getOnlineUser();
        io.emit('getOnlineUser', onlineUsers); // Broadcast online users
    }
    
    socket.on('disconnect', async () => {
        if (userId) {
            await loginScheme.findByIdAndUpdate(userId, { online: false });
            delete msgSocketMap[userSocketMap[socket.id]];
            delete userSocketMap[socket.id];
            const onlineUsers = await getOnlineUser();
            io.emit('getOnlineUser', onlineUsers); // Update all clients
        }
    });
});    

module.exports = {app,io,server,getReceiverSocketId}