// from data.js
var tableData = data;
var tblColumns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Step 2: Create HTML object references
var tbody = d3.select("tbody");
var searchDate = d3.select("#searchDate");
var btnSearch = d3.select("#btnSearch");
var btnReset = d3.select("#btnReset");

// Step 3: Define an arrow function that builds the HTML table
// OMG my brain hurts w javascript arrow functions syntax
var loadTableRows = (whichData) => { // Parameter "whichData" is the data to loop through; makes this re-usable
	// Step 1: Delete the previously loaded table rows (if there were any)
    tbody.html("");
	
	// Step 2: Loop through "whichData" and add new table row for each row 
	whichData.forEach(dataRow => { // Loop through each row:
		// 2.1: Add a new row
		var tblRow = tbody.append("tr");  
		
		// 2.2: Loop through each column and add it as a new table cell
		tblColumns.forEach(column => tblRow.append("td").text(dataRow[column]))
	});
}

// Step 4: call the function (default / first page load only)
loadTableRows(tableData);

/**********************************
 Event Listeners 
**********************************/

// Search button - click event
btnSearch.on("click", () => {
	// Setup: Prevent the page from refreshing on events
	d3.event.preventDefault();
	
	// 1. Get what the user searched for:
    var searchedDate = searchDate.property("value");
	
	// 2. Filter the data
    var tableData_Filtered = tableData.filter(tableData => tableData.datetime === searchedDate);
	
	// 3. Load the new data
	if(tableData_Filtered.length !== 0) {
		loadTableRows(tableData_Filtered);
	}
	else {
		// Clear out the previously loaded HTML:
		tbody.html("");
		
		// Tell them "No rows match"
		tbody.append("tr").append("td").text("You are unlucky - no sightings on this date");
	}
})

// Reset button - click 
btnReset.on("click", () => {
	// window.location.href = "index.html";
	document.getElementById("searchDate").value='';
	
	// Load original dataset
	loadTableRows(tableData);
})


