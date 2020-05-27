import { budgetController } from './budget-controller';
import { UIController } from './ui-controller';
import './vendor';
import './style.scss';

const controler = (function(budgetCtrl, UICtrl) {
	let DOM = UICtrl.getDOMstrings();
	// get filed input data
	let desc = document.querySelector('.add__description');
	let value = document.querySelector('.add__value');
	let addBtn = document.querySelector(DOM.addValue);

	const addItem = () => {
		// get input fields data
		const input = UICtrl.getInput();
		console.log(input);
	};

	addBtn.addEventListener('click', addItem);

	// listen for return press
	document.addEventListener('keypress', (e) => {
		if (e.keyCode === 13) {
			addItem();
		}
	});
})(budgetController, UIController);
