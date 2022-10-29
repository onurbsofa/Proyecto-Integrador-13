const express = require('express');
const router = express.Router();
//const guestMw = require('../Middlewares/guestMw')
//const loggedMw = require('../Middlewares/loggedMw')

const { check } = require('express-validator');

const userControllers = require('../controllers/userControllers');

const validateRegister = [
    check('name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    check('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    
    check('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 5 }).withMessage('La contraseña debe tener al menos 5 caracteres')

]




router.get('/login', userControllers.login);

router.get('/registro', userControllers.registroUsuario);
router.post('/registro', userControllers.crearUsuario); 

router.get('/rec_contra', userControllers.recContra);

module.exports = router;