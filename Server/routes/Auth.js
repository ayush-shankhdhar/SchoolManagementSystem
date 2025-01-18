const express = require('express');
const router = express.Router();
const { handleLogin, handlePasswordReset} = require('../controllers/Auth')

router.post('/login',handleLogin);
router.post('/reset-password',handlePasswordReset);

module.exports = router;