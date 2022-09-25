const productControllers = {
    listadoProductos : (req,res) => {
        res.render('product/listado-de-productos');
    },
    
    detalleProducto : (req,res) => {
        res.render('product/detalle-producto');
    },
    productoNuevo : (req,res) => {
        res.render('product/producto-nuevo');
    },
}

module.exports = productControllers;