import { budgetController } from './budget-controller';
import { UIController } from './ui-controller';
import './vendor';
import './style.scss';

const controler = (function(budgetCtrl, UICtrl) {
	let setupEventListeners = () => {
		// DOM object elements from ui-controller
		let DOM = UICtrl.getDOMstrings();
		let addBtn = document.querySelector(DOM.addValue);

		addBtn.addEventListener('click', addItem);

		// listen for return press
		document.addEventListener('keypress', (e) => {
			if (e.keyCode === 13) {
				addItem();
			}
		});
	};

	const addItem = () => {
		// get fields input data
		const input = UICtrl.getInput();
	};

	return {
		init: () => {
			console.log('app started');
			setupEventListeners();
		}
	};
})(budgetController, UIController);

controler.init();
