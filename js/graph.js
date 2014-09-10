/**
 * @author Praveen
 */
function drawGraph(amount, graph, monthToX, amountToY, drawAxis, lineColor, lineWidth, font, fontColor, text, textX, textY, str){
 
   // If this browser does not support graphics in a <canvas> element, then just return now.
    if (!graph.getContext) return;
    // Get the "context" object for the <canvas> that defines the drawing API
    var g = graph.getContext("2d"); 						// All drawing is done with this object
 
    str = str + "start X: " + monthToX(0) + " y: " + amountToY(amount[0]) + "<br>"; 
    var numMon = amount.length;
    g.beginPath();                                 		// Begin a new shape
    g.moveTo(monthToX(0), amountToY(amount[0]));   		// Start at left
    for(var p = 1; p < numMon; p++){
    	g.lineTo(monthToX(p), amountToY(amount[p]));
    	str = str + "X: "+ monthToX(p) + " y: " + amountToY(amount[p]) + "<br>"; 
    }
    g.strokeStyle = lineColor;                         	// set the line color
    g.lineWidth = lineWidth;							// set the line width
    g.stroke();                                      	// draw the curve

	//Draw the text
    g.font = font;               						// Define a font
    g.fillStyle = fontColor; 
    g.textAlign = "left";
    g.textBaseAlign = "bottom";
    g.fillText(text, textX, textY);  					// Draw text in legend

    // Make yearly tick marks and year numbers on X axis
    if(drawAxis === true){
	    g.textAlign="center";                          // Center text over ticks
	    g.fillStyle = "black";
	    var y = graph.height;                          // Y coordinate of X axis
	    for(var year = 1; year * 12 <= numMon; year++) { // For each year
	        var x = monthToX(year * 12);               // Compute tick position
	        g.fillRect(x - 1, y - 3, 1, y);                 // Draw the tick
//	        if (year == 1) g.fillText("Year", x, y-5); // Label the axis
	        if (year % 5 === 0 && year*12 !== numMon) // Number every 5 years
	            g.fillText(String(year), x, y-5);
	    }
    }
    
    // Mark payment amounts along the right edge
    g.textAlign = "right";                         // Right-justify text
    g.textBaseline = "middle";                     // Center it vertically
    g.fillStyle = "black";
    g.fillText(String(amount[numMon - 1].toFixed(0)), monthToX(numMon) - 5, amountToY(amount[numMon - 1]));
	g.textAlign = "left";
	g.fillText(String(amount[0].toFixed(0)), monthToX(0) + 5, amountToY(amount[0]));
	
	return str;
} //drawGraph

//Draw the income and expense graph
function drawIncome(pV){
	var numMon = pV.grossIncome.length;
	var lowHigh = [pV.grossIncome[0], pV.grossIncome[numMon - 1], pV.operatingExpense[0], pV.operatingExpense[numMon - 1], pV.netIncomeAfterTD[0], pV.netIncomeAfterTD[numMon - 1], 
		pV.taxes[0], pV.taxes[numMon - 1]];
	lowHigh.sort(function(a, b) {return (a - b);});
	var incomeGraph = document.getElementById("idIncomeGraph"); 	// Get the <canvas> tag
	incomeGraph.width = incomeGraph.width;  						// Magic to clear and reset the canvas element

    // These functions convert payment numbers and dollar amounts to pixels. Make the height a little larger than the max size
    function monthToX(n) { return n * incomeGraph.width/(numMon - 1); }
    function amountToY(a) { return (incomeGraph.height - incomeGraph.height * 0.02) - ((a - lowHigh[0]) * incomeGraph.height/((lowHigh[lowHigh.length - 1] - lowHigh[0])* 1.05));}

	var str = "width:" + incomeGraph.width + " height: " + incomeGraph.height + " low: " + lowHigh[0] + " high: " + lowHigh[lowHigh.length - 1]  + " mon: " + numMon + "<br>";

	str = drawGraph(pV.grossIncome, incomeGraph, monthToX, amountToY, true,  "#f88f00", 2, "bold 16px sans-serif", "#f88f00", "Gross Income", 20, 20, str);
	str = drawGraph(pV.operatingExpense, incomeGraph, monthToX, amountToY, false, "#00ff88", 2, "bold 16px sans-serif", "#00ff88", "Operating Expense", 20, 36, str);
	str = drawGraph(pV.netIncomeAfterTD, incomeGraph, monthToX, amountToY, false, "#f8008f", 2, "bold 16px sans-serif", "#f8008f", "Net Income After Taxes and Depreciation", 20, 52, str);
	str = drawGraph(pV.taxes, incomeGraph, monthToX, amountToY, false, "#00f8f8", 2, "bold 16px sans-serif", "#00f8f8", "Taxes", 20, 68, str);
	str = drawGraph(pV.cashFlow, incomeGraph, monthToX, amountToY, false, "#8800ff", 2, "bold 16px sans-serif", "#8800ff", "Cash Flow", 20, 84, str);
	
	document.getElementById("idTab4Test").innerHTML = str  ;
} //drawIncome

//Draw the appreciation related information graph
function drawAppreciation(pV){
	var numMon = pV.propertyAppreciation.length;
	var lowHigh = [pV.propertyAppreciation[0], pV.propertyAppreciation[numMon - 1], pV.alternateInvestment[0], pV.alternateInvestment[numMon - 1]];
	lowHigh.sort(function(a, b) {return (a - b);});
	var appreciationGraph = document.getElementById("idAppreciationGraph"); 	// Get the <canvas> tag
	appreciationGraph.width = appreciationGraph.width;  						// Magic to clear and reset the canvas element

    // These functions convert payment numbers and dollar amounts to pixels. Make the height a little larger than the max size
    function monthToX(n) { return n * appreciationGraph.width/(numMon - 1); }
    function amountToY(a) { return (appreciationGraph.height - appreciationGraph.height * 0.02) - ((a - lowHigh[0]) * appreciationGraph.height/((lowHigh[lowHigh.length - 1] - lowHigh[0])* 1.05));}

	var str = "width:" + appreciationGraph.width + " height: " + appreciationGraph.height + " low: " + lowHigh[0] + " high: " + lowHigh[lowHigh.length - 1]  + " mon: " + numMon + "<br>";

	str = drawGraph(pV.propertyAppreciation, appreciationGraph, monthToX, amountToY, true,  "#f88f00", 2, "bold 16px sans-serif", "#f88f00", "Property Appreciation", 20, 20, str);
	str = drawGraph(pV.alternateInvestment, appreciationGraph, monthToX, amountToY, false,  "#f8008f", 2, "bold 16px sans-serif", "#f8008f", "Alternate Investment Appreciation", 20, 36, str);
	
	document.getElementById("idTab4Test").innerHTML = str  ;
}//drawAppreciation
