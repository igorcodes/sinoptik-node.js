const rp = require('request-promise')  //подключаем пакет из ноде модулес, который будет выполнять асинхронный запрос

//експортируем асинхронную функцию 
module.exports = async function(city = '') {
    if (!city) {  //если не вел то ошибку
        throw new Error('Название города не может быть пустым')
    }

    const KEY = '010da82d435e0a07a56b34ca4a9d3f52'

    const uri = 'https://api.openweathermap.org/data/2.5/weather'

    //делаем запрос для получения погоды

    //создаем обьект конфигурации для запроса, параметры смотрим тут https://www.npmjs.com/package/request-promise
    const options = {
        uri,
        qs: {
            appid: KEY, 
            q: city, 
            units: 'imperial'
        }, 
        json: true  //для того чтобы request сразу распарсил все в json
    }

    try {
    //созданный выше обьект options передадим в функцию request promise
    const data = await rp(options) //с помощью оператора await ждем асинхронного выполнения запроса

    const celsius = (data.main.temp - 32) * 5/9

    //если ошибки нет возвращаем обьект, поле везер пока равно пустой строке
    return {
        weather: `${data.name}: +${celsius.toFixed(0)}`, 
        error: null
    }

    } catch (error) {
        //console.log(error)
        return {
//в обьекте error есть поле error.error.message кот содержит текст ошибки
            weather: null, 
            error: error.error.message
        }
    }


}