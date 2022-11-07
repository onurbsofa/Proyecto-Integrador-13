//REQUIRES
const fs = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer'); //Multer



//Controllers
const userControllers = require('../controllers/userControllers');

//Importa middleware para la validacion del form de registro
const validateRegister = require('../middlewares/validateRegister')

const { check } = require('express-validator');

//Importa Multer middleware
const multerDiskStorage = require('../middlewares/multerDiskStorage')

//Asignamos Multer storage a la constante uploadFile
const uploadFile = multer({ storage: multerDiskStorage });


//vista del form de login
router.get('/login', userControllers.login);
//post del login con midleware validator
router.post('/login', [
    check('email')
        .isEmail().withMessage('Debes ingresar un email válido')
], userControllers.processLogin)

//vista para recuperar password (no funciona)
router.get('/rec_contra', userControllers.recContra);

//vista del form de registro
router.get('/registro', userControllers.registroUsuario);
//post del form de registro con middleware validador
router.post('/registro', uploadFile.single('imagen'), validateRegister, userControllers.crearUsuario); 



module.exports = router;