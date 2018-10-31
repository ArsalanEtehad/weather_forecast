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
    console.log(JSON.stringify(geoResults,undefined,2));
    forecast.forecast(geoResults.Latitude, geoResults.Longitude, (errorMessage, weatherResults)=>{
      if(errorMessage){
        console.log(errorMessage);
      }else{
        console.log(JSON.stringify(weatherResults,undefined,2));
      }
    });

  }
});
