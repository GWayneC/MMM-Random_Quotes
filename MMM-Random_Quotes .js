/* Magic Mirror Module: MMM-Random_Quotes
 * v1.0 - January 2023
 *
 * By Garfield W. Cousins Snr. <garfield.cousins@gmail.com>
 * Beer Licensed (meaning, if you like this module, feel free to have a beer on me, or send me one.)
 */

//const node_helper = require("./node_helper");
const fs = require('fs');

Module.register("MMM-Random_Quotes",{

	// Module config defaults.
	defaults: {
		updateInterval: 300,	  // Value is in SECONDS
		fadeSpeed: 4,			  // How fast (in SECONDS) to fade out and back in when changing quotes
		use_quote_count: 'true',  // If this is set to true the quote will be biased to select least used quotes   
		use_last_used: 'true'	  // If this is set to true the dates the quote was last used will be used to select the quote
	 
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.lastQuoteIndex = -1;

		// Schedule update timer.
		var self = this;
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed * 1000);
		}, this.config.updateInterval * 1000);
	},

	/* randomIndex(quotes)
	 * Generate a random index for a list of quotes.
	 *
	 * argument quotes Array<String> - Array with quotes.
	 *
	 * return Number - Random index.
	 */
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
	quoteArray: function() {
		if (this.config.category == 'random') {

			return this.config.quotes[Object.keys(this.config.quotes)[Math.floor(Math.random() * Object.keys(this.config.quotes).length)]];
		} else {
			return this.config.quotes[this.config.category];
		}
	},
    /* getQuotes()
	 *
	 * retrieveand array of quotes
	 *
	*/
	getQuotes: function() {
		let fileText = fs.readFileSync('quotes.json');
		let quoteList = JSON.parse(fileText);
		return quoteList;
	},
	/* randomQuote()
	 * Retrieve a random quote.
	 *
	 * return quote string - A quote.
	 */
	randomQuote: function() {
		var quotes = this.getQuotes();
		var index = this.randomIndex(quotes);
		return quotes[index];
	},

	// Override dom generator.
	getDom: function() {
		var quote = this.randomQuote();

		var qMsg = quote.Quote;
		var qAuthor = quote.Author;
		var wrapper = document.createElement("div");
		var quote = document.createElement("div");
		quote.className = "bright medium light";
		quote.style.textAlign = 'center';
		quote.style.margin = '0 auto';
		quote.style.maxWidth = '50%';
		quote.innerHTML = qMsg;

		wrapper.appendChild(quote);

		var author = document.createElement("div");
		author.className = "light small dimmed";
		author.innerHTML = "~ " + qAuthor;

		wrapper.appendChild(author);

		return wrapper;
	}

});