const todosControllers = require('../controllers/todosControllers');

const express = require('express');
const router = express.Router();

router.get('/', todosControllers.index);
router.get('/detalle-producto', todosControllers.detalleProducto);
router.get('/productos', todosControllers.productos);
router.get('/carrito-compras', todosControllers.carritoCompras);
router.get('/login', todosControllers.login);
router.get('/registro', todosControllers.registro);
router.get('/rec_contra', todosControllers.recContra);

module.exports = router;
