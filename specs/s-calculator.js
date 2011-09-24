describe('Calculator', function() {
	var subject;
	describe('No rates', function() {
		var data;
		beforeEach(function() {
			data = {
				overflow: .1
			};
			subject = new Calculator(data);
		});
		
		it('should calculate 300 correctly', function() {
			expect(subject.calculate(300)).toEqual(330);
		});
		it('should calculate 600 correctly', function() {
			expect(subject.calculate(600)).toEqual(660);
		});
	});
});