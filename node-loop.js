// Subscribe to electricity and gas streams on Navetas Loop websockets
// Secrets and serial numbers can be found by logging into your-loop.com
// and evaluating the 'Drupal.settings.navetas_realtime' variable in browser console.

require( "console-stamp" )( console, { pattern : "dd/mm/yyyy HH:MM:ss.l" } );
var io = require('socket.io-client');


console.log('Starting');

var elec_serial = 'xxx';
var elec_secret = 'xxx';

// var gas_serial = 'xxx';
// var gas_secret = 'xxx';

// Need version 0.9.16, newer versions incompatible
var socket = io.connect('https://www.your-loop.com', {reconnect: true});

// Connect
socket.on('connect', function(){
  console.log('Connecting');

  // Subscribe to electricity readings in watts
  socket.emit("subscribe_electric_realtime", {
    serial: elec_serial,
    clientIp: '127.0.0.1',
    secret: elec_secret
  });

  // Subscribe to gas readings
  // socket.emit("subscribe_gas_interval", {
  //   serial: gas_serial,
  //   clientIp: '127.0.0.1',
  //   secret: gas_secret
  // });
});

// Output electricity readings (~1 per 10 seconds)
socket.on('electric_realtime', function(data) { console.log("Electricity:%j", data);});

// Output gas readings (much slower ~15 mins)
socket.on('gas_interval', function(data) { console.log("Gas:%j", data);});

// Disconnect
socket.on('disconnect', function(){ console.log("Disconnected.");});
