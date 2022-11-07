//REQUIRES
const fs = require('fs');
const path = require('path');

//Bcryptjs para hashear la password
const bcrypt = require('bcryptjs');
//esto permite al usuario logeado acceder a la variable session en desde cualquier pagina
const session = require('express-session');

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

processLogin : (req, res) =>{
    let errors = validationResult(req)

    //Verifica si hubo errores en el form, si no hay errores se fija si el email y la contraseña esten en la base de datos, si hay errores devuelve la misma vista con los mensaje de error
    if (errors.isEmpty()) {
        for(let i = 0; users.length; i++){
            if(users[i].email == req.body.email){
                if(bcrypt.compareSync(req.body.password, users[i].password)){
                    let usuarioALogearse = users[i];
                    break;
                }
            }
        }
        //si bno coincide el mail o la contraseña usuarioALogearse no se crea por lo tanto es undefine y te tira un error manual en el formulario 
        if(usuarioALogearse == undefined){
            return res.render('user/login', { errors: [
                {msg:'Credenciales invalidas'}
            ]})
        }
        /// aca estaria guardando al usuario en session una variable que se comparte en todo el proyecto 
        req.session.usuarioLogeado = usuarioALogearse;
        res.redirect('/') //si todo sale bien te manda al home donde tendria que verse el header con el apartado usuario pero todavia no esta la vista dinamica
    }else{
        return res.render( 'user/login', {errors : errors.mapped(), old: req.body})
    }
},

//render de la vista del form de registro del usuario
registroUsuario : (req,res) =>{
    res.render('user/registro');               
},

//Se encarga del funcionamiento del form de registro de un usuario nuevo
crearUsuario : (req,res) => {
    let datos = req.body;
    
    let errors = validationResult(req)

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