# Module: MMM-Random_Quotes

The `MMM-Random_Quotes` module displays a random quote but can be configured to not repeat a quote until the quotes in the collection has been displayed. Supplied quotes are ones that I have collected from multiple sources over the years, I have also added quotes from <a href>https://github.com/KirAsh4/random_quotes</a>. You may, if you cloose to, manually add new ones.
See the section on `Updating Quotes` below.
Note:  This is my first attempt at building an module and I used <a href>https://github.com/KirAsh4/random_quotes</a> as a template.

## Installing the module
Clone this repository in your `~/MagicMirror/modules/` folder
````javascript
git clone https://github.com/GWayneC/MMM-Random_Quotes
````

## Using the module
To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
		{
			module: 'MMM-Random_Quotes',
			position: 'lower_third',
			config: {
					// The config property is optional
					// Without a config, a random quote is shown,
								}
		},
]
````

## Configuration options
The `MMM-Random_Quotes` module allows you to pick quotes randomly from the included quotes.

<table>
	<thead>
		<tr>
			<th>Options</th>
			<th>Description</th>
			<th>Default</th>
		</tr>
	</thead>
	<tfoot>
		<tr>
			<th colspan="3"><em>More options may get added later.</em></th>
		</tr>
	</tfoot>
	<tbody>
		<tr>
			<td><code>updateInterval</code></td>
			<td>How often a new quote gets displayed. <strong>Value is in SECONDS.</strong></td>
			<td><code>300</code> seconds (every 5 minutes)</td>
		</tr>
		<tr>
			<td><code>fadeSpeed</code></td>
			<td>How fast <strong>(in SECONDS)</strong> to fade out and back in when changing quotes.</td>
			<td><code>4</code> seconds</td>
		</tr>
		<tr>
			<td><code>use_quote_count</code></td>
			<td>Whether or not to take into consideration the number of times the quote has been used before. If set to true a quote will not be repeated until all quotes have been displayed</td><td>true</td>
		</tr>
		<tr>
			<td><code>use_last_used</code></td>
			<td>Whether or not to take into consideration the date a quote was last used during the selection process</td><td>false - This is not yet implememted</td>
		</tr>
	</tbody>
</table>

## Updating Quotes
Because this module does not use an API to retrieve quotes, you will have to update/change the quotes manually.
You can edit the `quotes.json` file to add or remove quotes.
Please add new quotes to the end of the file and use the following format: 
		<pre>
		{	
			"Index": ???, //the next index in the list
			"Author": "Author's name",
			"Quote": "Text of quote.",
			"Last_Used": "2020-04-10T12:17:09.9772677-04:00",
			"Quote_Count": 0 
		}
  
Note: I have provided a utility, in the utility folder that can be used to update the quotes, it is a windows console app called ManageQuotes.exe (source can be found here <a href>https://github.com/GWayneC/ManageQuotes</a>) 
This app can be used to add a single quote, import quotes form a test file, reset the indexes, quote counts or last used dates.
Usage is as follows:
ManageQuotes /f:path to file /d:delimeter /i:import_file_path
ManageQuotes /f:path to file /a: action where action may be reset or add where 'reset' will reset the quote counts and last used dates, 'add' will prompt for the the author and the text of a quote and will use that information to update the quote.json file. 

