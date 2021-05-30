const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')


//router create,search,update,delete
router.get('/',userController.view);
router.post('/',userController.find);
router.get('/adduser',userController.form);
router.post('/adduser',userController.create);
router.get('/edituser/:id',userController.edit);
router.post('/edituser/:id',userController.update);
router.get('/:id',userController.delete);
router.get('/viewdetail/:id',userController.userdetail);
module.exports = router;
