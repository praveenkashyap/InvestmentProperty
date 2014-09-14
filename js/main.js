/**
 * @author Praveen
 */

//Calculates all data, tabulates and prints it. This function is called from the main panel
function printData(propInfo){
	//Do the property analysis and compute all values
	var propertyValue = propertyAnalysis(propInfo.propertyLoan, propInfo.propertyPurchase, propInfo.depreciation, propInfo.rentalIncome, propInfo.globalData, propInfo.yearlyChanges, propInfo.expenses, propInfo.sale, selectedScenario);
	var str = "<table><tr><th>Property Value </th></tr><tr><th>Month:</th> <th>Gross Income:</th> <th>Operating Expense:</th> <th>Net Income:</th> <th> Taxes: </th> <th> Cash Flow: </th>";
	str = str + "<th> Property Appreciation: </th> <th> Alternate Appreciation: </th></tr><br>";
	for(var i = 0; i < propInfo.sale[selectedScenario].years * 12; i++){
		str = str + "<tr><td>" + i + "</td><td>" + propertyValue.grossIncome[i].toFixed(2) + "</td><td>" + propertyValue.operatingExpense[i].toFixed(2) + "</td><td>";
		str = str + propertyValue.netIncomeAfterTD[i].toFixed(2) + "</td><td>" + propertyValue.taxes[i].toFixed(2) + "</td><td>" + propertyValue.cashFlow[i].toFixed(2) + "</td><td>";
		str = str + propertyValue.propertyAppreciation[i].toFixed(2) + "</td><td>" + propertyValue.alternateInvestment[i].toFixed(2)  + "</td></tr>";
	}		
	str = str + "</table>";
	document.getElementById("idPrintData").innerHTML = str  ;
	//Graph the computed values
	drawIncome(propertyValue);
	drawAppreciation(propertyValue);
	
}//printData

//Save all input data after it is entered. It is called from the main page
function savePropertyDataToLocal(propInfo){

	if (window.localStorage) {  // Only do this if the browser supports it
		localStorage[propInfo.propertyAddress.fileName] = JSON.stringify(propInfo);
//		document.getElementById('idTestPara').innerHTML	= "Data saved in local storage:" + JSON.stringify(propInfo);
    }
}//saveData

//Create filename where the property data is stored on the server. Remove any white spaces from all propertyAddress fields. 
//Concatenate the street, city and state address.
function createFileName(propInfo){
	var propAddress = {street:propInfo.propertyAddress.street, city:propInfo.propertyAddress.city, state:propInfo.propertyAddress.state};
	var fileName = "";

	for(var x in propAddress){
		var trimmed = propAddress[x].trim();
		while(trimmed.indexOf(" ") != -1)
			trimmed = trimmed.replace(" ", "");
		fileName = fileName + trimmed;
	}
	propInfo.propertyAddress.fileName = fileName;
}//createFileName

//Save all input data to a file on the server after it is entered. It is called from the main page.
function savePropertyDataToFile(propInfo){
	var xmlhttp;
	
	//Create the xmlhttp object based on  the browser type 
	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();}
	else{// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}
	
	//Callback for the client
	xmlhttp.onreadystatechange = function(){
//	if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200))
//		document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
	};
	//Post a request to save all the property data to the property file on the server
	xmlhttp.open("POST","/propertyFileWrite",true);
	xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xmlhttp.send("fileName=" + propInfo.propertyAddress.fileName + '&data=' + JSON.stringify(propInfo));

}//saveDataToFile

//Print data on the form on the print tab
function printInputData(propInfo){
	var str = '';
	
	str = str + 'Prop Address:' ;
	str = str + propInfo.propertyAddress.street + ',  ' + propInfo.propertyAddress.city + ',  ' + propInfo.propertyAddress.state;
	
	str = str + '<br>Property Loan: ';
    str = str + propInfo.propertyLoan.downPayment + ', ' + propInfo.propertyLoan.loanInterestRate + ', ' + propInfo.propertyLoan.loanDuration;
    
    str = str + '<br>Property Purchase:';
    str = str + '<br>Purchase price: ';
	for(var i = 0; i < propInfo.propertyPurchase.length; i++){
		str = str + propInfo.propertyPurchase[i].purchasePrice + ', ';
	}
    str = str + '<br>Capital Improvements: ';
	for(i = 0; i < propInfo.propertyPurchase.length; i++){
		str = str + propInfo.propertyPurchase[i].capitalImprovement + ', ';
	}
    str = str + '<br>Closing cost: ';
	for(i = 0; i <propInfo.propertyPurchase.length; i++){
		str = str + propInfo.propertyPurchase[i].closingCost + ', ';
	}
    str = str + '<br>Depreciation:';
    str = str + '<br>Land: ';
	for(i = 0; i < propInfo.depreciation.length; i++){
		str = str + propInfo.depreciation[i].land + ', ';
	}
    str = str + '<br>Years: ';
	for(i = 0; i < propInfo.depreciation.length; i++){
		str = str + propInfo.depreciation[i].years + ', ';
	}
    str = str + '<br>Rent:';
    str = str + '<br>Income: ';
	for(i = 0; i < propInfo.rentalIncome.length; i++){
		str = str + propInfo.rentalIncome[i].rent + ', ';
	}
	var str = str + "<br>Global Data ";
	str = str + "<br>Personal tax rate: ";
	for(i = 0; i < propInfo.globalData.length; i++){
		str = str + propInfo.globalData[i].personalTaxBracket + ", ";
	}
	str = str + "<br>Depreciation Tax Rate :";
	for(i = 0; i < propInfo.globalData.length; i++){
		str = str + propInfo.globalData[i].depreciationTaxRate + ", ";
	}
	str = str + "<br>Long Term Capital Gain :";
	for(i = 0; i < propInfo.globalData.length; i++){
		str = str + propInfo.globalData[i].longTermCapitalGain + ", ";
	}
	str = str + "<br>YearlyChanges";
	str = str + "<br>Property Tax: ";
	for(i = 0; i < propInfo.yearlyChanges.length; i++){
		str = str + propInfo.yearlyChanges[i].propertyTax + ", ";
	}
	str = str + "<br>Inflation: ";
	for(i = 0; i < propInfo.yearlyChanges.length; i++){
		str = str + propInfo.yearlyChanges[i].inflation + ", ";
	}
	str = str + "<br>Property Appreciation: ";
	for(i = 0; i < propInfo.yearlyChanges.length; i++){
		str = str + propInfo.yearlyChanges[i].inflation + ", ";
	}
	str = str + "<br>Rent Appreciation: ";
	for(i = 0; i < propInfo.yearlyChanges.length; i++){
		str = str + propInfo.yearlyChanges[i].rentAppreciation + ", ";
	}
	str = str + "<br>Alternate Investment Return: ";
	for(i = 0; i < propInfo.yearlyChanges.length; i++){
		str = str + propInfo.yearlyChanges[i].alternateInvestmentReturn + ", ";
	}
	str = str + "<br>Annual Expenses";
	str = str + "<br>Hoa: ";
	for(i = 0; i < propInfo.expenses.length; i++){
		str = str + propInfo.expenses[i].hoa + ", ";
	}
	str = str + "<br>Insurance: ";
	for(i = 0; i < propInfo.expenses.length; i++){
		str = str + propInfo.expenses[i].insurance + ", ";
	}
	str = str + "<br>Property Mello Roos Tax: ";
	for(i = 0; i < propInfo.expenses.length; i++){
		str = str + propInfo.expenses[i].propertyMrTax + ", ";
	}
	str = str + "<br>Management Fee: ";
	for(i = 0; i < propInfo.expenses.length; i++){
		str = str + propInfo.expenses[i].managementFee + ", ";
	}
	str = str + "<br>Maintenance: ";
	for(i = 0; i < propInfo.expenses.length; i++){
		str = str + propInfo.expenses[i].maintenance + ", ";
	}
	str = str + "<br>Miscellaneous: ";
	for(i = 0; i < propInfo.expenses.length; i++){
		str = str + propInfo.expenses[i].miscellaneous + ", ";
	}
	str = str + "<br>Vacancy: ";
	for(i = 0; i < propInfo.expenses.length; i++){
		str = str + propInfo.expenses[i].vacancy + ", ";
	}
    str = str + '<br>Property Sale:';
    str = str + '<br>Years: ';
	for(var i = 0; i < propInfo.sale.length; i++){
		str = str + propInfo.sale[i].years + ', ';
	}
    str = str + '<br>Commission: ';
	for(var i = 0; i < propInfo.sale.length; i++){
		str = str + propInfo.sale[i].commission + ', ';
	}

document.getElementById("idTab4Test").innerHTML = str  ;
}//printInputData

