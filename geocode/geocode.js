const request = require('request'); //simplified HTTP request Client
const config = require('../config.js');

var geocodeAddress = (input_addr, callback) =>{

  var encoded_uri_addr = encodeURIComponent(input_addr) //'Arsalan Ettehad' -> 'Arsalan%20Ettehad'
  // var decoded_uri_addr = decodeURIComponent(encoded_uri_addr) //'Arsalan%20Ettehad' -> 'Arsalan Etthead'
  var geo_api_key = config.keys.GEO_API_KEY;
  var addr_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_uri_addr}&key=${geo_api_key}`;
  // console.log(addr_url);
  request({
    url: addr_url,
    json: true
  },(error, response, body)=>{ //the body is the google's response for the http request - which is JSON information in our case
    if(error){
      callback(`Unable to connect to Google servers.\n`);
    }else if(body.status === "ZERO_RESULTS"){
      callback(`This is not a valid address`); //API response is: {results: [ ],status: "ZERO_RESULTS"}
    }else if(body.status === "OK"){//{ results: [.....],status: "OK"}
      callback(undefined,{ //undefined for the errorMessage
        address: body.results[0].formatted_address,
        Latitude: body.results[0].geometry.location.lat,
        Longitude: body.results[0].geometry.location.lng
      })
    }
  });

}


module.exports ={
  geocodeAddress
}
