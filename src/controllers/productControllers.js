
const fs = require('fs');
const path = require('path');




//base de datos
let db = require('../database/models')


const productControllers = {
    listadoProductos : (req,res) => {
		db.producto.findAll()// busca todos los registros del modelo con ese alias 
			.then(function(producto){
				res.render('product/listado-de-productos', {producto:producto})//comparte la variable del modelo con la vista
			})
		
        
    },
    
    detalleProducto : (req,res) => {

		db.producto.findAll()// busca todos los registros del modelo con ese alias 
			.then(function(productos){
		db.producto.findByPk(req.params.id, {
			include : [{association : "pais"}, {association : "cuerpo"}, {association : "intensidad"}]
		})
			.then(function(producto){
				res.render('product/detalle-producto',{producto:producto, productos:productos})
			})
		})


    },

    nuevoProducto : (req,res) => {
			db.producto.findAll()// busca todos los registros del modelo con ese alias 
				.then(function(producto){
					res.render('product/nuevo-producto', {producto:producto})//comparte la variable del modelo con la vista
				})
    },

    // Para crear un nuevo producto
	crear: (req, res) => {
		let datos = req.body;
		
		//busca el pais id en la tabla pais
		let paisProducto = 
			db.pais.findOne({
				where : {nombre: datos.pais}
			}).then((resultadoPais) => {
				return resultadoPais})
		
		//busca el cuerpo id en la tabla cuerpo
		let cuerpoProducto = 
			db.cuerpo.findOne({
				where : {nombre: datos.cuerpo}
			}).then((resultadoCuerpo) => {
				return resultadoCuerpo})
		
		//busca el intensidad id en la tabla intensidad
		let intensidadProducto = 
			db.intensidad.findOne({
				where : {nombre: datos.intensidad}
			}).then((resultadoIntensidad) => {
				return resultadoIntensidad})
			
			
		//realiza las busquedas en la bbdd y luego crea el producto
		Promise.all([paisProducto,cuerpoProducto,intensidadProducto])
			.then(function([pais,cuerpo,intensidad]){		
		db.producto.create({
            nombre : datos.nombre,
            precio : parseInt(datos.precio),
            imagen : req.file.filename,
            descripcion : datos.descripcion,
            pais_id : pais.id,
			cuerpo_id : cuerpo.id,
			intensidad_id: intensidad.id
          
          })
          


        //Reenvia a la vista listado de productos */
		res.redirect('/product/listado-de-productos');

		})
		//terminan los then de las tablas con los ids de pais, cuerpo e intensidad
	},

    //Ver el producto a editar
    editarProducto : (req,res) => {
		db.producto.findByPk(req.params.id)
			.then(function(producto){
				res.render('product/editar-producto', {producto : producto})
			})



    },

    //Para acutalizar el producto desde el form de edicion
    actualizarProducto: (req, res) => {
		let datos = req.body;
		let nuevaImagen = "";

		//si se sube una imagen la guarda en la variable nnueva imagen 
		//pero si no se sube una imagen, obtiene el nombre de la imagen del producto y la guarda en nueva imagen, 
		let imagenDelProducto = 
			db.producto.findByPk(req.params.id).then(function(producto){ //ACA COOREGI producto.params.id por req.params id
				if(req.file){
					nuevaImagen = req.file.filename
					fs.unlinkSync(__dirname+'/../../public/img/'+producto.imagen);
				} else {
					nuevaImagen = producto.imagen
				}
				return nuevaImagen;
			});
		//obtiene el pais del producto y lo guarda en una variable
		let paisProducto =
			db.pais.findOne({
				where : {nombre: datos.pais}
			}).then((resultadoPais) => {
				return resultadoPais
			});
		//obtiene el cuerpo del producto y lo guarda en una variable
		let cuerpoProducto = 
			db.cuerpo.findOne({
				where : {nombre: datos.cuerpo}
			}).then((resultadoCuerpo) => {
				return resultadoCuerpo
			});
		//obtiene la iuntensidad del producto y lo guarda en una variable
		let intensidadProducto = 
			db.intensidad.findOne({
				where : {nombre: datos.intensidad}
			}).then((resultadoIntensidad) => {
				return resultadoIntensidad
			});
		//espera que las demas promesas se terminen de ejecutar y guardar
		Promise.all([imagenDelProducto,paisProducto,cuerpoProducto,intensidadProducto])
			.then(function([imagen,pais,cuerpo,intensidad]){
				db.producto.update({
					nombre : datos.nombre,
					precio : parseInt(datos.precio),
					imagen : imagen,
					descripcion : datos.descripcion,
					pais_id : pais.id,
					cuerpo_id : cuerpo.id,
					intensidad_id: intensidad.id
				},{
					where : { id : req.params.id }
				})
			})
			.catch((error) =>{
				console.log(error);
			})
			
	

		res.redirect('/product/detalle-producto/'+req.params.id);
	},


	borrarProducto: (req, res) => {
		
		db.producto.destroy({
			where: {
				id: req.params.id
			}
		})

		res.redirect('/../product/listado-de-productos');

	},

	endpoint: (req,res) => {
		db.producto
			.findAll()
			.then(productos => {
				return res.status(200).json({
					total: productos.length,
					data:productos,
					status: 200
				})
			})
	}

}

module.exports = productControllers;