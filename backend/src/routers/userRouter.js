const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/', userController.getAllUsers);
router.post('/login', userController.login);
router.post('/logout', verifyToken, userController.logout);
router.post('/register', userController.register);
router.get('/user-profile', verifyToken, userController.getUserById);
router.post('/refresh', userController.refresh);
module.exports = router;
