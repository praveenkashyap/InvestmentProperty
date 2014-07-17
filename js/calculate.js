/**
 * @author Praveen
 */

//Monthly income adjusted for expenses. Future rental appreciation and inflation is accounted for
function grossIncome(rentalIncome, yearlyChanges, expenses, month, selScen){
	var monthlyRent = rentalIncome[selScen].rent * Math.pow(1 + ((yearlyChanges[selScen].rentAppreciation/100)/12), month);
	var monthlyLosses = monthlyRent * expenses[selScen].vacancy/100;

	return monthlyRent - monthlyLosses;
}

function operatingExpense(propertyLoan, propertyPurchase, rentalIncome, yearlyChanges, expenses, month, selScen)
{
	var monthlyInflation = Math.pow(1 + ((yearlyChanges[selScen].inflation/100)/12), month);
	var hoa = expenses[selScen].hoa * monthlyInflation;
	var insurance = expenses[selScen].insurance/100/12 * propertyPurchase[selScen].purchasePrice * monthlyInflation;
	var managementFee = expenses[selScen].managementFee/100 * rentalIncome[selScen].rent * monthlyInflation;
	var maintenance = expenses[selScen].maintenance/100/12 * propertyPurchase[selScen].purchasePrice * monthlyInflation;
	var miscellaneous = expenses[selScen].miscellaneous/100/12 * propertyPurchase[selScen].purchasePrice * monthlyInflation;
	var propertyMrTax = expenses[selScen].propertyMrTax/100/12 * propertyPurchase[selScen].purchasePrice * Math.pow(1 + ((yearlyChanges[selScen].propertyTax/100)/12), month);

	return hoa + insurance + managementFee + maintenance + miscellaneous + propertyMrTax;
}
//Calculate the loan payment, amount left and amount going towards principal every month.
function loanCalculator(propertyLoan, propertyPurchase, selScen){	
	var loanPayment = Object.create({monthlyPayment:0, loanAmount:0, interestPayment:[propertyLoan.loanDuration * 12], endingBalance:[propertyLoan.loanDuration * 12]});
    
    loanPayment.loanAmount = propertyPurchase[selScen].purchasePrice * (1 - propertyLoan.downPayment/100);
    var intPower = Math.pow(1 + propertyLoan.loanInterestRate/100/12, propertyLoan.loanDuration * 12);
    loanPayment.monthlyPayment = (loanPayment.loanAmount * intPower * propertyLoan.loanInterestRate/100/12)/(intPower - 1);
    var equity = 0;
    for(var p = 0; p <= propertyLoan.loanDuration * 12; p++) {
        // For each payment, figure out how much is interest
        loanPayment.interestPayment[p] = (loanPayment.loanAmount - equity) * propertyLoan.loanInterestRate/100/12;
        equity += (loanPayment.monthlyPayment - loanPayment.interestPayment[p]);  // The rest goes to equity
		loanPayment.endingBalance[p] = loanPayment.loanAmount - equity;
    }
/*	
	var str = "loan amount: " + propertyPurchase[selScen].purchasePrice;
	str = str + " monthly paymnet: " + loanPayment.monthlyPayment + " loan amount: " + loanPayment.loanAmount + "<br>";
	for(var i = 0; i < propertyLoan.loanDuration * 12; i++)
		str = str + "month: " + i + " interest payment: " + loanPayment.interestPayment[i] + " ending balance: " + loanPayment.endingBalance[i] + "<br>";
	document.getElementById("idPrintData").innerHTML = str  ;	
	*/
	return loanPayment;		
}

//Calculate monthly depreciation
function calculateDepreciation(propertyPurchase, depreciation, selScen){
	return (propertyPurchase[selScen].purchasePrice * ((1 - depreciation[selScen].land/100)/depreciation[selScen].years/12));
}

//Calculate property Appreciation. Does not include cumulative mortgage principal payment (B36), cumulative cash flow  (B28) and cumulative tax for recaptured depreciation (B42)
function propertyAppreciation(propertyLoan, propertyPurchase, globalData, yearlyChanges, sale, selScen, month, loanPayment, monDep){
	var curPropValue = propertyPurchase[selScen].purchasePrice * Math.pow(1 + ((yearlyChanges[selScen].propertyAppreciation/100)/12), month); //B40
	var salesCharge = curPropValue * sale[selScen].commission/100; //B41
	var costBasis = (propertyPurchase[selScen].closingCost/100 + 1) * propertyPurchase[selScen].purchasePrice + propertyPurchase[selScen].capitalImprovement;
	var taxGain = ((curPropValue - salesCharge - costBasis) * globalData[selScen].longTermCapitalGain/100); //B43
	var totalInitialPayment = propertyPurchase[selScen].closingCost/100 * propertyPurchase[selScen].purchasePrice + propertyPurchase[selScen].capitalImprovement + 
		propertyPurchase[selScen].purchasePrice * propertyLoan.downPayment/100; //PB35

//	return taxGain;
	return (((curPropValue - salesCharge - loanPayment.endingBalance[month]) - taxGain) - totalInitialPayment);
}

//Calculate how an alternate investment of the initial capital would perform. Does not include the monthly payments or returns from the property
function alternateInvestment(propertyLoan, propertyPurchase, globalData, yearlyChanges, selScen, month){
	var altInvestment = ((propertyLoan.downPayment/100 + propertyPurchase[selScen].closingCost/100) * propertyPurchase[selScen].purchasePrice + 
			 propertyPurchase[selScen].capitalImprovement);
	var altInvestmentApp = altInvestment * Math.pow((1 + yearlyChanges[selScen].alternateInvestmentReturn/100/12), month); //B48
	var taxesPaid = (altInvestmentApp - altInvestment) * globalData[selScen].longTermCapitalGain/100; //B49
	
	return (altInvestmentApp - taxesPaid - altInvestment); 
}

//Analyse the value of the property, with operating income, net income, cash flow analysis and alternate investment analysis
function propertyAnalysis(propertyLoan, propertyPurchase, depreciation, rentalIncome, globalData, yearlyChanges, expenses, sale, selScen){

	var i = sale[selScen].years * 12;	
	var propertyValue = Object.create({grossIncome:[i], operatingExpense:[i], netIncomeAfterTD:[i], taxes:[i], cashFlow:[i], propertyAppreciation:[i], alternateInvestment:[i]});
	
	var loanPayment = loanCalculator(propertyLoan, propertyPurchase, selScen);
	var monDep = calculateDepreciation(propertyPurchase, depreciation, selScen); //monthly depreciation
	var taxableIncome; //B21
	var netIncome; //B16
	var cumulativeCashFlow = 0; //B28
	var cumulativePrincipal = 0; //B36
	var cumulativeTaxRecapDep = 0; //B42
	
	for(var mon = 0; mon < sale[selScen].years * 12; mon++){
		propertyValue.grossIncome[mon] = grossIncome(rentalIncome, yearlyChanges, expenses, mon, selScen); //B5
		propertyValue.operatingExpense[mon] = operatingExpense(propertyLoan, propertyPurchase, rentalIncome, yearlyChanges, expenses, mon, selScen); //B14
		netIncome = propertyValue.grossIncome[mon] - propertyValue.operatingExpense[mon] - loanPayment.interestPayment[mon];	//B16
		taxableIncome = netIncome - monDep; 
		propertyValue.taxes[mon] = ((netIncome - monDep) > 0 ? (netIncome - monDep) : 0) * globalData[selScen].personalTaxBracket/100; //B22
		propertyValue.netIncomeAfterTD[mon] = taxableIncome - propertyValue.taxes[mon]; //B23
		propertyValue.cashFlow[mon] = propertyValue.netIncomeAfterTD[mon] + monDep; //B27
		cumulativeCashFlow = cumulativeCashFlow * (1 + yearlyChanges[selScen].alternateInvestmentReturn/100/12) + propertyValue.cashFlow[mon]; //B28
		cumulativePrincipal = cumulativePrincipal * (1 + yearlyChanges[selScen].alternateInvestmentReturn/100/12) + (loanPayment.monthlyPayment - loanPayment.interestPayment[mon]); //B36
		cumulativeTaxRecapDep += (monDep * globalData[selScen].depreciationTaxRate/100) ; //B42

		propertyValue.propertyAppreciation[mon] = propertyAppreciation(propertyLoan, propertyPurchase, globalData, yearlyChanges, sale, selScen, mon, loanPayment, monDep) +
				cumulativeCashFlow - cumulativePrincipal - cumulativeTaxRecapDep; //B45				
		propertyValue.alternateInvestment[mon] = alternateInvestment(propertyLoan, propertyPurchase, globalData, yearlyChanges, selScen, mon); //B50
		
	}
	
	return propertyValue;
}
