const express = require('express');

const groupController = require('../controllers/group');

const userauthentication=require('../middleware/auth')

const router = express.Router();


router.get('/getparticipants',userauthentication.authenticate, groupController.getparticipants);
router.get('/getgroups',userauthentication.authenticate, groupController.getgroups);
router.post('/postgroup',userauthentication.authenticate, groupController.postgroup);



module.exports = router;