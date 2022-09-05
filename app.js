const express = require('express');
const path = require ('path');
const app = express() ;

const publicPath = path.resolve(__dirname, './public');
app.use( express.static(publicPath) ); 

app.listen(4000,function() {
    console.log('Corriendo');
});

app.get('/Index', (req,res) => {
    res.sendFile(path.join(__dirname,'./views/index.html'));
});

app.get('/detalle-producto',(req,res) => {
    res.sendFile(path.join(__dirname,'/views/detalle-producto.html'))
})

app.get('/productos',(req,res) => {
    res.sendFile(path.join(__dirname,'/views/productos.html'))
})
app.get('/carrito-compras', (req,res) =>{
    res.sendFile(path.resolve(__dirname, './views/carrito.html'));  // Permite enviar un archivo HTML
});
