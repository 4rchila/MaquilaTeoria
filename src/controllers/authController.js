const authController = {};
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET = 'clave_secreta';

authController.login = (req, res) => {
  res.render('login'); 
};

authController.verificacion = (req, res) => {
  const { nombre_usuario, pasword } = req.body;

  if (!nombre_usuario || !pasword) {
    return res.render('login', { error: 'Todos los campos son obligatorios.' });
  }

  req.getConnection((err, conn) => {
    if (err) {
      console.error(err);
      return res.render('login', { error: 'Error en la conexión a la base de datos.' });
    }

    const sql = 'SELECT * FROM usuarios WHERE nombre_usuario = ?';
    conn.query(sql, [nombre_usuario], async (err, results) => {
      if (err) {
        console.error(err);
        return res.render('login', { error: 'Error al consultar los datos.' });
      }

      if (results.length === 0) {
        return res.render('login', { error: 'Usuario no encontrado.' });
      }

      const user = results[0];

      try {
        const match = await bcrypt.compare(pasword, user.pasword);  
        if (!match) {
          return res.render('login', { error: 'Contraseña incorrecta.' });
        }

        const token = jwt.sign(
          { id: user.id, username: user.nombre_usuario },
          SECRET,
          { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true });
        res.redirect('/home');

      } catch (e) {
        console.error(e);
        return res.render('login', { error: 'Ocurrió un error durante la verificación.' });
      }
    });
  });
};

authController.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
};

module.exports = authController;
