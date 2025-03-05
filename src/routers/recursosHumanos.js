const express = require('express');
const router = express.Router();

const recursosHumanosController = require('../controllers/recursosHumanosController');

router.get('/', recursosHumanosController.list);
router.post('/add', recursosHumanosController.save);
router.get('/delete/:id', recursosHumanosController.delete);

router.get('/update/:id', recursosHumanosController.edit);
router.post('/update/:id', recursosHumanosController.update);

module.exports = router;

