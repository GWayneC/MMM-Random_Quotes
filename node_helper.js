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
        let fileText = fs.readFileSync("modules/MMM-Random_Quotes/quotes.json");
        let jsonParsed = JSON.parse(fileText);
        return jsonParsed;
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
        console.log(quotes[index]);
		return quotes[index];
	},
    start: function() {
        var self = this; 
        console.log("Starting node helper for: " + this.name);
        console.log("Start loading quote file");
        /*
        var qt = self.randomQuote();
        console.log(qt);
        self.sendNotificationTest(qt);
        */
            },
  	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
        var self = this;
        console.log("helper " + notification + " payload:" + payload);
		if (notification === "CONFIG") {
            this.config_main = payload; //store the config of the main app
            self.sendNotification(self.randomQuote()); 
        };
        if (notification === "SEND_QUOTE") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			// Send notification
			self.sendNotificationTest(self.randomQuote()); //Is possible send objects :)
		}
	},
    sendNotification: function(payload) {
        var self = this;
        console.log("Sending Quote #");
        console.log(payload.Quote);
		self.sendSocketNotification("message_from_helper", payload);
	},
});
