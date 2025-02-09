const express = require('express')
const router = express.Router()

// Definir rutas aquí
router.get('/', (req, res) => {
    res.send('Página de ventas')
})

module.exports = router
