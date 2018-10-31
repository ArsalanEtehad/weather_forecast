const request = require('request');
const config = require('../config.js');

var geocodeAddress = (input_addr) =>{

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
      console.log(`Unable to connect to Google servers.\n${error}`);
    }else if(body.status === "ZERO_RESULTS"){
      console.log(`This is not a valid address`); //API response is: {results: [ ],status: "ZERO_RESULTS"}
    }else if(body.status === "OK"){//{ results: [.....],status: "OK"}
      // console.log('error:', error); // Print the error if one occurred
      // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      // console.log(JSON.stringify(body,undefined,2)); //it can be just 1 arg: body. but 2 is spaces to look clearer
      console.log(`Address: ${body.results[0].formatted_address}`)
      console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
      console.log(`Longitude: ${body.results[0].geometry.location.lng}`);
    }
  });

}


module.exports ={
  geocodeAddress
}
