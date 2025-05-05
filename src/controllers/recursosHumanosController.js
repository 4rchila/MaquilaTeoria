const recursosHumanosController = {};

recursosHumanosController.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }

        conn.query('SELECT * FROM empleados', (err, empleados) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }

            res.render('empleados', { data: empleados });
        });
    });
};

recursosHumanosController.save = (req, res) => {
    const data = req.body;
    console.log("Datos recibidos:", data);

    req.getConnection((err, conn) => {
        if (err) throw err;

        conn.query('INSERT INTO empleados SET ?', [data], (err) => {
            if (err) {
                console.error("Error al guardar el empleado:", err); //Muestra el error exacto
                return res.status(500).send("Error al guardar el empleado");
            }
            res.redirect('/recursosHumanos');
        });
    });
};


recursosHumanosController.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) throw err;

        conn.query('SELECT * FROM empleados WHERE id = ?', [id], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al obtener el empleado");
            }

            if (result.length === 0) {
                return res.status(404).send("Empleado no encontrado");
            }

            res.render('empleados_edit', { empleado: result[0] });
        });
    });
};

recursosHumanosController.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) throw err;

        conn.query('DELETE FROM empleados WHERE id = ?', [id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al eliminar el empleado");
            }
            res.redirect('/recursosHumanos');
        });
    });
};

recursosHumanosController.update = (req, res) => {
    const { id } = req.params;
    const newEmpleado = req.body;
    req.getConnection((err, conn) => {
        if (err) throw err;

        conn.query('UPDATE empleados SET ? WHERE id = ?', [newEmpleado, id], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error al actualizar el empleado");
            }
            res.redirect('/recursosHumanos');
        });
    });
};

module.exports = recursosHumanosController;
