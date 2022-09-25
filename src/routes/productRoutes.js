const productControllers = require('../controllers/productControllers');

const express = require('express');
const router = express.Router();

router.get('/listado-de-productos', productControllers.listadoProductos);
router.get('/detalle-producto', productControllers.detalleProducto);

module.exports = router;