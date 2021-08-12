const express = require('express')  //импорт модуля експресс, веб сервер на основе nodejs

const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather-request') 

const app = express()

app.set('view engine', 'ejs')  //по умолчанию файлы ejs
//view engine движок кот отвечает за рендеринг страниц написан на ejs

//для добавления стилей, обозначаем експрессу какой путь является статическим.
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

//роут слеш, а второй параметр это коллбек функц с двумя параметрамир реквест и респонс
app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null}) //при запросе на корневую страницу нашего приложения методом гет, мы будем рендерить файл index с расширением get js
})

//обрабатываем post запрос, возвращает ту же страницу но с отрендереними параметрами с прогнозом погоды
app.post('/', async (req, res) => {
    const { city } = req.body

    //функ weatherRequest является асинхронной, поэтому мы должны ее подожать и пишем await 
    const {weather, error} = await weatherRequest(city)
    //console.log('Weather', weather)
    //console.log('Error', error)
    res.render('index', {weather, error})
})

app.listen(3000, () => {
    console.log('Server has started on port 3000...')
})  // у обьекта app вызываем метод listen, первое значение порт где запускать приложение
