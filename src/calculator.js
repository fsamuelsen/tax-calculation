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
	var overflow = data.overflow;
	function calc(amount) {
		var tax = amount*overflow;
		return amount + tax;
	};
	
	return {
		calculate: calc
	};
};