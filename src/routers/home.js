const express = require('express')
const router = express.Router()

// Definir rutas aquí
router.get('/', (req, res) => {
    res.send('Página del home')
})

module.exports = router