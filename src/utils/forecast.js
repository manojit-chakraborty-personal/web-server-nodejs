import request from 'postman-request'

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=98d5a9bc72a98fa048a768d29405d1b3&query=${latitude},${longitude}`;

    request({url: url, json: true}, (error, body, {current}) => {
        if(error)
        {
            callback('Unable to connect to weather services', undefined)
        }
        else if(current.length === 0)
        {
            callback("Could not find the location that you are searching for, please provide a valid location")
        }
        else
        {
            callback(undefined, {
                weather_description: current.weather_descriptions[0],
                temperature: 'It is currently ' + current.temperature + '°C out.',
                feelsLike: 'It feels like ' + current.feelslike + '°C out'
            })
        }
    });
}

export default forecast