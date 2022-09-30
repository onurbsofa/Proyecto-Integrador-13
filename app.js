const mainRoutes = require('./src/routes/mainRoutes')
const productRoutes = require('./src/routes/productRoutes')
const userRoutes = require('./src/routes/userRoutes')
const express = require('express');
const path = require ('path');
const app = express();


app.use( express.static('public') );
app.set('view engine', 'ejs'); 
app.set('views',path.join(__dirname,'./src/views'));


app.listen(process.env.PORT || 3000, function() {
    console.log('Serevidor corriendo en el puerto 3000');
});

app.use("/", mainRoutes);

app.use("/product", productRoutes);

app.use("/user", userRoutes);



