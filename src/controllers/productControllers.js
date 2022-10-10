
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productos.json');
const productosJson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const productControllers = {
    listadoProductos : (req,res) => {
		
        res.render('product/listado-de-productos', {productosJson});
    },
    
    detalleProducto : (req,res) => {

        //Que ID estoy viendo
        let idProducto = req.params.id;

		let productoBuscado=null;

        //Identifica que producto corresponde al ID solicitado
		for (let o of productosJson){
			if (o.id==idProducto){
				productoBuscado=o;
				break;
			}
		}

        //Si encuentra el producto con ese ID muestra la vista enviando la variable producto
		if (productoBuscado!=null){
			res.render('product/detalle-producto',{producto: productoBuscado});
		}

        //Si no encuentra el producto con ese ID envia este mensaje
		res.send("Producto no encontrado");

    },
    nuevoProducto : (req,res) => {
        res.render('product/nuevo-producto', {productosJson});
    },

    // Para crear un nuevo producto
	crear: (req, res) => {
		let datos = req.body;

        let idNuevoProducto = 0

        if (productosJson.length > 0){
		idNuevoProducto = (productosJson[productosJson.length-1].id)+1;
        } else {idNuevoProducto = 1 }


		let nuevoProducto = {
			"id" : idNuevoProducto,
			"nombre" : datos.nombre,
			"imagen": req.file.filename,
			"precio":  parseInt(datos.precio),
			"cantidad": parseInt(datos.cantidad),
            "pais" : datos.pais ,
            "cuerpo" : datos.cuerpo ,
            "intensidad" : datos.intensidad ,
			"descripcion" : datos.descripcion
		};

		productosJson.push(nuevoProducto);

        //Escribe el nuevo listado de productos en JSON
		fs.writeFileSync(productsFilePath, JSON.stringify(productosJson, null, " "), 'utf-8');

        //Reenvia a la vista del detalle de producto que acabamos de crear
		res.redirect('/product/detalle-producto/'+idNuevoProducto);
	},

    //Ver el producto a editar
    editarProducto : (req,res) => {

        
        //Que ID estoy viendo
        let idProducto = req.params.id;

		let productoBuscado=null;

        //Identifica que producto corresponde al ID solicitado
		for (let o of productosJson){
			if (o.id==idProducto){
				productoBuscado=o;
				break;
			}
		}

        //Si encuentra el producto con ese ID muestra la vista enviando la variable producto
		if (productoBuscado!=null){
			res.render('product/editar-producto', {producto : productoBuscado });
		}

        //Si no encuentra el producto con ese ID envia este mensaje
		res.send("Producto no encontrado");
        
    },

    //Para acutalizar el producto desde el form de edicion
    actualizarProducto: (req, res) => {
		let idProducto = req.params.id;

		let datos = req.body;

		let nombreImagenAntigua = "";

        //Actualiza el objeto producto con los nuevos datos del formulario de edicion
		for (let o of productosJson){
			if (o.id==idProducto){

				nombreImagenAntigua = o.imagen;

                o.nombre = datos.nombre,
                o.imagen = req.file.filename,
                o.precio =  parseInt(datos.precio),
                o.cantidad = parseInt(datos.cantidad),
                o.pais = datos.pais,
                o.cuerpo = datos.cuerpo,
                o.intensidad = datos.intensidad,
                o.descripcion = datos.descripcion
				break;
			}
		}

        //Escribe el nuevo listado de productos en JSON
		fs.writeFileSync(productsFilePath,JSON.stringify(productosJson, null, " "),'utf-8');

        //Elimina la imagen actual
		fs.unlinkSync(__dirname+'/../../public/img/'+nombreImagenAntigua);

        //Reenvia a la vista del detalle de producto que acabamos de editar
		res.redirect('/product/detalle-producto/'+idProducto);
	},
}

module.exports = productControllers;