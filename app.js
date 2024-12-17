const path = require('path')
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const passwordGenerator = require(path.join(__dirname, 'public/javasripts/random-password.js'))
const { title } = require('process')

const port = 3000
const pwGentor = new passwordGenerator(); 

app.engine('.hbs', engine({extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))


app.get('/', (req,res) => {
  res.redirect('/pwgen')
})

app.get('/pwgen', (req, res) => {
  res.render('index', {title: 'password generator'})
})

app.post('/pwgen', (req, res) => {
  res.render('index', { ...dataProcesssing(req.body), title: 'password generator' })
})

app.listen(port, () => {
  console.log(`this is running at http://localhost:${port}`)
})


// function

function dataProcesssing(body) {
  const data = {
    pwLength: body['pw-length'] ?? '4',
    pwInLow: body['pw-in-low'] ?? '',
    pwInUpper: body['pw-in-upper'] ?? '',
    pwInNum: body['pw-in-num'] ?? '',
    pwInSym: body['pw-in-sym'] ?? '',
    pwExcludeChar: body['pw-exclude-char'] ?? ''
  }

  data.pwResult = pwGentor.passwordGenerator(data);
  console.log(data)
  return data;
}