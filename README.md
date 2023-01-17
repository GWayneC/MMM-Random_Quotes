# Module: MMM-Random_Quotes

The `MMM-Random_Quotes` module returns a random quote. Supplied quotes are ones that I have collected from multiple sources over the years, you may, if you cloose to manually add new ones.
See the section on `Updating Quotes` below.

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
						// selected from all of the categories available.
				}
			}
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
			<td><code>category</code></td>
			<td>What category to pick from.</td>
			<td><code>random</code> - The <code>random</code> setting will pick a random quote out of all the available categories. Or you can set it to a specific category: <code>inspirational</code>, <code>life</code>, <code>love</code>, <code>motivational</code>, <code>positive</code>, or <code>success</code>.</td>
		</tr>
	</tbody>
</table>

## Updating Quotes
Because this module does not use an API to retrieve quotes, you will have to update/change the quotes manually.
You can edit the `quotes.json` file and add/remove quotes.
Please add new quotes to the end of the file and use the following format: 
    {
		"Index": 262, 
		"Author": "Unknown",
		"Quote": "Difficult roads often lead to beautiful destinations.",
		"Last_Used": "2020-04-10T12:17:09.9772677-04:00",
		"Quote_Count": 0   
	}
Note: I have provided a utility, in the utility folder that can be used to update the quotes, it is a windows console app called FixQuoteFile.exe 
To use it edit the FixQuoteFile.exe.config file and  set the property "QfileLocation" to the path where your "quotes.json" file is located. Then run console app and enter the new quote info.
