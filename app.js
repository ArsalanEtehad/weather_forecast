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
    console.log(response.data); //Beauty of throw the Error: no need to put a else here. It will stop at the Error 

  }).catch((e)=>{
    if(e.code === 'ENOTFOUND'){//I found it by printing out the e first when error occured.
      console.log('ENOTFOUND...');
    }else{
    console.log(e.message);
  }
  });
