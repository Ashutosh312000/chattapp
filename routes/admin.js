const express = require('express');

const adminController = require('../controllers/admin');

const userauthentication=require('../middleware/auth')

const router = express.Router();



router.put('/makeparticipants', userauthentication.authenticate,adminController.makeparticipants);
router.put('/deleteasadmin', userauthentication.authenticate,adminController.deleteasadmin);
router.put('/deleteparticipants', userauthentication.authenticate,adminController.deleteparticipants);
router.put('/leavegroup', userauthentication.authenticate,adminController.leavegroup);
router.put('/deletegroup', userauthentication.authenticate,adminController.deletegroup);
router.post('/addAparticipant', userauthentication.authenticate,adminController.addAparticipant);



module.exports = router;