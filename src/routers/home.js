const express = require('express');
const router = express.Router();

// Ejemplo: Simulando la obtención de datos
const getSalesTotal = async () => {
    // Aquí iría tu lógica para obtener el total de ventas
    return 12345.67;
};

const getNewOrders = async () => {
    return 105;
};

const getActiveClients = async () => {
    return 550;
};

const getConversionRate = async () => {
    return 5.2;
};

router.get('/', async (req, res) => {
    try {
        const salesTotal = await getSalesTotal();
        const newOrders = await getNewOrders();
        const activeClients = await getActiveClients();
        const conversionRate = await getConversionRate();

        res.render('InicioEstilo/home', {
            title: 'Inicio',
            salesTotal: salesTotal,
            newOrders: newOrders,
            activeClients: activeClients,
            conversionRate: conversionRate
        });
    } catch (error) {
        console.error("Error al obtener datos:", error);
        res.status(500).send("Error al cargar la página de inicio");
    }
});

module.exports = router;