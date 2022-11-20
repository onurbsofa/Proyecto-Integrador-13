
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productos.json');
const productosJson = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


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
		db.producto.findByPk(req.params.id)
			.then(function(producto){
				res.render('product/detalle-producto',{producto:producto})
			})



        /* //Que ID estoy viendo
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
 */
    },

    nuevoProducto : (req,res) => {
        res.render('product/nuevo-producto', {productosJson});
    },

    // Para crear un nuevo producto
	crear: (req, res) => {
		let datos = req.body;
		
		db.pais.findOne({
			where : {nombre: datos.pais}
		}).then((resultadoPais) => {
			db.cuerpo.findOne({
				where : {nombre: datos.cuerpo}
			}).then((resultadoCuerpo) => {
				db.intensidad.findOne({
					where : {nombre: datos.intensidad}
				}).then((resultadoIntensidad) => {
			
			
		

		db.producto.create({
            nombre : datos.nombre,
            precio : parseInt(datos.precio),
            imagen : req.file.filename,
            descripcion : datos.descripcion,
            pais_id : resultadoPais.id,
			cuerpo_id : resultadoCuerpo.id,
			intensidad_id: resultadoIntensidad.id
          
          }).then(function(x){
          



       /*  let idNuevoProducto = 0 */

       /*  if (productosJson.length > 0){
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

        //Reenvia a la vista listado de productos */
		res.redirect('/product/listado-de-productos');

		})
		})})}) //terminan los then de las tablas con los ids de pais, cuerpo e intensidad
	},

    //Ver el producto a editar
    editarProducto : (req,res) => {
		db.producto.findByPk(req.params.id)
			.then(function(producto){
				res.render('product/editar-producto', {producto : producto})
			})





       /*  
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
         */
    },

    //Para acutalizar el producto desde el form de edicion
    actualizarProducto: (req, res) => {
		let datos = req.body;
		let nuevaImagen = "";

		//si se sube una imagen la guarda en la variable nnueva imagen 
		//pero si no se sube una imagen, obtiene el nombre de la imagen del producto y la guarda en nueva imagen, 
		let imagenDelProducto = 
			db.producto.findByPk(producto.params.id).then(function(producto){
				if(req.file){
					nuevaImagen = req.file.filename
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
			.then(function(imagen,pais,cuerpo,intensidad){
				db.producto.update({
					nombre : datos.nombre,
					precio : parseInt(datos.precio),
					imagen : imagen,
					descripcion : datos.descripcion,
					pais_id : pais.id,
					cuerpo_id : cuerpo.id,
					intensidad_id: intensidad.id
				})
			})
			.catch((error) =>{
				console.log(error);
			})
			
		res.redirect('/product/detalle-producto/'+req.params.id);
	},
		
		
	
		
		//solucin del json vieja
		
		/* let idProducto = req.params.id;

		let datos = req.body;

		let nombreImagenAntigua = "";

        //Actualiza el objeto producto con los nuevos datos del formulario de edicion
		
		
		
		for (let o of productosJson){
			if (o.id==idProducto){

				nombreImagenAntigua = o.imagen;

				//Si el usuario no agrega una nueva imagen, se mantiene la misma y el form no rompe
				if(req.file){
					nuevaImagen = req.file.filename
				} else {
					nuevaImagen = nombreImagenAntigua
				}

				

                o.nombre = datos.nombre,
                o.imagen = nuevaImagen,
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
		if(req.file) {
		fs.unlinkSync(__dirname+'/../../public/img/'+nombreImagenAntigua);
		}
 		*/
        //Reenvia a la vista del detalle de producto que acabamos de editar


	borrarProducto: (req, res) => {
		
		db.producto.destroy({
			where: {
				id: req.params.id
			}
		})


		/*//console.log("si llego");
		let idProducto = req.params.id;
		let cont=0;
		let nombreImagenAntigua = "";
		for (let o of productosJson){
			if (o.id==idProducto){
				nombreImagenAntigua = o.imagen;
				productosJson.splice(cont,1);
			}
			cont++;
			
		}

		console.log(productosJson)
		//Escribe el nuevo listado de productos en JSON
		fs.writeFileSync(productsFilePath,JSON.stringify(productosJson, null, " "),'utf-8');

		//Elimina la imagen actual
		fs.unlinkSync(__dirname+'/../../public/img/'+nombreImagenAntigua); */

		//Reenvia a la vista del detalle de producto que acabamos de editar
		res.redirect('/../product/listado-de-productos');

	},

}

module.exports = productControllers;