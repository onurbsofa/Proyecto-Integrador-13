const express = require('express');
const router = express.Router();
//const guestMw = require('../Middlewares/guestMw')
//const loggedMw = require('../Middlewares/loggedMw')

const { check } = require('express-validator');

const userControllers = require('../controllers/userControllers');

//Para la validacion del form de registro
const validateRegister = [
    //Verifica que el nombre cumpla los requisitos
    check('name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    //Verifica que el email cumpla los requisitos
    check('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido'),
    
    //Verifica que el password cumpla los requisitos    
    check('password')
        .notEmpty().withMessage('Debes completar la contraseña').bail()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

    // Validacion custom para verificar que los passwords coincidan
    check('confirmPassword')
        
        
        .custom(async (confirmPassword, {req}) => {
        const password = req.body.password
   
        // Si los passwords no coinciden devuelve este error
        if(password !== confirmPassword){
          throw new Error('Las contraseñas deben coincidir')
        }
      }),        

]



router.get('/login', userControllers.login);

//vista del form de registro
router.get('/registro', userControllers.registroUsuario);

//post del form de registro con middleware validador
router.post('/registro', validateRegister, userControllers.crearUsuario); 

router.get('/rec_contra', userControllers.recContra);

module.exports = router;