const resultTag = document.querySelector('.result');

let calculation = '';
function calculate(item) {
	if (item === '') {
		calculation = eval(item);
		resultTag.innerHTML = calculation;
		return
	}
	calculation = item;
  resultTag.innerHTML += calculation;
}