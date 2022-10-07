const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productos.json');
const productosJson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));



const productControllers = {
    listadoProductos : (req,res) => {
        res.render('product/listado-de-productos');
    },
    
    detalleProducto : (req,res) => {
        res.render('product/detalle-producto');
    },
    nuevoProducto : (req,res) => {
        res.render('product/nuevo-producto', {productosJson});
    },

    // Para crear un nuevo producto
	crear: (req, res) => {
		let datos = req.body;
		let idNuevoProducto = (productosJson[productosJson.length-1].id)+1;


		let nuevoProducto = {
			"id" : idNuevoProducto,
			"nombre" : datos.nombre,
			"categoria" :datos.categoria,
			"imagen": req.file.filename,
			"precio":  parseInt(datos.precio),
			"cantidad": parseInt(datos.cantidad),
			"tamano" : datos.tamano ,
			"descripcion" : datos.descripcion
		};

		productosJson.push(nuevoProducto);
		fs.writeFileSync(productsFilePath, JSON.stringify(productosJson, null, " "), 'utf-8');

		res.redirect('/');
	},

    editarProducto : (req,res) => {

        let idProducto = req.params.id;

		let productoBuscado=null;

		for (let o of productosJson){
			if (o.id==idProducto){
				productoBuscado=o;
				break;
			}
		}

		if (productoBuscado!=null){
			res.render('product/editar-producto', {producto : productoBuscado });
		}

		res.send("Producto no encontrado");
        
    },
}

module.exports = productControllers;