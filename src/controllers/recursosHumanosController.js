const recursosHumanosController = {};  // Cambiar nombre

recursosHumanosController.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            res.json(err);
            return;
        }

        conn.query('SELECT * FROM empleados', (err, empleados) => {
            if (err) {
                res.json(err);
                return;
            }

            res.render('empleados', { data: empleados });
        });
    });
};

module.exports = recursosHumanosController;  // Asegurar exportación correcta
