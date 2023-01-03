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

//Importa middleware para la validacion del form de login
const validateLogin = require('../middlewares/validateLogin')

const { check } = require('express-validator');

//Importa Multer middleware
const multerDiskStorage = require('../middlewares/multerDiskStorage')

//Asignamos Multer storage a la constante uploadFile
const uploadFile = multer({ storage: multerDiskStorage });


//vista del form de login
router.get('/login', userControllers.login);
//post del login con midleware validator
router.post('/login', validateLogin, userControllers.processLogin)

//en "/logout" se hace el logout del usuario
router.get('/logout', userControllers.logout)

//vista para recuperar password (no funciona)
router.get('/rec_contra', userControllers.recContra);

//vista del form de registro
router.get('/registro', userControllers.registroUsuario);
//post del form de registro con middleware validador
router.post('/registro', uploadFile.single('imagen'), validateRegister, userControllers.crearUsuario); 

//lista usuarios
router.get('/list', userControllers.list);

//vista del usuario
router.get('/vista-usuario', userControllers.vistaUsuario);

//api de usuarios
router.get('/APIusuarios', userControllers.endpoint);

//api de usuarios
router.get('/APIusuarios/:id', userControllers.buscarPorId);




module.exports = router;