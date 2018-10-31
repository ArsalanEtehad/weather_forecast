const request = require('request'); //simplified HTTP request Client
const config = require('../config.js');


var forecast = (lat,lng)=>{
    var forecast_url = `https://api.darksky.net/forecast/`;
    forecast_url += config.keys.DARK_SKY_API;
    forecast_url += `/${lat},${lng}`;
    request({
      url: forecast_url,
      json: true //tells the request library to parse the body as JSON. Otherwise have to JSON.parse(body)
    }, function (error, response, body) {
      if(!error && response.statusCode === 200){
        var c_degree = (body.currently.temperature-32)*5/9;
      console.log(`${body.currently.temperature.toFixed(2)}˚F ≈`+ ` ${c_degree.toFixed(2)}˚C`); //(32°F − 32) × 5/9 = 0°C
      console.log(body.currently.summary);
    }else{
      console.log('Unable to fetch weather.');
      }
    });
}

module.exports ={
  forecast: forecast
}
