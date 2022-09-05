const express = require('express');
const path = require ('path');
const app = express() ;

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) ); 

app.listen(process.env.PORT || 3000, function() {
    console.log('Serevidor corriendo en el puerto 3000');
});

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname,'./views/index.html'));
});

app.get('/detalle-producto',(req,res) => {
    res.sendFile(path.join(__dirname,'/views/detalle-producto.html'))
});

app.get('/productos',(req,res) => {
    res.sendFile(path.join(__dirname,'/views/productos.html'))
});

app.get('/carrito-compras', (req,res) =>{
    res.sendFile(path.resolve(__dirname, './views/carrito.html'));  // Permite enviar un archivo HTML
});

app.get('/login', (req,res) =>{
    res.sendFile(path.resolve(__dirname, './views/login.html'));  // Permite enviar un archivo HTML
});

app.get('/registro', (req,res) =>{
    res.sendFile(path.resolve(__dirname, './views/registro.html'));  // Permite enviar un archivo HTML
});

app.get('/rec_contra', (req,res) =>{
    res.sendFile(path.resolve(__dirname, './views/rec_contra.html'));  // Permite enviar un archivo HTML
});