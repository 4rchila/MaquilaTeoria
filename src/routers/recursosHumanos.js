const express = require('express')
const router = express.Router()

const  recursosHumanosController = require('../controllers/recursosHumanosController')

router.get('/', recursosHumanosController.list)

module.exports = router;