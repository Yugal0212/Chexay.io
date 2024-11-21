const { friendList, searchFriend, addFriends } = require('../controller/friendList');
const { protectRoute } = require('../middleware/protectRoute');

const router = require('express').Router();


router.get('/',protectRoute,friendList)

router.post('/search/friend',protectRoute,searchFriend)

router.post('/addfriend',protectRoute,addFriends)

module.exports = router