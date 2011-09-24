/*
Income					Tax Rate
Up to 5,070				10%
5,071 up to 8,660		14%
8,661 up to 14,070		23%
14,071 up to 21,240		30%
21,241 up to 40,230		33%
Higher than 40,230		45%
*/

var Calculator = function(data) {
	var rates = data.rates || [];
		overflow = data.overflow;
		
	function calc(amount) {
		var tax = 0,
			remaining = amount;
		
		function calculatingRates(rate) {
			var amount = Math.min(rate.ceil, remaining);
			remaining -= amount;
			tax += amount * rate.tax;
			return remaining > 0;
		}
		
		if(rates.every(calculatingRates)) {
			tax += remaining * overflow;
		}
		return amount + tax;
	};
	
	return {
		calculate: calc
	};
};