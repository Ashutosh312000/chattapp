const express = require('express');

const messageController = require('../controllers/message');

const userauthentication=require('../middleware/auth')

const router = express.Router();


router.post('/postmessage',userauthentication.authenticate, messageController.postmessage);
router.get('/getmessage',userauthentication.authenticate, messageController.getmessage);


module.exports = router;