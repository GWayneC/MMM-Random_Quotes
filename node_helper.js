/* Magic Mirror
 * 
 *
 * By Garfield Cousins Snr.
 * MIT Licensed.
 */

const FileSystem = require("fs");
//const data = require('./quotes.json');
const NodeHelper = require("node_helper");

module.exports = NodeHelper.create({
    // Subclass start method.
    start: function() {
        var self = this;
        console.log("Starting node helper for: " + self.name);

        self.api_key = ""
        self.token = ""
        self.list = ""

        //self.trelloConnections = {};
    },

    // Subclass socketNotificationReceived received.
    formatquote: function(quote) {
        var self = this;

        
    },

    // load quotes from json file
    getquotes: function() {
        var self = this;
        fetch("./employees.json")
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
);
