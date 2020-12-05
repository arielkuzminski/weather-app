const request = require('postman-request');

const forecast = (latitude, longtitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=ad496044127d93fa3c4bbb7e7c47e671&query=${latitude},${longtitude}`;

    request({url, json: true}, (error, {body}) => {
        const data = body.current;
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        } else if (body.current.length === 0) {
            callback('Unable to find weather. Try another search!', undefined);
        } else {
            const currentTemperature = data.temperature;
            const currentFeelTempereature = data.feelslike;
            callback(undefined, {
                currentTemperature,
                currentFeelTempereature
            });
        }
    }); 
}

module.exports = forecast;