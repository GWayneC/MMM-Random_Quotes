/* Magic Mirror
 * 
 *
 * By Garfield Cousins Snr.
 * MIT Licensed.
 */

//const FileSystem = require("fs");
//const data = require('./quotes.json');
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
    // this you can create extra routes for your module
	extraRoutes: function() {
		var self = this;
		this.expressApp.get("/MMM-Random_Quotes/extra_route", function(req, res) {
			// call another function
			values = self.anotherFunction();
			res.send(values);
		});
	},

	// Test another function
	anotherFunction: function() {
		return {date: new Date()};
	},
    // Subclass start method.
    start: function() {
        var self = this;
        console.log("Starting node helper for: " + self.name);
        console.log("Starting loading quote file");
        console.log(self.getquotes.stringify());
     
    },

    // Subclass format quote.
    formatquote: function(quote) {
        var self = this;

        
    },

    // load quotes from json file
    getquotes: function() {
        var self = this;
        fetch("./quotes.json")
        .then(response => {
            return response.json();
        })
            .then(data => console.log(data));    
        
        },

        // retrieve list content
    savequotes: function(quote) {
        var self = this;
        FileSystem.writeFile('file.json', JSON.stringify(quote), (error) => {
            if (error) throw error;
          });
    },

    getquote: function(){
        var self = this;
        var quotes_list = self.getquotes();
    },
});
