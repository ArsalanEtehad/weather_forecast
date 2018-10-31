const yargs = require('yargs');
const axios = require('axios');
const geocode = require('./geocode/promise_geocode.js');
const forecast = require('./weather/forecast.js');
const config = require('./config');


const argv = yargs
  .option({
    address: {
        describe: "Address to fetch weather for",
        demand: true,
        alias: 'a'
        }
  })
  .help()
  .alias('help','h')
  .argv;


  var encoded_uri_addr = encodeURIComponent(argv.address)
  var geo_api_key = config.keys.GEO_API_KEY;
  var addr_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_uri_addr}&key=${geo_api_key}`;

  axios.get(addr_url).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('Unable to find the address.');
    }
    console.log(response.data.results[0].formatted_address); //Beauty of throw the Error: no need to put a else here. It will stop at the Error

    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;

    var forecast_url = `https://api.darksky.net/forecast/`;
    forecast_url += config.keys.DARK_SKY_API;
    forecast_url += `/${lat},${lng}`;

    axios.get(forecast_url).then((weatherResponse)=>{
      console.log(weatherResponse.data.currently.summary);

    }).catch((e)=>{
      if(e.code === 'ENOTFOUND'){//I found it by printing out the e first when error occured.
        console.log('ENOTFOUND...');
      }else{
      console.log(e.message);
    }
    });
  }).catch((e)=>{
    if(e.code === 'ENOTFOUND'){//I found it by printing out the e first when error occured.
      console.log('ENOTFOUND...');
    }else{
    console.log(e.message);
  }
  });
