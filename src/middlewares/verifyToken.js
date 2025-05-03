const jwt = require('jsonwebtoken');
const SECRET = 'clave_secreta';

function verificarToken(req, res, next) {
  const token = req.cookies?.token;  // Usa optional chaining por seguridad

  if (!token) {
    return res.redirect('/login');
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.redirect('/login');
    }

    req.user = decoded;
    next();
  });
}

module.exports = verificarToken;
