const express = require('express')  //команда require дает доступ к модулю express (просто импорт модуля), подключаем пакет експресс (он позволяет создавать простые веб сервера на основе nodejs) в скрипт

const bodyParser = require('body-parser')
const weatherRequest = require('./requests/weather-request')  //импортируем функцию

const app = express()  //создаем перемен кот будет отвечать за все приложение (она определяется результатом работы функц express)

//у глобального обьекта app вызовем метод set
app.set('view engine', 'ejs')  //по умолчанию будут файлы ejs
//view engine движок кот отвечает за рендеринг страниц написан на ejs

//для добавления стилей, обозначаем експрессу какой путь является статическим. Приложение апп, метод юз(позволяет использовать дополнительные опции в нашем приложении). Переменная експресс и вызовем у нее метод статик - обозначит путь который статик - папка паблик
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

//прилож app, обращаемся к его методу get, указываем роут слеш, а второй параметр это коллбек функц с двумя параметрамир реквест и респонс
app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null}) //при запросе на корневую страницу нашего приложения методом гет, мы будем рендерить файл index с расширением get js
})

//обрабатываем post запрос, возвращает ту же страницу но с отрендереними параметрами (с прогнозом погоды)
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
})  // у обьекта app вызываем метод listen, первое значение тот порт на кот будем запускать приложение