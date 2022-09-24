const controllers = {


index : (req,res) => {
    res.render('index');
},

detalleProducto : (req,res) => {
    res.render('detalle-producto');
},

productos : (req,res) => {
    res.render('listado-de-productos');
},

carritoCompras : (req,res) =>{
    res.render('carrito');  
},

login :  (req,res) =>{
    res.render('login');  
},

registro : (req,res) =>{
    res.render('registro');               
},

recContra : (req,res) =>{
    res.render('rec_contra');            
}

}

module.exports = controllers;