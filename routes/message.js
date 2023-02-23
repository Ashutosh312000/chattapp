const express = require('express');

const messageController = require('../controllers/message');

const multer=require('multer'); //we are using multer because we are having multipart/form-data which needs a middleware to read

const storage = multer.memoryStorage() //we are storing the file in memory storage(for modification) and directly
                                        //send it to s3 without sdaving to node filesystem
const upload = multer({ storage: storage })


const userauthentication=require('../middleware/auth')

const router = express.Router();


router.post('/postmessage',userauthentication.authenticate, messageController.postmessage);
router.post("/postfile/:groupId",[userauthentication.authenticate, upload.single('inputFile')],messageController.postFile);
router.get('/getmessage',userauthentication.authenticate, messageController.getmessage);
router.get('/getadmin',userauthentication.authenticate, messageController.getadmin);


module.exports = router;