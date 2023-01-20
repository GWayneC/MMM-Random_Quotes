/* Magic Mirror Module: MMM-Random_Quotes
 * v1.0 - January 2023
 *
 * By Garfield W. Cousins Snr. <garfield.cousins@gmail.com>
 * Beer Licensed (meaning, if you like this module, feel free to have a beer on me, or send me one.)
 */
//const Log = require("logger");

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
		var self = this;
		//Log.log("Starting module: " + self.name);
		this.sendSocketNotification("SET_CONFIG", this.config);

		self.lastQuoteIndex = -1;

		// Schedule update timer.
		
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed * 1000);
		}, self.config.updateInterval * 1000);
	},
	// Override dom generator.
	getDom: function() {
		//log.log("Starting dom");
		this.sendSocketNotification("SEND_QUOTE", this.config);
		var quote = document.createElement("div");
		quote.id = "qText";
		quote.className = "bright medium light";
		quote.style.textAlign = 'center';
		quote.style.margin = '0 auto';
		quote.style.maxWidth = '50%';
		quote.innerHTML = "Quote";

		wrapper.appendChild(quote);

		var author = document.createElement("div");
		author.id = "aText";
		author.className = "light small dimmed";
		author.innerHTML = "~ Author";

		wrapper.appendChild(author);

		return wrapper;
	},
	getHeader: function() {
		//return self.data.header + " Random Quotes";
	},
	notificationReceived: function(notification, payload, sender) {
		var self = this;
		//log.log(notification + " - " + payload + " - " + sender);
		switch(notification) {
		  case "DOM_OBJECTS_CREATED":
			var timer = setInterval(()=>{
			  self.sendSocketNotification("SEND_QUOTE", self.count)
			  self.count++
			}, 1000)
			self.updateDom(1000);
			break;
		case "message_from_helper":
			self.prosessPayload(payload);
			break;

		}
	},
	socketNotificationReceived: function(notification, payload) {
		var self = this;
		//Log.log(self.name + " received a socket notification: " + notification + " - Payload: " + payload);
		switch(notification) {
		  case "message_from_helper":
			self.prosessPayload(payload);
			break;
		}
	},
	prosessPayload: function(payload){
		var self = this;
		var quote_text = document.getElementById("qText");
			quote_text.innerHTML =  payload.Quote;
			var author_text = document.getElementById("aText");
			author_text.innerHTML =  payload.Author;
			self.updateDom(1000);
	}

});