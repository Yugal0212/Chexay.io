const friendListSchema = require("../modules/schema/friendListSchema");
const loginSchema = require("../modules/schema/loginSchema");

const friendList = async(req,res)=>{
    try {
        const loggedInUser = req.user._id;
        const friends = await friendListSchema.findOne({Username:loggedInUser}).populate('friendList')

        if(!friends){
            return res.status(404).json({message:"Friend list not found"});
        }

        let sendData = friends.friendList.map((friend)=>{
            return {
                _id:friend._id,
                username:friend.username,
                profilepic:friend.profilepic
            }
        })

        res.status(200).json(sendData);
    } catch (e) {
        console.log("error in friendList controller" , e);
        res.status(500).json({error:"internal server error"})  
    }
}

const searchFriend = async(req, res)=>{
    try {   
        const username = req.body.username
        const loggedInUser = req.user._id

        const users = await loginSchema.find({username:{$regex:username, $options:"i"}}).select('_id username profilepic')
        if(users.length == 0){
            return res.status(404).json({username:"username not found"});
        }
        users.filter((friend)=>friend._id !== loggedInUser)
        res.json(users);

    } catch (e) {
        console.log("error in searchFriend controller" , e);
        res.status(500).json({error:"internal server error"})  
    }
}


const addFriends = async(req, res)=>{
    try {
        const loggedInUser = req.user._id;
        const friendId = req.body._id
        let friend = await friendListSchema.findOne({Username:loggedInUser});
        if(!friend){
            const newList = await friendListSchema({
                Username:loggedInUser
            })
            
            await newList.save();
        }
        friend = await friendListSchema.findOne({Username:friendId});
        if(!friend){
            const newList = await friendListSchema({
                Username: friendId
            })
            await newList.save();
        } 
        await Promise.all([friendListSchema.findOneAndUpdate({Username:loggedInUser}, {$push:{friendList:friendId}}),friendListSchema.findOneAndUpdate({Username:friendId}, {$push:{friendList:loggedInUser}})])
        res.json({message:"Friend added successfully"});
    } catch (e) {
        console.log("error in addfriends controller" , e);
        res.status(500).json({error:"internal server error"})  
    }
}

module.exports = {
    friendList,
    addFriends,
    searchFriend
}



