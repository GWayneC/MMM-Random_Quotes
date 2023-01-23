# Module: MMM-Random_Quotes

The `MMM-Random_Quotes` module a random quote. Supplied quotes are ones that I have collected from multiple sources over the years, I have also added quotes from <a href>https://github.com/KirAsh4/random_quotes</a>. You may, if you cloose to manually add new ones.
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
			<td>Whether or not to take into consideration the number of times the quote has been used before.</td><td>true</td>
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
    {
		"Index": 262, 
		"Author": "Unknown",
		"Quote": "Text of quote.",
		"Last_Used": "2020-04-10T12:17:09.9772677-04:00",
		"Quote_Count": 0   
	}
Note: I have provided a utility, in the utility folder that can be used to update the quotes, it is a windows console app called FixQuoteFile.exe 
To use it edit the FixQuoteFile.exe.config file and  set the property "QfileLocation" to the path where your "quotes.json" file is located. Then run console app and enter the new quote info.
