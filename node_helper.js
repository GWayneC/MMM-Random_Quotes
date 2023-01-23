/* Magic Mirror
 * 
 *
 * By Garfield Cousins Snr.
 * MIT Licensed.
 */

const { Console } = require("console");
const fs = require("fs");
const fsPromises = require('fs').promises;
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
        console.log("checking config: -" + this.config.use_quote_count);
        let fileText = fs.readFileSync("modules/MMM-Random_Quotes/quotes.json"); //TODO: update to use this.path
        let jsonParsed = JSON.parse(fileText);
        console.log("Retrieved " + jsonParsed.length + " quotes");
        //sort by Quotecount asending
        var sortedQuotes = jsonParsed.sort(function(a,b){return a.QuoteCount - b.QuoteCount;});
        var lowestCount = sortedQuotes[0].QuoteCount;
        console.log("Lowest QuoteCount is " + lowestCount);
        //remove all items that has higher quoteCount than the lowest Quote count
        var itemsRemoved = sortedQuotes.splice(sortedQuotes.findIndex(prop => prop.QuoteCount > lowestCount));
        console.log(sortedQuotes.length + " quotes remain " + itemsRemoved.length + " quotes removed");
        //if there are no items return the full list 
        if (sortedQuotes.length > 0){
            console.log("using with quotes removed");
            return sortedQuotes;
        }
        resetQuoteCounts();
        console.log("using original list");
        return jsonParsed;
        },
    // reset quotecounts
    resetQuoteCounts: function(){
        var self = this;
        console.log("Resetting quote counts");
        fsPromises.readFile('modules/MMM-Random_Quotes/quotes.json', 'utf8') 
        .then(data => { 
                let json = JSON.parse(data);
                //// Here - update your json as per your requirement ////
                    json.forEach(element => {
                        element.QuoteCount = 0;
                        
                    });
                fsPromises.writeFile('modules/MMM-Random_Quotes/quotes.json', JSON.stringify(json))
                        .then(  () => { console.log('Reset Success'); })
                        .catch(err => { console.log("Update Failed: " + err);});
            })
        .catch(err => { console.log("Read Error: " + err);});
        },       
    // retrieve list content
    saveQuotes: function(index) {
        var self = this;
        console.log("Saving quote with index:- " + index);
        fsPromises.readFile('modules/MMM-Random_Quotes/quotes.json', 'utf8') 
        .then(data => { 
                let json = JSON.parse(data);
                //// Here - update your json as per your requirement ////
                    console.log(json[index]);
                    json[index].QuoteCount = json[index].QuoteCount + 1;
                    json[index].LastUsed = new Date();
                fsPromises.writeFile('modules/MMM-Random_Quotes/quotes.json', JSON.stringify(json))
                        .then(  () => { console.log('Update Success'); })
                        .catch(err => { console.log("Update Failed: " + err);});
            })
        .catch(err => { console.log("Read Error: " +err);});
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
        self.saveQuotes(quotes[index].Index);
	    return quotes[index];
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
        console.log("helper " + notification + " payload: " + payload);
		if (notification === "SET_CONFIG") {
            self.config = payload; //store the config of the main app
            console.log("Config info:- " + self.config.QuoteCount);
            //self.sendNotification(self.randomQuote());  //send nack a quote
            return true;
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
