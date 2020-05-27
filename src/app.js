import { budgetController } from './budget-controller';
import { UIController } from './ui-controller';
import './vendor';
import './style.scss';

const controler = (function(budgetCtrl, UICtrl) {
	// get filed input data
	let desc = document.querySelector('.add__description');
	let value = document.querySelector('.add__value');
	let addBtn = document.querySelector('.add__btn');

	const addItem = () => {
		// add the item to the budget controler
		// add the item to the UI
		// calculate budget
		// display the budget
	};

	addBtn.addEventListener('click', addItem);

	document.addEventListener('keypress', (e) => {
		if (e.keyCode === 13) {
			addItem();
		}
	});
})(budgetController, UIController);
