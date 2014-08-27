/**
 * @author Praveen
 */

//Calculates all data, tabulates and prints it. This function is called from the main panel
function printData(){
	//Do the property analysis and compute all values
	var propertyValue = propertyAnalysis(propertyLoan, propertyPurchase, depreciation, rentalIncome, globalData, yearlyChanges, expenses, sale, selectedScenario);
	var str = "<table><tr><th>Property Value </th></tr><tr><th>Month:</th> <th>Gross Income:</th> <th>Operating Expense:</th> <th>Net Income:</th> <th> Taxes: </th> <th> Cash Flow: </th>";
	str = str + "<th> Property Appreciation: </th> <th> Alternate Appreciation: </th></tr><br>";
	for(var i = 0; i < sale[selectedScenario].years * 12; i++){
		str = str + "<tr><td>" + i + "</td><td>" + propertyValue.grossIncome[i].toFixed(2) + "</td><td>" + propertyValue.operatingExpense[i].toFixed(2) + "</td><td>";
		str = str + propertyValue.netIncomeAfterTD[i].toFixed(2) + "</td><td>" + propertyValue.taxes[i].toFixed(2) + "</td><td>" + propertyValue.cashFlow[i].toFixed(2) + "</td><td>";
		str = str + propertyValue.propertyAppreciation[i].toFixed(2) + "</td><td>" + propertyValue.alternateInvestment[i].toFixed(2)  + "</td></tr>";
	}		
	str = str + "</table>";
	document.getElementById("idPrintData").innerHTML = str  ;
	//Graph the computed values
	drawIncome(propertyValue);
	drawAppreciation(propertyValue);
	
/*	var str = "loan amount: " + propertyPurchase.purchasePrice;
	
	var loanPayment = loanCalculator(propertyLoan, propertyPurchase);
    var str = "loan amount: " + propertyPurchase[selectedScenario].purchasePrice;
	str = str + " monthly paymnet: " + loanPayment.monthlyPayment + " loan amount: " + loanPayment.loanAmount + "<br>";
	for(var i = 0; i < propertyLoan.loanDuration * 12; i++)
		str = str + "month: " + i + " interest payment: " + loanPayment.interestPayment[i] + " ending balance: " + loanPayment.endingBalance[i] + "<br>";
	document.getElementById("idPrintData").innerHTML = str  ;	
*/	
	
 	
//	str = str + "monthly paymnet: " + loanPayment.monthlyPayment + " loan amount: " + loanPayment.loanAmount + "<br";
//	for(var i = 0; i < propertyLoan.loanDuration; i++)
//		str = str + "interest payment: " + loanPayment[i].interestPayment + " ending balance: " + loanPayment[i].endingBalance + "<br>";
		 
/*	for(var i = 1; i < 25; i++){
		str = str + "month: " + i + " Oi: " + grossIncome(rentalIncome, yearlyChanges, expenses, i, selectedScenario);
		str = str + " expense: " + operatingExpense(propertyLoan, propertyPurchase, rentalIncome, yearlyChanges, expenses, i, selectedScenario) + "<br>";
	}	
	
	var str = "local Storage: " + localStorage.length;
	for(var i = 0; i < localStorage.length; i++){
		var name = localStorage.key(i);
		var value = localStorage.getItem(name);
		str = str + "<br>" + name + ": " + value;
	}
	document.getElementById("idPrintData").innerHTML = str  ;
*/
}//printData

//Save all input data after it is entered. It is called from the main page
function saveData(savedObjects, propertyLoan, propertyPurchase, depreciation, rentalIncome, globalData, yearlyChanges, expenses, sale){
	var str = Array(savedObjects.length);
	
	for(var i = 0; i < savedObjects.length; i++){
		str[i] = JSON.stringify(arguments[i + 1]);
	}

	if (window.localStorage) {  // Only do this if the browser supports it
    	for(var i = 0; i < savedObjects.length; i++){
    		localStorage[savedObjects[i]] = str[i];
    	}
    	console.log("Data saved in local storage");
    }
}//saveData

/*
function calculate(savedObjects, propertyLoan, propertyPurchase, depreciation, rentalIncome, globalData, yearlyChanges, expenses, sale){
       document.getElementById("idMainPage").innerHTML = "test22";
	saveData(savedObjects, propertyLoan, propertyPurchase, depreciation, rentalIncome, globalData, yearlyChanges, expenses, sale);
 }
*/
