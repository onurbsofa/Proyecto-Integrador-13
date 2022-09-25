const mainRoutes = require('./src/routes/mainRoutes')
const productRoutes = require('./src/routes/productRoutes')
const userRoutes = require('./src/routes/userRoutes')
const express = require('express');
const path = require ('path');
const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );
app.set('view engine', 'ejs'); 


app.listen(process.env.PORT || 3000, function() {
    console.log('Serevidor corriendo en el puerto 3000');
});

app.use("/", mainRoutes);

app.use("/product", productRoutes);

app.use("/user", userRoutes);



