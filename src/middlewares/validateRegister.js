const fs = require('fs');
const path = require('path');

const { check } = require('express-validator');

//base de datos
let db = require('../database/models')


//JSON ya NO lo usamos - ELIMINAR
// const usersFilePath = path.join(__dirname, '../database/usersDataBase.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const validateRegister = [
    //Verifica que el nombre cumpla los requisitos



    check('name')
        .notEmpty().withMessage('Debes completar el nombre').bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

    //Verifica que el email cumpla los requisitos
    check('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido')

        //Verifica que el email no exista ya en nuestra base de datos
        .custom(async (email, {req}) => {
            const emailIngresado = req.body.email;

            await db.usuario.findAll().then(function(usersDb){


            const encontrado = usersDb.find(element => element.email == emailIngresado);
            //const encontrado = users.find(element => element.email == emailIngresado);

       
            // Si los emails coinciden devuelve este error
            if(encontrado){
              throw new Error('El email ya se encuentra registrado, por favor selecciona otro')
            }
          })
          }),        
        
    
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
      })        
    

]

module.exports = validateRegister;

