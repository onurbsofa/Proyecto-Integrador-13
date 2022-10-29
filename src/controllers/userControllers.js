const fs = require('fs');
const path = require('path');
const { runInNewContext } = require('vm');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const {validationResult, body} = require('express-validator');
const { brotliDecompressSync } = require('zlib');
const { send } = require('process');

const usersFilePath = path.join(__dirname, '../database/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const userControllers = {
    
login :  (req,res) =>{
    res.render('user/login');  
},

registroUsuario : (req,res) =>{
    res.render('user/registro');               
},

crearUsuario : (req,res) => {
    let datos = req.body;
    console.log(req)
    console.log(datos)

    
    //const errors = validationResult(req)

    // return res.send(val)

    //console.log(errors.mapped())

    //if (errors.isEmpty()) {
        //let idNuevoUser = (users[users.length-1].id)+1;


        let nuevoUser = {
            "id" : 1,//parseInt(idNuevoUser),
            "name" : datos.name,
            "email" : datos.email,
            "password" : bcrypt.hashSync(datos.password,10),

        };


        users.push(nuevoUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "), 'utf-8');
        res.redirect('/')
   // } else {
   //     return res.render('user-register-form', {errors : errors.mapped(), old: req.body})
   // }




},

recContra : (req,res) =>{
    res.render('user/rec_contra');            
}

}

module.exports = userControllers;