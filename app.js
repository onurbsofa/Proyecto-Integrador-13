const mainRoutes = require('./src/routes/mainRoutes')
const productRoutes = require('./src/routes/productRoutes')
const userRoutes = require('./src/routes/userRoutes')
const express = require('express');
const path = require ('path');
const app = express();
const methodOverride =  require('method-override'); //Para PUT y DELETE

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use( express.static('public') );
app.set('view engine', 'ejs'); 
app.set('views',path.join(__dirname,'./src/views'));


app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

app.listen(process.env.PORT || 3000, function() {
    console.log('Serevidor corriendo en el puerto 3000');
});

app.use("/", mainRoutes);

app.use("/product", productRoutes);

app.use("/user", userRoutes);



