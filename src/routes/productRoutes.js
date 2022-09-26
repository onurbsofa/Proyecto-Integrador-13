const productControllers = require('../controllers/productControllers');

const express = require('express');
const router = express.Router();

router.get('/listado-de-productos', productControllers.listadoProductos);
router.get('/detalle-producto', productControllers.detalleProducto);
router.get('/nuevo-producto', productControllers.nuevoProducto);
router.get('/editar-producto', productControllers.editarProducto);

module.exports = router;