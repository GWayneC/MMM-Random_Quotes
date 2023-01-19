/* Magic Mirror
 * 
 *
 * By Garfield Cousins Snr.
 * MIT Licensed.
 */

const fs = require("fs");
const NodeHelper = require("node_helper");
const self = this;

module.exports = NodeHelper.create({
    // Subclass start method.
    // Subclass format quote.
    formatquote: function(quote) {
        //var self = this; = this;
       
    },
    // load quotes from json file
    getquotes: function() {
        //var self = this; = this;
        console.log("getting quotes from quotes.json");
        let fileText = self.fs.readFileSync("modules/MMM-Random_Quotes/quotes.json");
        let jsonParsed = JSON.parse(fileText);
        return jsonParsed;
        },
    // retrieve list content
    savequotes: function(quote) {
        //var self = this; = this;
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
        //var self = this; = this;
		console.log("getting random quote");
		var quotes = self.getQuotes();
		var index = self.randomIndex(quotes);
		console.log("index is" + index);
		return quotes[index];
	},
    start: function() {
        //var self = this; = this;
        console.log("Starting node helper for: " + this.name);
        console.log("Starting loading quote file");
        
        var qt = self.randomQuote();
        console.log(qt);
        self.sendNotificationTest(qt);
        
            },
  	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
        console.log("helper " + notification + " payload:" + payload);
		if (notification === "SEND_QUOTE") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			// Send notification
			self.sendNotificationTest(self.randomQuote()); //Is possible send objects :)
		}
	},
    sendNotificationTest: function(payload) {
        console.log("Sending Quote #" + payload.Index);
		self.sendSocketNotification("message_from_helper", payload);
	},
});
