require('dotenv').config();
var request = require("request");
var dateFormat = require('dateformat');
var now = new Date();
var twilio = require('twilio');
var client = new twilio (process.env.TWILIO_ACCOUNT_SID,process.env.TWILIO_AUTH_TOKEN); 

var queryUrl = "https://api.coinbase.com/v2/prices/ETH-USD/buy";
var textMessage = "null";
var entryPrice = 292;
console.log (process.env.TWILIO_PHONE);

request(queryUrl, function(error, response, body) {
 // If user has empty input 
 if(!error && response.statusCode === 200) {
 // Display output 
    var currentPrice = JSON.parse(body).data.amount;
    console.log("current price: $"+currentPrice);
    var ans = ((currentPrice - entryPrice)/entryPrice) *100;
    var percentChange = Math.round(ans*100)/100;
    var advice = " ";

    if (ans <= 0) {
      advice = " Buy now!"
      }

    if ( ans >= 20 ) {
      var textMessage = dateFormat(now) + "\n" + "percent change "+ percentChange + "%"+ "\n" +
                      "Current Price $" + currentPrice + "\n" + advice;
      console.log(percentChange);
      console.log(textMessage);
      sendM(textMessage);
    }else{
      var textMessage = dateFormat(now) + "\n"+ "percent change " + percentChange +"%"+ "\n" +
                      "Current Price $" + currentPrice + "\n" + advice;
      console.log(percentChange);
      console.log(textMessage);
      sendM(textMessage);
        }      
    }
  });

function sendM(textMessage){
console.log(process.env.TWILIO_PHONE)
client.messages.create({
    body: textMessage, 
    to: process.env.MY_PHONE,  // Text this number
    from: process.env.TWILIO_PHONE // From a valid Twilio number
})
.then((message) => console.log(message.sid))
}


