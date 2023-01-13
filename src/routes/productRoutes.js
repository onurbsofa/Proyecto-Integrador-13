const productControllers = require('../controllers/productControllers');

const express = require('express');
const router = express.Router();
const multer = require('multer'); //Multer
const path = require('path');
const { check, validationResult, body} = require('express-validator');
const usuarioMiddleware = require('../middlewares/usuarioMiddleware');

//variable almacenamiento Multer
const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
       cb(null, path.join(__dirname,'../../public/img'));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let imageName = Date.now() + path.extname(file.originalname);   // milisegundos y extensión de archivo original
       cb(null, imageName);         
    }
});

const uploadFile = multer({ storage: multerDiskStorage });


router.get('/listado-de-productos', productControllers.listadoProductos);
router.get('/detalle-producto/:id', productControllers.detalleProducto);

//Crear producto
router.get('/nuevo-producto',usuarioMiddleware, productControllers.nuevoProducto);
router.post('/nuevo-producto',usuarioMiddleware, uploadFile.single('imagen') , productControllers.crear); 

//Editar Producto
router.get('/editar-producto/:id',usuarioMiddleware, productControllers.editarProducto);
router.put('/editar-producto/:id', uploadFile.single('imagen'), productControllers.actualizarProducto); 

//Borrar Producto
//router.get('/borrar-producto', productControllers.nuevoProducto);
router.post('/borrar-producto/:id',usuarioMiddleware, productControllers.borrarProducto);

//api de productos
router.get('/APIproductos', productControllers.endpoint);
//api de productos
 router.get('/APIproductos/:id', productControllers.buscarPorId);

 //api de paises
router.get('/APIpaises', productControllers.paisesApi);

 

module.exports = router;