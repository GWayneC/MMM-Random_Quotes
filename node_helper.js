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
        console.info("getting quotes from quotes.json");
        console.info("checking config, value of use_quote_count is " + this.config.use_quote_count);
        let fileText = fs.readFileSync("modules/MMM-Random_Quotes/quotes.json"); //TODO: update to use this.path
        let jsonParsed = JSON.parse(fileText);
        console.info("Retrieved " + jsonParsed.length + " quotes");
            //sort by Quotecount asending
        if(this.config.use_quote_count === 'true'){
            var sortedQuotes = jsonParsed.sort(function(a,b){return a.QuoteCount - b.QuoteCount;});
            var lowestCount = sortedQuotes[0].QuoteCount;
            console.info("Lowest QuoteCount is " + lowestCount);
            //remove all items that has higher quoteCount than the lowest Quote count
            var itemsRemoved = sortedQuotes.splice(sortedQuotes.findIndex(prop => prop.QuoteCount > lowestCount));
            console.info(sortedQuotes.length + " quotes remain " + itemsRemoved.length + " quotes removed");
            //if there are no items return the full list 
            if (sortedQuotes.length > 0){
                console.info("Using quotes with quote_count " + sortedQuotes[0].QuoteCount + " or lower");
                return sortedQuotes;
            }
            resetQuoteCounts();
            console.info("Using the full list of quotes");
        }
        displayStatistics(jsonParsed);
        return jsonParsed;
        },
    // reset quotecounts
    resetQuoteCounts: function(){
        var self = this;
        console.info("Resetting quote counts");
        fsPromises.readFile('modules/MMM-Random_Quotes/quotes.json', 'utf8') 
        .then(data => { 
                let json = JSON.parse(data);
                //// Here - update your json as per your requirement ////
                    json.forEach(element => {
                        element.QuoteCount = 0;
                        
                    });
                fsPromises.writeFile('modules/MMM-Random_Quotes/quotes.json', JSON.stringify(json))
                        .then(  () => { console.info('Reset Success'); })
                        .catch(err => { console.info("Update Failed: " + err);});
            })
        .catch(err => { console.info("Read Error: " + err);});
        },   
    displayStatistics: function(quotelist){
        var sortedQuotes = quotelist.sort(function(a,b){return a.QuoteCount - b.QuoteCount;});
        var highestCount = sortedQuotes[sortedQuotes.length-1].QuoteCount;
        console.log("The highest quote count is " + highestCount);
        for (let i = 0; i <= highestCount; i++){
            var qc = quotelist.filter(item => item.QuoteCount == i).length;
            if(qc > 0){
            console.log("There are " + qc + " quotes that have been shown " + i + " times");
            }
        }
    },        
    // retrieve list content
    saveQuotes: function(index) {
        var self = this;
        console.info("Saving quote with index:- " + index);
        fsPromises.readFile('modules/MMM-Random_Quotes/quotes.json', 'utf8') 
        .then(data => { 
                let json = JSON.parse(data);
                //// Here - update your json as per your requirement ////
                    console.info(json[index]);
                    json[index].QuoteCount = json[index].QuoteCount + 1;
                    json[index].LastUsed = new Date();
                fsPromises.writeFile('modules/MMM-Random_Quotes/quotes.json', JSON.stringify(json))
                        .then(  () => { console.info('Update Success'); })
                        .catch(err => { console.info("Update Failed: " + err);});
            })
        .catch(err => { console.info("Read Error: " +err);});
        },   
    randomIndex: function(quotes) {
        console.info("Inside random index");
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
		console.info("getting random quote");
		var quotes = self.getQuotes();
		var index = self.randomIndex(quotes);
        self.saveQuotes(quotes[index].Index);
	    return quotes[index];
	},
    start: function() {
        var self = this; 
        console.info("Starting node helper for: " + this.name);
        console.info("Start loading quote file");
        },
  	/* socketNotificationReceived(notification, payload)
	 * This method is called when a socket notification arrives.
	 *
	 * argument notification string - The identifier of the notication.
	 * argument payload mixed - The payload of the notification.
	 */
	socketNotificationReceived: function(notification, payload) {
        var self = this;
        console.info("helper " + notification + " payload: " + payload);
		if (notification === "SET_CONFIG") {
            self.config = payload; //store the config of the main app
            console.info("Config info:- " + self.config.QuoteCount);
            //self.sendNotification(self.randomQuote());  //send nack a quote
            return true;
        };
        if (notification === "SEND_QUOTE") {
			self.sendNotification(self.randomQuote()); //Is possible send objects :)
		}
	},
    sendNotification: function(payload) {
        var self = this;
        console.info("Sending Quote #" + payload.Index);
        console.info(payload.Quote);
		self.sendSocketNotification("message_from_helper", payload);
	},
});
