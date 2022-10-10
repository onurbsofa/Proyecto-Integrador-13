const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productos.json');
const productosJson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainControllers = {


index : (req,res) => {
    res.render('index' ,{productosJson});
},

carritoCompras : (req,res) =>{
    res.render('carrito');  
},

}

module.exports = mainControllers;