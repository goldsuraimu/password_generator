const path = require('path')
const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const PasswordGenerator = require(path.join(__dirname, 'public/javascripts/random-password.js'))

const port = 3000
const PwGentor = new PasswordGenerator()

app.engine('.hbs', engine({ extname: '.hbs' }))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.redirect('/pwgen')
})

app.get('/pwgen', (req, res) => {
  res.render('index', { itle: 'password generator', resultVisible: 'd-none' })
})

app.post('/pwgen', (req, res) => {
  res.render('index', { ...dataProcesssing(req.body), title: 'password generator' })
})

app.listen(port, () => {
  console.log(`this is running at http://localhost:${port}`)
})

// function

function dataProcesssing (body) {
  const data = {
    pwLength: body['pw-length'] ?? '4',
    pwInLow: body['pw-in-low'] ?? '',
    pwInUpper: body['pw-in-upper'] ?? '',
    pwInNum: body['pw-in-num'] ?? '',
    pwInSym: body['pw-in-sym'] ?? '',
    pwExcludeChar: body['pw-exclude-char'] ?? '',
    pwBdColor: '',
    resultVisible: 'd-none', // 顯示密碼欄位，並根據是否為密碼顯示對應顏色
    resultTextColor: 'pw-result-text', // 對應密碼欄位顯示對應文字顏色
    pwResult: '' // 顯示密碼，如有錯誤根據錯誤內容提示
  }
  if (!pwLengthRange(data)) {
    data.pwBdColor = 'pw-length-wrong'
    data.resultVisible = 'alert-danger'
    data.resultTextColor = 'pw-wrong-text'
    data.pwResult = 'Length is available between 4 ~ 16'
    return data
  }
  // 判斷是否有勾選一個選項
  const isChecked = data.pwInLow || data.pwInUpper || data.pwInNum || data.pwInSym
  if (!isChecked) {
    data.resultVisible = 'alert-danger'
    data.resultTextColor = 'pw-wrong-text'
    data.pwResult = 'you need to select at least one'
    return data
  }
  // 判斷是否有正確產生密碼
  const pw = PwGentor.passwordGenerator(data)
  data.resultVisible = pw ? 'alert-info' : 'alert-danger'
  data.resultTextColor = pw ? 'pw-result-text' : 'pw-wrong-text'
  data.pwResult = pw ? `Your password is: ${pw}` : 'no characters available'

  return data
}
// 限制密碼長度範圍
function pwLengthRange (data) {
  const length = Number(data.pwLength)
  const maxLength = 16
  const minLength = 4
  if (!(length <= maxLength && length >= minLength)) {
    return false
  }
  return true
}
