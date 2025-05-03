const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Redirección a login si se accede a la raíz
router.get('/', (req, res) => {
  res.redirect('/login');
});

router.get('/login', authController.login);
router.post('/add', authController.verificacion);
router.get('/logout', authController.logout);

module.exports = router;
