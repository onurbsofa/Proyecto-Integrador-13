//REQUIRES
const fs = require('fs');
const path = require('path');

//Bcryptjs para hashear la password
const bcrypt = require('bcryptjs');

//Trae los errores de express-validator
const {validationResult, body} = require('express-validator');

//Lee los usuarios del JSON y los guarda en la variable users
const usersFilePath = path.join(__dirname, '../database/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const userControllers = {

//render de la vista del form de login del usuario
login :  (req,res) =>{
    res.render('user/login');  
},

//render de la vista del form de registro del usuario
registroUsuario : (req,res) =>{
    res.render('user/registro');               
},

//Se encarga del funcionamiento del form de registro de un usuario nuevo
crearUsuario : (req,res) => {
    let datos = req.body;
    
    const errors = validationResult(req)

    //Verifica si hubo errores en el form, si no hay errores continua con la creacion del usuario, si hay errores devuelve la misma vista con los mensaje de error
    if (errors.isEmpty()) {
        //verifica si ya existe al menos un usuario en nuestra base de datos, si no existe le asigna el id 1 al que creamos, si existe le asigna el id que sigue
        if (users[0]){
        var idNuevoUser = (users[users.length-1].id)+1;
        } else {
        idNuevoUser = 1
        }


        let nuevoUser = {
            "id" : parseInt(idNuevoUser),
            "name" : datos.name,
            "email" : datos.email,
            "imagen": req.file.filename,
            "password" : bcrypt.hashSync(datos.password,10),

        };

        //escribe el nuevo user en el JSON
        users.push(nuevoUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, " "), 'utf-8');

        //reenvia al home
        res.redirect('/')
   } else {

        //elimina la imagen que acabamos de subir
        if(req.file) {
		    fs.unlinkSync(__dirname+'/../../public/img/'+req.file.filename);
		}
        
       //devuelve la misma vista con los mensajes de error
       return res.render('user/registro', {errors : errors.mapped(), old: req.body})

      	
   }




},

recContra : (req,res) =>{
    res.render('user/rec_contra');            
}

}

module.exports = userControllers;