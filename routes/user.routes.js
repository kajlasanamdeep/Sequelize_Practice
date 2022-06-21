const express = require('express');
const { login } = require('../controllers/login.controller');
const userController = require('../controllers/user.controller');
const { checkDuplicate,loginWithToken } = require('../middelwares/middelwares');
const router = express.Router();

router.post('/register',checkDuplicate,userController.register);
router.post('/login',login);
router.post('/getProfile',loginWithToken,userController.getProfile)

module.exports = router; 