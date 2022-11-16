const fs = require('fs');
const path = require('path');

const { check } = require('express-validator');

//base de datos
let db = require('../database/models')

//JSON ya NO lo usamos - ELIMINAR
// const usersFilePath = path.join(__dirname, '../database/usersDataBase.json');
// const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const validateLogin = [


    //Verifica que el email cumpla los requisitos
    check('email')
        .notEmpty().withMessage('Debes completar el email').bail()
        .isEmail().withMessage('Debes ingresar un email válido')

        //Verifica que el email no exista ya en nuestra base de datos
        .custom(async (email, {req}) => {
            const emailIngresado = req.body.email;

            db.usuario.findAll().then(function(usersDb){

            const encontrado = usersDb.find(element => element.email == emailIngresado);

              
            // Si el mail no existe
            if(!encontrado){
              throw new Error('El mail no corresponde a un usuario registrado')
            }
          })
          
          }),        
        
    
]

module.exports = validateLogin;

