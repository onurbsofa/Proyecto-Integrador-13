const mainControllers = require('../controllers/mainControllers');

const express = require('express');
const router = express.Router();

router.get('/', mainControllers.index);
router.get('/carrito-compras', mainControllers.carritoCompras);


module.exports = router;
