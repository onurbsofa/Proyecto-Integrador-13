const productosJson = require("../database/productos.json")


const productControllers = {
    listadoProductos : (req,res) => {
        res.render('product/listado-de-productos', {productosJson});
    },
    
    detalleProducto : (req,res) => {
        res.render('product/detalle-producto');
    },
    nuevoProducto : (req,res) => {
        res.render('product/nuevo-producto');
    },
    editarProducto : (req,res) => {
        res.render('product/editar-producto');
    },
}

module.exports = productControllers;