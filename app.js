const path = require('path')
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const { title } = require('process')

const port = 3000

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static('public'))


app.get('/', (req,res) => {
  res.redirect('/pwgen')
})

app.get('/pwgen', (req, res) => {
  res.render('index', {title: 'password generator'})
})

app.listen(port, () => {
  console.log(`this is running at http://localhost:${port}`)
})