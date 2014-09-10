/**
 * @author Praveen
 */
//Call the constructor on all property objects. 
(function(){
	var propertyAddress = new PropertyAddress("", "", "", "");
	
	var propertyLoan = new PropertyLoan(25.0, 4.5, 30);

	var propertyPurchase = [scenario];
	var depreciation = [scenario];
	var rentalIncome = [scenario];
	var globalData   = [scenario];
	var yearlyChanges = [scenario];
	var expenses = [scenario];
	var sale = [scenario];

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
	sale[1]	= new Sale(15, 1.5);
	sale[2] = new Sale(30, 4);
	
	propInfo.propertyAddress = propertyAddress;
	propInfo.propertyLoan = propertyLoan;
	propInfo.propertyPurchase = propertyPurchase;
	propInfo.depreciation = depreciation;
	propInfo.rentalIncome = rentalIncome;
	propInfo.globalData = globalData;
	propInfo.yearlyChanges = yearlyChanges;
	propInfo.expenses = expenses;
	propInfo.sale = sale;
	
//	assignSavedObjects(numSavedObjects, savedObjects);
})();

function PropertyAddress(street, city, state, fileName){
	this.street = street;
	this.city = city;
	this.state = state;
	this.fileName = fileName;
}

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

//Read stored data from a file on the server
function readPropertyData(fileName){
	var xmlhttp;

	if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();}
	else{// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");}

	//Read file from the server. The URL is /propertyFileRead and query key is fileName with value as the name of the file. 
	//restore the read data to the html page
 	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
			propInfo = JSON.parse(xmlhttp.responseText);
			restoreData(propInfo);
		}};
	xmlhttp.open("GET", "/propertyFileRead?fileName=" + fileName, true);
	xmlhttp.send();
 	
}//readPropertyData


//Restore input data on the table from data stored locally in data structure.
function restoreData(propInfo) {	
	var i, str = "";
	
	//Add prop address info
	document.getElementById("idPropertyAddressStreet").value = propInfo.propertyAddress.street;
	document.getElementById("idPropertyAddressCity").value = propInfo.propertyAddress.city;
	document.getElementById("idPropertyAddressState").value = propInfo.propertyAddress.state;
	
    document.getElementById("idDownPayment").value = propInfo.propertyLoan.downPayment;
    document.getElementById("idLoanInterestRate").value = propInfo.propertyLoan.loanInterestRate;
    document.getElementById("idLoanDuration").value = propInfo.propertyLoan.loanDuration;
    
	for(i = 0; i < 3; i++){
		document.getElementById("idPurchasePrice" + i).value = propInfo.propertyPurchase[i].purchasePrice;
		document.getElementById("idCapitalImprovement" + i).value = propInfo.propertyPurchase[i].capitalImprovement;
		document.getElementById("idClosingCost" + i).value = propInfo.propertyPurchase[i].closingCost;
		}

	for(i = 0; i < 3; i++){
 		document.getElementById("idLand" + i).value = propInfo.depreciation[i].land;
		document.getElementById("idYears" + i).value = propInfo.depreciation[i].years; 
		}  	

	for(i = 0; i < 3; i++){
 		document.getElementById("idRent" + i).value = propInfo.rentalIncome[i].rent;
 	}

	for(i = 0; i < 3; i++){
 		document.getElementById("idPersonalTaxBracket" + i).value = propInfo.globalData[i].personalTaxBracket;
		document.getElementById("idDepreciationTaxRate" + i).value = propInfo.globalData[i].depreciationTaxRate;
 		document.getElementById("idLongTermCapitalGain" + i).value = propInfo.globalData[i].longTermCapitalGain;
 	}

   	for(i = 0; i < 3; i++){
 		document.getElementById("idPropertyTax" + i).value = propInfo.yearlyChanges[i].propertyTax;
		document.getElementById("idInflation" + i).value = propInfo.yearlyChanges[i].inflation;
 		document.getElementById("idPropertyAppreciation" + i).value = propInfo.yearlyChanges[i].propertyAppreciation;
		document.getElementById("idRentAppreciation" + i).value = propInfo.yearlyChanges[i].rentAppreciation;
 		document.getElementById("idAlternateInvestmentReturn" + i).value = propInfo.yearlyChanges[i].alternateInvestmentReturn;
 	}

	for(i = 0; i < 3; i++){
 		document.getElementById("idHoa" + i).value = propInfo.expenses[i].hoa;
 		document.getElementById("idInsurance" + i).value = propInfo.expenses[i].insurance;
 		document.getElementById("idPropertyMrTax" + i).value = propInfo.expenses[i].propertyMrTax;
 		document.getElementById("idManagementFee" + i).value = propInfo.expenses[i].managementFee;
 		document.getElementById("idMaintenance" + i).value = propInfo.expenses[i].maintenance;
 		document.getElementById("idMiscellaneous" + i).value = propInfo.expenses[i].miscellaneous;
 		document.getElementById("idVacancy" + i).value = propInfo.expenses[i].vacancy;
 	}

	for(i = 0; i < 3; i++){
 		document.getElementById("idSellAfter" + i).value = propInfo.sale[i].years;
 		document.getElementById("idCommission" + i).value = propInfo.sale[i].commission;
 	}
}//RestoreData

// Automatically attempt to restore input fields when the document first loads. The order in which this data is shown ??
window.onload = function() {	
		var i;

//		propInfo = readPropertyData();
//		readPropertyData();
//		savePropertyDataToLocal();
//		restoreData(propInfo);
//		printInputData(propInfo);
		

/*
        // If the browser supports localStorage and we have some stored data. Do this for all (9) property objects
        if (window.localStorage && localStorage.propertyAddress) {
    	propertyAddress = JSON.parse(localStorage.propertyAddress);
    	document.getElementById("idPropertyAddressStreet").value = propertyAddress.street;
    	
    }
    if (window.localStorage && localStorage.propertyLoan) {  
    	propertyLoan = JSON.parse(localStorage.propertyLoan);
        document.getElementById("idDownPayment").value = propertyLoan.downPayment;
        document.getElementById("idLoanInterestRate").value = propertyLoan.loanInterestRate;
        document.getElementById("idLoanDuration").value = propertyLoan.loanDuration;
	}
    if (window.localStorage && localStorage.propertyPurchase) {  
    	propertyPurchase = JSON.parse(localStorage.propertyPurchase);
    	for(i = 0; i < 3; i++){
    		document.getElementById("idPurchasePrice" + i).value = propertyPurchase[i].purchasePrice;
    		document.getElementById("idCapitalImprovement" + i).value = propertyPurchase[i].capitalImprovement;
    		document.getElementById("idClosingCost" + i).value = propertyPurchase[i].closingCost;
   		}
    }

    if (window.localStorage && localStorage.depreciation) {  
    	depreciation = JSON.parse(localStorage.depreciation);
    	for(i = 0; i < 3; i++){
     		document.getElementById("idLand" + i).value = depreciation[i].land;
    		document.getElementById("idYears" + i).value = depreciation[i].years; 
    		}  	
	}
    if (window.localStorage && localStorage.rentalIncome) {  
    	rentalIncome = JSON.parse(localStorage.rentalIncome);
    	for(i = 0; i < 3; i++){
     		document.getElementById("idRent" + i).value = rentalIncome[i].rent;
     	}
     }	
    if (window.localStorage && localStorage.globalData) {  
    	globalData = JSON.parse(localStorage.globalData);
    	for(i = 0; i < 3; i++){
     		document.getElementById("idPersonalTaxBracket" + i).value = globalData[i].personalTaxBracket;
    		document.getElementById("idDepreciationTaxRate" + i).value = globalData[i].depreciationTaxRate;
     		document.getElementById("idLongTermCapitalGain" + i).value = globalData[i].longTermCapitalGain;
     	}
     }
   	if (window.localStorage && localStorage.yearlyChanges) {  
    	yearlyChanges = JSON.parse(localStorage.yearlyChanges);
    	for(i = 0; i < 3; i++){
     		document.getElementById("idPropertyTax" + i).value = yearlyChanges[i].propertyTax;
    		document.getElementById("idInflation" + i).value = yearlyChanges[i].inflation;
     		document.getElementById("idPropertyAppreciation" + i).value = yearlyChanges[i].propertyAppreciation;
    		document.getElementById("idRentAppreciation" + i).value = yearlyChanges[i].rentAppreciation;
     		document.getElementById("idAlternateInvestmentReturn" + i).value = yearlyChanges[i].alternateInvestmentReturn;
     	}
 	}
	if (window.localStorage && localStorage.expenses) {  
    	expenses = JSON.parse(localStorage.expenses);
    	for(i = 0; i < 3; i++){
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
    	for(i = 0; i < 3; i++){
     		document.getElementById("idSellAfter" + i).value = sale[i].years;
     		document.getElementById("idCommission" + i).value = sale[i].commission;
     	}
     }	
     
*/
};//window.onLoad

