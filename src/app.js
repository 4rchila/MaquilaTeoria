const express = require('express');
const path = require('path');
const morgan = require('morgan');
const mysql2 = require('mysql2');
const myConnection = require('express-myconnection');
const cookieParser = require('cookie-parser')
const app = express();
const verificarToken = require('./middlewares/verifyToken')
// Importando routers
const customerRouters = require("./routers/customers");
const homeRouters = require("./routers/home");
const ventasRouters = require("./routers/ventas");
const recursosHumanosRouters = require("./routers/recursosHumanos");
const finanzasRouters = require("./routers/finanzas");
const authRouter = require("./routers/auth");

// Configuración del servidor
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql2, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'maquilasistemamysql'
}, 'single'));
app.use(express.urlencoded({ extended: false }));
// Servir archivos estáticos desde "src/public"
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())
// Rutas
app.use('/', authRouter);
app.use('/home', verificarToken ,homeRouters);
app.use('/inventario', verificarToken,customerRouters);
app.use('/ventas', verificarToken,ventasRouters);
app.use('/recursosHumanos', verificarToken,recursosHumanosRouters);
app.use('/finanzas', verificarToken, finanzasRouters);

module.exports = app;
