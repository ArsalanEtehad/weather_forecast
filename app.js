const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');
const forecast = require('./weather/forecast.js');
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


geocode.geocodeAddress(argv.address, (errorMessage, geoResults)=>{
//this arrow function  will be called after the geoiocodeAddress(argv.address) request got back
if(errorMessage){
  console.log(errorMessage);
}else{
  console.log(geoResults.address);
    forecast.getForecast(geoResults.Latitude, geoResults.Longitude, (weatherErrorMessage, weatherResults)=>{
      //Again another call back in the function: this arrow function  will be called after the geoiocodeAddress(argv.address) request got back
      if(weatherErrorMessage){
        console.log(weatherErrorMessage);
      }else{
        console.log(`It's currently ${weatherResults.celcius.toFixed(2)}˚C but it feels like ${weatherResults.apparent_celcius.toFixed(2)}˚C`);
      }
    });

  }
});
