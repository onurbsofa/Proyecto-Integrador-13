const userControllers = require('../controllers/userControllers');

const express = require('express');
const router = express.Router();

router.get('/login', userControllers.login);
router.get('/registro', userControllers.registro);
router.get('/rec_contra', userControllers.recContra);

module.exports = router;