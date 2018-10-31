const request = require('request'); //simplified HTTP request Client
const config = require('../config.js');


var getForecast = (lat,lng, callback)=>{
    var forecast_url = `https://api.darksky.net/forecast/`;
    forecast_url += config.keys.DARK_SKY_API;
    forecast_url += `/${lat},${lng}`;
    request({
      url: forecast_url,
      json: true //tells the request library to parse the body as JSON. Otherwise have to JSON.parse(body)
    }, function (error, response, body) {
      if(!error && response.statusCode === 200){
        callback(undefined,{//errorMessage = undefined
          fahrenheit: body.currently.temperature,
          celcius: (body.currently.temperature-32)*5/9,
          apparent_fahrenheit: body.currently.apparentTemperature,
          apparent_celcius: (body.currently.apparentTemperature-32)*5/9,
          current_summary: body.currently.summary
        })
      }else{
        callback('Unable to fetch weather.',undefined); //results = undefined , there is no need for undefined as it's the last argument and leaving it blank will make it undefined anyway.
      }
    });
}

module.exports ={
  getForecast
}
