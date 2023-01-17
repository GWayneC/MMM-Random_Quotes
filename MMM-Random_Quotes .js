/* Magic Mirror Module: MMM-Random_Quotes
 * v1.0 - January 2023
 *
 * By Garfield W. Cousins Snr. <garfield.cousins@gmail.com>
 * Beer Licensed (meaning, if you like this module, feel free to have a beer on me, or send me one.)
 */

Module.register("MMM-Random_Quotes",{

	/* The included quotes (quotes.json) are ones that have collected over the years.
	   If you want to add or remove quotes you will have to edit the quotes.json file.
	 */

	// Module config defaults.
	defaults: {
		updateInterval: 300,	// Value is in SECONDS
		fadeSpeed: 4,			// How fast (in SECONDS) to fade out and back in when changing quotes
		usequotecount: 'true',  // If this is set to true the quote will be biased to select least used quotes   
		uselastused: 'true'		// If this is set to true the dates the quote was last used will be used to select the quote
	 
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

	/* randomQuote()
	 * Retrieve a random quote.
	 *
	 * return quote string - A quote.
	 */
	randomQuote: function() {
		var quotes = this.quoteArray();
		var index = this.randomIndex(quotes);
		return quotes[index].split(" ~ ");
	},

	// Override dom generator.
	getDom: function() {
		var quoteText = this.randomQuote();

		var qMsg = quoteText[0];
		var qAuthor = quoteText[1];

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