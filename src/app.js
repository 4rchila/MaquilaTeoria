const express = require('express')
const path = require('path')
const morgan = require('morgan')
const mysql2 = require('mysql2')
const myConnection = require('express-myconnection')

const app = express()

//importing routers
const customerRouters = require("./routers/customers")
app.set('port', process.env.PORT || 3000)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))


// middlewares
app.use(morgan('dev'))
app.use(myConnection(mysql2, {
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: 3306,
    database: 'maquilasistemamysql'

}, 'single'))
app.use(express.urlencoded({extended: false}))

//routers
app.use('/', customerRouters)

//static files
app.use(express.static(path.join(__dirname, )))

//starting the server
app.listen(app.get('port'), ()=>{
    console.log('server on port 3000')
})