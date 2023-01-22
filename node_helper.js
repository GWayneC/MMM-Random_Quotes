/* Magic Mirror
 * 
 *
 * By Garfield Cousins Snr.
 * MIT Licensed.
 */

const fs = require("fs");
const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    // Subclass start method.
    // Subclass format quote.
    formatquote: function(quote) {
        var self = this; 
       
    },
    // load quotes from json file
    getQuotes: function() {
        var self = this; 
        console.log("getting quotes from quotes.json");
        let fileText = fs.readFileSync("modules/MMM-Random_Quotes/quotes.json"); //TODO: update to use this.path
        let jsonParsed = JSON.parse(fileText);
        return jsonParsed.sort(function(a,b){return a.Index - b.Index;});
        },
    // retrieve list content
    saveQuotes: function(quote) {
        var self = this;
        self.fs.writeFile("modules/MMM-Random_Quotes/quotes_updated.json" , JSON.stringify(quote), (error) => {
            if (error) throw error;
          });
        },
    randomIndex: function(quotes) {
        console.log("Inside random index");
		if (quotes.length === 1) {
			return 0;
		}
		var generate = function() {
			return Math.floor(Math.random() * quotes.length);
		};
		var quoteIndex = generate();
		while (quoteIndex === this.lastQuoteIndex) {
			quoteIndex = generate();
		}
		this.lastQuoteIndex = quoteIndex;
		return quoteIndex;
	},
   	/* randomQuote()
	 * Retrieve a random quote.
	 *
	 * return quote string - A quote.
	 */
	randomQuote: function() {
        var self = this; 
		console.log("getting random quote");
		var quotes = self.getQuotes();
		var index = self.randomIndex(quotes);
		console.log("index is " + index);
        console.log(quotes[index -1]);
		return quotes[index -1];
	},
    start: function() {
        var self = this; 
        console.log("Starting node helper for: " + this.name);
        console.log("Start loading quote file");
        },
  	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the notication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
        var self = this;
        console.log("helper " + notification + " payload:" + payload).stringify();
		if (notification === "SET_CONFIG") {
            self.config = payload; //store the config of the main app
            console.log("Config info:- " + self.config.QuoteCount);
            //self.sendNotification(self.randomQuote());  //send nack a quote
        };
        if (notification === "SEND_QUOTE") {
			self.sendNotification(self.randomQuote()); //Is possible send objects :)
		}
	},
    sendNotification: function(payload) {
        var self = this;
        console.log("Sending Quote #" + payload.Index);
        console.log(payload.Quote);
		self.sendSocketNotification("message_from_helper", payload);
	},
});
