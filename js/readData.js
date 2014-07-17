/**
 * @author Praveen
 */

(function(){
	propertyLoan = new PropertyLoan(25.0, 4.5, 30);
	
	propertyPurchase[0] = new PropertyPurchase(415000, 500, 0.4);
	propertyPurchase[1] = new PropertyPurchase(415000, 500, 0.4);
	propertyPurchase[2] = new PropertyPurchase(415000, 500, 0.4);

	depreciation[0] = new Depreciation(40, 27.5);
	depreciation[1] = new Depreciation(40, 27.5);
	depreciation[2] = new Depreciation(40, 27.5);
	
	rentalIncome[0] = new RentalIncome(2200);
	rentalIncome[1] = new RentalIncome(2200);
	rentalIncome[2] = new RentalIncome(2200);

	globalData[0] = new GlobalData(45.0, 37.0, 27.0);
	globalData[1] = new GlobalData(45.0, 37.0, 27.0);
	globalData[2] = new GlobalData(45.0, 37.0, 27.0);

	yearlyChanges[0] = new YearlyChanges(2, 3, 3.75, 3.25, 5);
	yearlyChanges[1] = new YearlyChanges(2, 3, 3.75, 3.25, 5);
	yearlyChanges[2] = new YearlyChanges(2, 3, 3.75, 3.25, 5);	
	
	expenses[0] = new Expenses(300, 0.05, 1.85, 6.0, 0.1, 0.1, 5.0);
	expenses[1] = new Expenses(300, 0.05, 1.85, 6.0, 0.1, 0.1, 5.0);
	expenses[2] = new Expenses(300, 0.05, 1.85, 6.0, 0.1, 0.1, 5.0);
	
	sale[0] = new Sale(10, 5);
	sale[1]	= new Sale(15, 4.5);
	sale[2] = new Sale(30, 4);
	
	assignSavedObjects(numSavedObjects, savedObjects);
})();

function PropertyLoan(downPayment, loanInterestRate, loanDuration){
	this.downPayment = downPayment;
	this.loanInterestRate = loanInterestRate;
	this.loanDuration = loanDuration;
}

function PropertyPurchase(purchasePrice, capitalImprovement, closingCost){
	this.purchasePrice = purchasePrice;
	this.capitalImprovement = capitalImprovement;
	this.closingCost = closingCost;
}

function Depreciation(land, years){
	this.land = land;
	this.years = years;
}

function RentalIncome(rent){
	this.rent = rent;  //monthly rent
}

function GlobalData( personalTaxBracket, depreciationTaxRate, longTermCapitalGain){
	this.personalTaxBracket = personalTaxBracket;
	this.depreciationTaxRate = depreciationTaxRate;
	this.longTermCapitalGain = longTermCapitalGain;
}

function YearlyChanges( propertyTax, inflation, propertyAppreciation, rentAppreciation, alternateInvestmentReturn){
	this.propertyTax = propertyTax;
	this.inflation = inflation;
	this.propertyAppreciation = propertyAppreciation;
	this.rentAppreciation = rentAppreciation;
	this.alternateInvestmentReturn = alternateInvestmentReturn;
}

function Expenses(hoa, insurance, propertyMrTax, managementFee, maintenance, miscellaneous, vacancy){
	this.hoa = hoa;
	this.insurance = insurance;
	this.propertyMrTax = propertyMrTax;
	this.managementFee = managementFee;
	this.maintenance = maintenance;
	this.miscellaneous = miscellaneous;
	this.vacancy = vacancy;
}

function Sale(years, commission){
	this.years = years;
	this.commission = commission;
}

function updateGlobalData(globalData){
//	document.getElementById("idMainPage").innerHTML = "first: 1 ";
	document.getElementById("idMainPage").innerHTML = "first: 12" + globalData[0].personalTaxBracket + " next:" + globalData[1].personalTaxBracket;
//	document.getElementById("idMainPage").innerHTML = "first: " + globalData[0].personalTaxBracket + " sec: " + globalData[0].depreciationTaxRate + " thi: " + globalData[0].longTermCapitalGain;

}
function updateScenarioSelection(scenario){
	document.getElementById("idMainPage").innerHTML = scenario;
	selectedScenario = scenario;
}



function assignSavedObjects(numSavedObjects, savedObjects)
{
	var i = 0;
	savedObjects[i++] = "propertyLoan";
	savedObjects[i++] = "propertyPurchase";
	savedObjects[i++] = "depreciation";
	savedObjects[i++] = "rentalIncome";
	savedObjects[i++] = "globalData";
	savedObjects[i++] = "yearlyChanges";
	savedObjects[i++] = "expenses";
	savedObjects[i++] = "sale";
	if (i != numSavedObjects) throw new Error("Incorrect number of saved objects");
}
	

//Save all input data after it is entered
function saveData(savedObjects, propertyLoan, propertyPurchase, depreciation, rentalIncome, globalData, yearlyChanges, expenses, sale){
	var str = Array(savedObjects.length);
	
	for(var i = 0; i < savedObjects.length; i++){
		str[i] = JSON.stringify(arguments[i + 1]);
	}

	if (window.localStorage) {  // Only do this if the browser supports it
    	for(var i = 0; i < savedObjects.length; i++){
    		localStorage[savedObjects[i]] = str[i];
    	}
    }
}

// Automatically attempt to restore input fields when the document first loads.
window.onload = function() {
	
    // If the browser supports localStorage and we have some stored data
    if (window.localStorage && localStorage.propertyLoan) {  
    	propertyLoan = JSON.parse(localStorage.propertyLoan);
        document.getElementById("idDownPayment").value = propertyLoan.downPayment;
        document.getElementById("idLoanInterestRate").value = propertyLoan.loanInterestRate;
        document.getElementById("idLoanDuration").value = propertyLoan.loanDuration;
	}
    if (window.localStorage && localStorage.propertyPurchase) {  
    	propertyPurchase = JSON.parse(localStorage.propertyPurchase);
    	for(var i = 0; i < 3; i++){
    		document.getElementById("idPurchasePrice" + i).value = propertyPurchase[i].purchasePrice;
    		document.getElementById("idCapitalImprovement" + i).value = propertyPurchase[i].capitalImprovement;
    		document.getElementById("idClosingCost" + i).value = propertyPurchase[i].closingCost;
   		};
    }

    if (window.localStorage && localStorage.depreciation) {  
    	depreciation = JSON.parse(localStorage.depreciation);
    	for(var i = 0; i < 3; i++){
     		document.getElementById("idLand" + i).value = depreciation[i].land;
    		document.getElementById("idYears" + i).value = depreciation[i].years; 
    		}  	
	}
    if (window.localStorage && localStorage.rentalIncome) {  
    	rentalIncome = JSON.parse(localStorage.rentalIncome);
    	for(var i = 0; i < 3; i++){
     		document.getElementById("idRent" + i).value = rentalIncome[i].rent;
     	}
     }	
    if (window.localStorage && localStorage.globalData) {  
    	globalData = JSON.parse(localStorage.globalData);
    	for(var i = 0; i < 3; i++){
     		document.getElementById("idPersonalTaxBracket" + i).value = globalData[i].personalTaxBracket;
    		document.getElementById("idDepreciationTaxRate" + i).value = globalData[i].depreciationTaxRate;
     		document.getElementById("idLongTermCapitalGain" + i).value = globalData[i].longTermCapitalGain;
     	}
     }
   	if (window.localStorage && localStorage.yearlyChanges) {  
    	yearlyChanges = JSON.parse(localStorage.yearlyChanges);
    	for(var i = 0; i < 3; i++){
     		document.getElementById("idPropertyTax" + i).value = yearlyChanges[i].propertyTax;
    		document.getElementById("idInflation" + i).value = yearlyChanges[i].inflation;
     		document.getElementById("idPropertyAppreciation" + i).value = yearlyChanges[i].propertyAppreciation;
    		document.getElementById("idRentAppreciation" + i).value = yearlyChanges[i].rentAppreciation;
     		document.getElementById("idAlternateInvestmentReturn" + i).value = yearlyChanges[i].alternateInvestmentReturn;
     	}
 	}
	if (window.localStorage && localStorage.expenses) {  
    	expenses = JSON.parse(localStorage.expenses);
    	for(var i = 0; i < 3; i++){
     		document.getElementById("idHoa" + i).value = expenses[i].hoa;
     		document.getElementById("idInsurance" + i).value = expenses[i].insurance;
     		document.getElementById("idPropertyMrTax" + i).value = expenses[i].propertyMrTax;
     		document.getElementById("idManagementFee" + i).value = expenses[i].managementFee;
     		document.getElementById("idMaintenance" + i).value = expenses[i].maintenance;
     		document.getElementById("idMiscellaneous" + i).value = expenses[i].miscellaneous;
     		document.getElementById("idVacancy" + i).value = expenses[i].vacancy;
     	}
    }
     if (window.localStorage && localStorage.sale) {  
    	sale = JSON.parse(localStorage.sale);
    	for(var i = 0; i < 3; i++){
     		document.getElementById("idSellAfter" + i).value = sale[i].years;
     		document.getElementById("idCommission" + i).value = sale[i].commission;
     	}
     }	

};

