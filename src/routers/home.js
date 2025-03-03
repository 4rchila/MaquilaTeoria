const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('InicioEstilo/home', {
        title: "Maquila POS - Dashboard",
        salesTotal: 43556.86,
        newOrders: 12235,
        activeClients: 573,
        conversionRate: 15.9
    });
});

router.get('/about', (req, res) => {
    res.render('about', { title: "Acerca de" });
});


module.exports = router;

