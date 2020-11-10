if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')

const app = express()

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb', extended: false})) 

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
})
const db = mongoose.connection
db.on('error', err => console.error(err))
db.once('open', () => console.log('Connected to mongoose'))

app.use('/', indexRouter)
app.use('/authors', authorRouter)

app.listen(process.env.PORT || 3000)