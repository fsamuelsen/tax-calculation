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
			expect(subject.calculate(200)).toEqual(220);
		});
		
		it('should calculate on the ceiling correctly', function() {
			expect(subject.calculate(400)).toEqual(440);
		});
		
		it('should calculate overflow correctly', function() {
			// result = 400*1.1 + 100*1.2 = 440 + 120 = 560
			expect(subject.calculate(500)).toEqual(560);
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
				expect(subject.calculate(200)).toEqual(220);
			});
			it('should calculate on first rate correctly', function() {
				expect(subject.calculate(400)).toEqual(440);
			});
		});
		describe('If the amount is withing the second rate', function() {
			it('should calculate below first rate correctly', function() {
				// result = 400*1.1 + 100*1.2 = 440 + 120 = 560
				expect(subject.calculate(500)).toEqual(560);
			});
			it('should calculate on first rate correctly', function() {
				// result = 400*1.1 + 200*1.2 = 440 + 240 = 680
				expect(subject.calculate(600)).toEqual(680);
			});
		});
		describe('If the amount overflow the rates', function() {
			it('should calculate overflow correctly', function() {
				// result = 400*1.1 + 200*1.2 + 100*1.3 = 440 + 240 + 130 = 920
				expect(subject.calculate(700)).toEqual(810);
			});
		});
	});
});