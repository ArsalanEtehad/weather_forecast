const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const config = require('./config');
const request = require('request');

const argv = yargs.command('address', 'Getting the address ',{
    // address: {
    //     describe: "Street Address",
    //     demand: true,
    //     alias: 'a'
    //     }
  })
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


geocode.geocodeAddress(argv.address, (errorMessage, results)=>{
//this arrow function  will be called after the geoiocodeAddress(argv.address) request got back
if(errorMessage){
  console.log(errorMessage);
}else{
    // console.log(results.address);
    // console.log(`Latitude: ${results.Latitude}`);
    // console.log(`Longitude: ${results.Longitude}`);
    console.log(JSON.stringify(results,undefined,2));
    // console.log(results.body);

    forecast_url = `https://api.darksky.net/forecast/`;
    forecast_url += config.keys.DARK_SKY_API;
    forecast_url += `/${results.Latitude},${results.Longitude}`;
    request({
      url: forecast_url,
      json: true
    }, function (error, response, body) {
      console.log(body.currently.summary);

    });

  }
});
