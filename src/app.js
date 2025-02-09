const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mysql2 = require('mysql2')
const myConnection = require('express-myconnection')

const app = express()

// Importando routers
const loginRouters = require("./routers/login")
const customerRouters = require("./routers/customers")
const homeRouters = require("./routers/home")
const ventasRouters = require("./routers/ventas")

// Configuración del servidor
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Middlewares
app.use(morgan('dev'))
app.use(myConnection(mysql2, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'maquilasistemamysql'
}, 'single'))
app.use(express.urlencoded({ extended: false }))

// Servir archivos estáticos desde "src/public"
app.use(express.static(path.join(__dirname, 'src/public')))

// Rutas
app.use('/', loginRouters)
app.use('/Home', homeRouters)
app.use('/inventario', customerRouters)  // Asegurar ruta correcta
app.use('/ventas', ventasRouters)

// Iniciando el servidor
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})

