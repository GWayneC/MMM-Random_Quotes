/* Magic Mirror
 * 
 *
 * By Garfield Cousins Snr.
 * MIT Licensed.
 */

const fs = require("fs");
const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
   // Override socketNotificationReceived method.

	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the noitication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
		if (notification === "SEND_QUOTE") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			// Send notification
			this.sendNotificationTest(this.randomQuote()); //Is possible send objects :)
		}
	},
    sendNotificationTest: function(payload) {
        console.log("Sending Quote #" + payload.Index);
		this.sendSocketNotification("SENT", payload);
	},
    
    // Subclass start method.
    start: function() {
        var self = this;
        console.log("Starting node helper for: " + self.name);
        console.log("Starting loading quote file");
      	console.log(self.quotePath);
        var qt = randomQuote();
	    console.log(qt);
        sendNotificationTest(qt);
     
    },
    // Subclass format quote.
    formatquote: function(quote) {
        var self = this;

        
    },
    // load quotes from json file
    getquotes: function() {
        var self = this;
        let fileText = fs.readFileSync("modules/MMM-Random_Quotes/quotes.json");
        let jsonParsed = JSON.parse(fileText);
        return jsonParsed;
        },

    // retrieve list content
    savequotes: function(quote) {
        var self = this;
        self.fs.writeFile("modules/MMM-Random_Quotes/quotes_updated.json" , JSON.stringify(quote), (error) => {
            if (error) throw error;
          });
    },
    randomIndex: function(quotes) {
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

	/* quoteArray()
	 * Retrieve an array of quotes for the time of the day.
	 *
	 * return quotes Array<String> - Array with quotes for the time of the day.
	 */
/*	quoteArray: function() {
		if (this.config.category == 'random') {

			return this.config.quotes[Object.keys(this.config.quotes)[Math.floor(Math.random() * Object.keys(this.config.quotes).length)]];
		} else {
			return this.config.quotes[this.config.category];
		}
	},
/*
   	/* randomQuote()
	 * Retrieve a random quote.
	 *
	 * return quote string - A quote.
	 */
	randomQuote: function() {
		console.log("getting random quote");
		var quotes = this.getQuotes();
		var index = this.randomIndex(quotes);
		console.log("index is" + index);
		return quotes[index];
	},

});
