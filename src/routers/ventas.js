const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Definir rutas
router.get('/', ventasController.list);
router.post('/add', ventasController.save);
router.get('/delete/:id', ventasController.delete);
router.get('/factura/:id', ventasController.generateInvoice);



module.exports = router;

