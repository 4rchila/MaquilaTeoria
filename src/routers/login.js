const express = require('express')
const router = express.Router()

// Definir rutas aquí
router.get('/', (req, res) => {
    res.send('Página del login')
})

module.exports = router