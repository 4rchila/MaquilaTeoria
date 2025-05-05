const finanzasController = {};

finanzasController.list = (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        const filtro = req.query.filtro || 'todos';
        let transacciones = [];

        // Consulta para total de ingresos
        connection.query("SELECT COALESCE(SUM(cantidadPagar), 0) AS totalIngresos FROM FACTURA", (err, ingresosResult) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            const totalIngresos = ingresosResult[0].totalIngresos;

            // Consulta para total de egresos
            connection.query("SELECT COALESCE(SUM(monto), 0) AS totalEgresos FROM egresos", (err, egresosResult) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json(err);
                }

                const totalEgresos = egresosResult[0].totalEgresos;
                const totalUtilidades = totalIngresos - totalEgresos;

                // Función para renderizar
                const renderizarVista = () => {
                    res.render("finanzas", {
                        resumen: {
                            ingresos: totalIngresos,
                            gastos: totalEgresos,
                            balance: totalUtilidades,
                        },
                        transacciones: transacciones.sort((a, b) => new Date(b.fecha) - new Date(a.fecha)),
                        filtro
                    });
                };

                // Consulta transacciones ingresos
                if (filtro === 'todos' || filtro === 'ingreso') {
                    connection.query(`
                        SELECT id, description AS concepto, amount AS monto, fechaVenta AS fecha 
                        FROM FACTURA 
                        ORDER BY fechaVenta DESC LIMIT 10
                    `, (err, ingresos) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json(err);
                        }

                        transacciones = ingresos.map(item => ({ ...item, tipo: 'ingreso' }));

                        // Consulta transacciones egresos
                        if (filtro === 'todos' || filtro === 'gasto') {
                            connection.query(`
                                SELECT id, concepto, monto, fecha 
                                FROM egresos 
                                ORDER BY fecha DESC LIMIT 10
                            `, (err, egresos) => {
                                if (err) {
                                    console.error(err);
                                    return res.status(500).json(err);
                                }

                                transacciones = transacciones.concat(egresos.map(item => ({ ...item, tipo: 'gasto' })));
                                renderizarVista();
                            });
                        } else {
                            renderizarVista();
                        }
                    });
                } else if (filtro === 'gasto') {
                    connection.query(`
                        SELECT id, concepto, monto, fecha 
                        FROM egresos 
                        ORDER BY fecha DESC LIMIT 10
                    `, (err, egresos) => {
                        if (err) {
                            console.error(err);
                            return res.status(500).json(err);
                        }

                        transacciones = egresos.map(item => ({ ...item, tipo: 'gasto' }));
                        renderizarVista();
                    });
                } else {
                    renderizarVista();
                }
            });
        });
    });
};

// Método para registrar egresos (sin campo tipo)
finanzasController.registrarEgreso = (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        const { concepto, monto, fecha } = req.body;
        
        if (!concepto || !monto || !fecha) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        connection.query('INSERT INTO egresos SET ?', {
            concepto,
            monto,
            fecha
        }, (error, results) => {
            if (error) {
                console.error("Error al registrar egreso:", error);
                return res.status(500).json({ error: "Error al registrar el egreso" });
            }
            
            res.redirect('/finanzas');
        });
    });
};

module.exports = finanzasController;