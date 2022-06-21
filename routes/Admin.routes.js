const router = require('express').Router();
const adminController = require('../controllers/admin.contoller');
const { login } = require('../controllers/login.controller');
const { loginWithToken } = require('../middelwares/middelwares');

router.post('/login',login);
router.get('/:getUsers',loginWithToken,adminController.getUsers);
router.post('/verifyUser',loginWithToken,adminController.verifyUser);

module.exports = router; 