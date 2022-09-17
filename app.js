const todosRoutes = require('./src/routes/todosRoutes')
const express = require('express');
const path = require ('path');
const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) );
app.set('view engine', 'ejs'); 


app.listen(process.env.PORT || 3000, function() {
    console.log('Serevidor corriendo en el puerto 3000');
});

app.use("/", todosRoutes);
app.use("/detalle-producto", todosRoutes);
app.use("/productos", todosRoutes);
app.use("/carrito-compras", todosRoutes);
app.use("/login", todosRoutes);
app.use("/registro", todosRoutes);
app.use("/rec_contra", todosRoutes);


