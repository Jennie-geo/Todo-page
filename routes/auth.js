const express = require('express');

const router = express.Router()

const loginController = require('../controllers/auth');

router.get('/login', loginController.getLogin);

router.get('/signup', loginController.getSignup);

router.post('/login', loginController.postLogin);

router.post('/signup', loginController.postSignup);

router.post('/logout', loginController.postLogout);

router.get('/resetPasswd', loginController.getReset);

router.post('/resetPasswd', loginController.postReset);

module.exports = router