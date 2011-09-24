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
			expect(subject.calculateTax(300)).toEqual(30);
		});
		it('should calculate 600 correctly', function() {
			expect(subject.calculateTax(600)).toEqual(60);
		});
	});
	describe('One rate', function() {
		var data;
		beforeEach(function() {
			data = {
				rates: [
					{
						ceil: 400,
						tax: .1
					}
				],
				overflow: .2
			};
			subject = new Calculator(data);
		});
		
		it('should calculate below ceiling correctly', function() {
			expect(subject.calculateTax(200)).toEqual(20);
		});
		
		it('should calculate on the ceiling correctly', function() {
			expect(subject.calculateTax(400)).toEqual(40);
		});
		
		it('should calculate overflow correctly', function() {
			// result = 400*.1 + 100*.2 = 40 + 20 = 60
			expect(subject.calculateTax(500)).toEqual(60);
		});
	});
	describe('When calculating two rates', function() {
		var data;
		beforeEach(function() {
			data = {
				rates: [
					{
						ceil: 400,
						tax: .1
					},
					{
						ceil: 600,
						tax: .2
					}
				],
				overflow: .3
			};
			subject = new Calculator(data);
		});
		
		describe('If the amount is within the first rate', function() {
			it('should calculate below first rate correctly', function() {
				expect(subject.calculateTax(200)).toEqual(20);
			});
			it('should calculate on first rate correctly', function() {
				expect(subject.calculateTax(400)).toEqual(40);
			});
		});
		describe('If the amount is withing the second rate', function() {
			it('should calculate below first rate correctly', function() {
				// result = 400*.1 + 100*.2 = 40 + 20 = 60
				expect(subject.calculateTax(500)).toEqual(60);
			});
			it('should calculate on first rate correctly', function() {
				// result = 400*.1 + 200*.2 = 40 + 40 = 80
				expect(subject.calculateTax(600)).toEqual(80);
			});
		});
		describe('If the amount overflow the rates', function() {
			it('should calculate overflow correctly', function() {
				// result = 400*.1 + 200*.2 + 100*.3 = 40 + 40 + 30 = 110
				expect(subject.calculateTax(700)).toEqual(110);
			});
		});
	});
});