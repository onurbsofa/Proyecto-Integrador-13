const mainRoutes = require('./src/routes/mainRoutes')
const productRoutes = require('./src/routes/productRoutes')
const userRoutes = require('./src/routes/userRoutes')
const express = require('express');
const path = require ('path');
const app = express();
const methodOverride =  require('method-override'); //Para PUT y DELETE
const session = require('express-session');
const cookieParser = require('cookie-parser');
const loggedMw = require('./src/middlewares/loggedMw')

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use( express.static('public') );
app.use(session({secret: 'Secreto!',
resave: false,
saveUninitialized: false,
}))//nos permite identificar nuestro sitio web y que la info sea mas segura

app.use(cookieParser()); //Cookie parser

app.use(loggedMw); //Middleware para verificar si un usuario esta loggeado, ya sea con session o cookie

app.set('view engine', 'ejs'); 
app.set('views',path.join(__dirname,'./src/views'));



app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

app.listen(process.env.PORT || 3001, function() {
    console.log('Servidor corriendo en el puerto 3001');
});

app.use("/", mainRoutes);

app.use("/product", productRoutes);

app.use("/user", userRoutes);


/// PRUEBA - ELIMINAR



// let db = require('./src/database/models')

    

// db.usuario.create({
//     nombre : "asfdasdasdasdadasd",
//     email : "asdas@fasfa.com",
//     clave : "asdasdasdlsadklas",
//     imagen : "dasdasd.jpg",
//     admin : 1
  
//   })



