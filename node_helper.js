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
		if (notification === "MMM-Random_Quotes-NOTIFICATION_TEST") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			// Send notification
			this.sendNotificationTest(this.anotherFunction()); //Is possible send objects :)
		}
	},
    sendNotificationTest: function(payload) {
		this.sendSocketNotification("MMM-Random_Quotes-NOTIFICATION_TEST", payload);
	},
    
    // Subclass start method.
    start: function() {
        var self = this;
        console.log("Starting node helper for: " + self.name);
        console.log("Starting loading quote file");
      	console.log(self.quotePath);
	    console.log(self.getquotes()[15]);
     
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

    getquote: function(){
        var self = this;
        var quotes_list = self.getquotes();
        return quotes_list[4];
    },
});
