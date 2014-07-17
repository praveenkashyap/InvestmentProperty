/**
 * @author Praveen
 */
//To display the three tabs and hide them when focus is removed
function tab(tab) {
	document.getElementById('tab1').style.display = 'none';
	document.getElementById('tab2').style.display = 'none';
	document.getElementById('tab3').style.display = 'none';
	document.getElementById('li_tab1').setAttribute("class", "");
	document.getElementById('li_tab2').setAttribute("class", "");
	document.getElementById('li_tab3').setAttribute("class", "");
	document.getElementById(tab).style.display = 'block';
	document.getElementById('li_'+tab).setAttribute("class", "active");
}

/*function printData(globalData, yearlyChanges, expenses){
	var str = "local Storage: " + localStorage.length;
	for(var i = 0; i < localStorage.length; i++){
		var name = localStorage.key(i);
		var value = localStorage.getItem(name);
		str = str + "<br>" + name + ": " + value;
	}
	document.getElementById("idPrintData").innerHTML = str  ;
}
*/


function printData(){
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
*/

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
}

function calculate(savedObjects, propertyLoan, propertyPurchase, depreciation, rentalIncome, globalData, yearlyChanges, expenses, sale){
       document.getElementById("idMainPage").innerHTML = "test22";
	saveData(savedObjects, propertyLoan, propertyPurchase, depreciation, rentalIncome, globalData, yearlyChanges, expenses, sale);
 }



/*function printData(globalData, yearlyChanges, expenses){
	var str = "Global Data ";
	str = str + "<br>Personal tax rate: ";
	for(var i = 0; i < globalData.length; i++){
		str = str + globalData[i].personalTaxBracket + ", ";
	}
	str = str + "<br>Depreciation Tax Rate :";
	for(i = 0; i < globalData.length; i++){
		str = str + globalData[i].depreciationTaxRate + ", ";
	}
	str = str + "<br>Long Term Capital Gain :";
	for(i = 0; i < globalData.length; i++){
		str = str + globalData[i].longTermCapitalGain + ", ";
	}
	str = str + "<br>YearlyChanges";
	str = str + "<br>Property Tax: ";
	for(i = 0; i < yearlyChanges.length; i++){
		str = str + yearlyChanges[i].propertyTax + ", ";
	}
	str = str + "<br>Inflation: ";
	for(i = 0; i < yearlyChanges.length; i++){
		str = str + yearlyChanges[i].inflation + ", ";
	}
	str = str + "<br>Property Appreciation: ";
	for(i = 0; i < yearlyChanges.length; i++){
		str = str + yearlyChanges[i].propertyAppreciation + ", ";
	}
	str = str + "<br>Rent Appreciation: ";
	for(i = 0; i < yearlyChanges.length; i++){
		str = str + yearlyChanges[i].rentAppreciation + ", ";
	}
	str = str + "<br>Alternate Investment Return: ";
	for(i = 0; i < yearlyChanges.length; i++){
		str = str + yearlyChanges[i].alternateInvestmentReturn + ", ";
	}
	str = str + "<br>Annual Expenses";
	str = str + "<br>Hoa: ";
	for(i = 0; i < expenses.length; i++){
		str = str + expenses[i].hoa + ", ";
	}
	str = str + "<br>Insurance: ";
	for(i = 0; i < expenses.length; i++){
		str = str + expenses[i].insurance + ", ";
	}
	str = str + "<br>Property Mello Roos Tax: ";
	for(i = 0; i < expenses.length; i++){
		str = str + expenses[i].propertyMrTax + ", ";
	}
	str = str + "<br>Management Fee: ";
	for(i = 0; i < expenses.length; i++){
		str = str + expenses[i].managementFee + ", ";
	}
	str = str + "<br>Maintenance: ";
	for(i = 0; i < expenses.length; i++){
		str = str + expenses[i].maintenance + ", ";
	}
	str = str + "<br>Miscellaneous: ";
	for(i = 0; i < expenses.length; i++){
		str = str + expenses[i].miscellaneous + ", ";
	}
	str = str + "<br>Vacancy: ";
	for(i = 0; i < expenses.length; i++){
		str = str + expenses[i].vacancy + ", ";
	}

	document.getElementById("idPrintData").innerHTML = str  ;
}*/

