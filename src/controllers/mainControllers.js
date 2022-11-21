const fs = require('fs');
const path = require('path');


//base de datos
let db = require('../database/models')

const mainControllers = {


index : (req,res) => {
    db.producto.findAll()// busca todos los registros del modelo con ese alias 
			.then(function(producto){
				res.render('index', {producto:producto})//comparte la variable del modelo con la vista
			})

},

carritoCompras : (req,res) =>{
    res.render('carrito');  
},

}

module.exports = mainControllers;