const PDFDocument = require('pdfkit');
const fs = require('fs');
const ventasController = {};

// Listar ventas
ventasController.list = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('SELECT * FROM factura', (err, ventas) => {
            if (err) {
                return res.json(err);
            }

            res.render('ventas', { data: ventas });
        });
    });
};

// Guardar venta
ventasController.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('INSERT INTO factura SET ?', [data], (err, result) => {
            if (err) {
                return res.json(err);
            }

            console.log("Venta agregada:", result);
            res.redirect('/ventas');
        });
    });
};

// Eliminar venta
ventasController.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        conn.query('DELETE FROM factura WHERE id = ?', [id], (err, result) => {
            if (err) {
                return res.json(err);
            }

            console.log("Venta eliminada:", result);
            res.redirect('/ventas');
        });
    });
};

const path = require('path'); // Asegúrate de requerir el módulo path

ventasController.generateInvoice = (req, res) => {
    const { id } = req.params;

    req.getConnection((err, conn) => {
        if (err) {
            return res.json(err);
        }

        // Obtener los detalles de la venta desde la tabla 'factura'
        conn.query('SELECT * FROM factura WHERE id = ?', [id], (err, factura) => {
            if (err) {
                return res.json(err);
            }

            if (factura.length === 0) {
                return res.status(404).send('Factura no encontrada');
            }

            // Calcular el total sumando la cantidad a pagar y el impuesto
            const totalConImpuesto = parseFloat(factura[0].cantidadPagar) + parseFloat(factura[0].impuesto);

            // Crear el documento PDF
            const doc = new PDFDocument({
                size: 'A4',
                margin: 50,
            });

            doc.font('Helvetica-Bold').fontSize(20).text('Factura', { align: 'center' });
            doc.moveDown(1);
            doc.font('Helvetica').fontSize(12).text('--------------------------------------------------');
            doc.moveDown(2);

            doc.font('Helvetica-Bold').fontSize(14).text('Producciones Estuardo', { align: 'center' });
            doc.font('Helvetica').fontSize(12).text('Dirección: Calle Ficticia 123', { align: 'center' });
            doc.text('Teléfono: +123 456 7890', { align: 'center' });
            doc.text('Correo: info@empresa.com', { align: 'center' });
            doc.moveDown(2);

            doc.font('Helvetica-Bold').fontSize(12).text(`Factura ID: ${factura[0].id}`, { align: 'left' });
            doc.text(`Fecha: ${new Date().toLocaleDateString()}`, { align: 'left' });
            doc.moveDown();

            doc.font('Helvetica').fontSize(12)
                .text(`Descripción: ${factura[0].descripcion}`, { align: 'left' })
                .moveDown()
                .text(`Cantidad de Producto: ${factura[0].cantidadDeProducto}`, { align: 'left' })
                .moveDown()
                .text(`Cantidad a Pagar: $${factura[0].cantidadPagar}`, { align: 'left' })
                .moveDown()
                .text(`Impuesto: $${factura[0].impuesto}`, { align: 'left' })
                .moveDown()
                .text(`Total (Cantidad a Pagar + Impuesto): $${totalConImpuesto.toFixed(2)}`, { align: 'left' });
            
            // Agregar la imagen al PDF (asegúrate de que la ruta sea correcta)
            const imagePath = path.join(__dirname, '..', 'public', 'Imagen1.png'); // Ajusta esta ruta
            doc.image(imagePath, {
                fit: [150, 150],
                align: 'center',
                valign: 'center'
            });

            doc.moveDown(2);
            doc.lineWidth(1).moveTo(50, doc.y).lineTo(550, doc.y).stroke(); 

            doc.moveDown(2);
            doc.font('Helvetica').fontSize(10).text('Gracias por su compra.', { align: 'center' });
            doc.text('Para más información, contáctenos a nuestro soporte.', { align: 'center' });
            
            const fileName = `factura_${factura[0].id}.pdf`;
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

            doc.pipe(res);

            doc.end();
        });
    });
};



module.exports = ventasController;
