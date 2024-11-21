const router = require('express').Router();
const {sendMassage,getMessage} = require('../controller/massageController')
const {protectRoute} = require('../middleware/protectRoute')

router.post('/sendMsg/:id',protectRoute,sendMassage);
router.get('/:id',protectRoute,getMessage);





module.exports = router;