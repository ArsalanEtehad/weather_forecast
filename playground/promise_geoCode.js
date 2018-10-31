const request = require('request'); //simplified HTTP request Client
const config = require('../config.js');

var geocodeAddress = (input_addr)=>{
  return new Promise((resolve, reject)=>{
    var encoded_uri_addr = encodeURIComponent(input_addr)
    var geo_api_key = config.keys.GEO_API_KEY;
    var addr_url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_uri_addr}&key=${geo_api_key}`;
    request({
      url: addr_url,
      json: true
    },(error, response, body)=>{
      if(error){
        reject(`Unable to connect to Google servers.\n`);
      }else if(body.status === "ZERO_RESULTS"){
        reject(`This is not a valid address`);
      }else if(body.status === "OK"){
        resolve({
          address: body.results[0].formatted_address,
          Latitude: body.results[0].geometry.location.lat,
          Longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};


geocodeAddress("turin").then((location)=>{
  console.log(JSON.stringify(location,undefined,2));
},(errorMessage)=>{
  console.log(errorMessage);
})
