const express = require('express');
const router = express.Router();

// Importación correcta del controlador
const finanzasController = require('../controllers/finanzasController');

// Verificación de que el controlador se importó correctamente
console.log('Controlador importado:', finanzasController);

// Rutas
router.get('/', finanzasController.list);
router.post('/registrar', finanzasController.registrarEgreso);

module.exports = router;