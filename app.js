const yargs = require('yargs');
const geocode = require('./geocode/geocode.js');

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

geocode.geocodeAddress(argv.address);
