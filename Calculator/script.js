const resultTag = document.querySelector('.result');

let calculation = '';
let index = 0;
function calculate(item) {
	if (item === 'clear') {
		calculation = '';
		resultTag.innerHTML = calculation;
		return;
	}
	if (item === ' = ') {
		try {
			calculation = eval(calculation) + '';
			resultTag.innerHTML = calculation;
			index++;
		} catch (error) {			
			resultTag.innerHTML = 'Error';
			calculation = '';
		}
		return;
	} 
	if (index > 0) {
		calculation = '';
		index = 0;
	}
	calculation += item;
  resultTag.innerHTML = calculation;
}
