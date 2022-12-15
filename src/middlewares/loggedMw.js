const fs = require('fs');
const path = require('path');

//JSON ya NO lo usamos - ELIMINAR
//const usersFilePath = path.join(__dirname, '../database/usersDataBase.json');
//const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

//base de datos
let db = require('../database/models')


function loggedMw (req,res,next) {
try {
    //Por default el usuario no esta logeado
    res.locals.isLogged = false

    //Busca el mail del usuario que se logeo, si hizo click en Recordarme (tiene la cookie en su browser)
    
    //Esto es del JSON - ELIMINAR
    //let userInCookie = users.find(element => element.email == req.cookies.userEmail )

    db.usuario.findAll().then(function(usersDb){

        const userInCookie = usersDb.find(element => element.email == req.cookies.userEmail);

    //Si lo encuentra guarda el usuario en la session
    if (userInCookie) {
        req.session.usuarioLogeado = userInCookie
    }

    //Si el usuario esta logeado, ya sea porque se acaba de logear o porque tenia la cookie, ponemos TRUE a locals.isLogged y asignamos a locals.usuarioLoguead la session
    if (req.session.usuarioLogeado) {
        res.locals.isLogged = true
        res.locals.usuarioLogeado = req.session.usuarioLogeado
    }

    next()
   


    })

    } catch(error) {res.send(error)}
}

module.exports = loggedMw;