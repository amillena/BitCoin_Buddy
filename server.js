// server.js
// set up ======================================================================

require('dotenv').config();
const coindesk = require('node-coindesk-api')
var request = require("request");
var dateFormat = require('dateformat');

var twilio = require('twilio');
var client = new twilio (process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN); 

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var now = new Date();
var start = '2016-08-01';
var end = '2016-08-25';


// configuration ===============================================================
//mongoose.connect(configDB.url); // connect to our local database
mongoose.connect(process.env.MONGODB_URI); // connect to our MLAB

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);


// CoinDesk API ================================================================
var queryUrl = "http://api.coindesk.com/v1/bpi/historical/close.json?start="+start+"&end="+end;

//var textMessage = "null";
//var entryPrice = 4000;
//console.log (process.env.TWILIO_PHONE);

// CoinBase API ================================================================
// var queryUrl = "https://api.coinbase.com/v2/prices/ETH-USD/buy";
// var Coin = require('coinbase').Client;
// var coin = new Coin({'apiKey': process.env.API_KEY,
//                          'apiSecret': process.env.API_SECRET});

// coin.getSpotPrice({'currencyPair': 'ETH-USD', 'date':'2010-01-01'}, function(err, price) {
//   console.log(price);

// });


var dateLabels = [];
var rangePrice = [];

request(queryUrl, function(error, response, body) {

var JSONObject = JSON.parse(body);
var historicalPrice = JSONObject["bpi"];

	for (key in historicalPrice) {
    	if (historicalPrice.hasOwnProperty(key)) {
    	dateLabels.push(key);	
		rangePrice.push(historicalPrice[key]);
    	}
	}
console.log(dateLabels);
console.log(rangePrice);


//console.log(key, body.bpi[key]);

	// Object.keys(body.bpi).forEach(function(key) {
 	// 	console.log(key, body.bpi[key]);
	// });


//  // If user has empty input 
//  if(!error && response.statusCode === 200) {
//  // Display output 
//     var currentPrice = JSON.parse(body).data.amount;
//     console.log("current price: $"+currentPrice);
//     var ans = ((currentPrice - entryPrice)/entryPrice) *100;
//     var percentChange = Math.round(ans*100)/100;
//     var advice = " ";

//     if (ans <= 0) {
//       advice = " Buy now!"
//       }

//     if ( ans >= 20 ) {
//       var textMessage = dateFormat(now) + "\n" + "percent change "+ percentChange + "%"+ "\n" +
//                       "Current Price $" + currentPrice + "\n" + advice;
//       console.log(percentChange);
//       console.log(textMessage);
//       sendMessage(textMessage);
//     }else{
//       var textMessage = dateFormat(now) + "\n"+ "percent change " + percentChange +"%"+ "\n" +
//                       "Current Price $" + currentPrice + "\n" + advice;
//       console.log(percentChange);
//       console.log(textMessage);
//       sendMessage(textMessage);
//         }      
//     }
});


//------------Function to send text message via Twilio
// function sendMessage(textMessage){
// console.log(process.env.TWILIO_PHONE)
// client.messages.create({
//     body: textMessage, 
//     to: process.env.MY_PHONE,  // Text this number
//     from: process.env.TWILIO_PHONE // From a valid Twilio number
// })
// .then((message) => console.log(message.sid))
// }

