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

	const updateBudget = () => {
		// calculate the budget
		budgetController.calculateBudget();
		// return budget
		let budget = budgetController.getBudget();

		// display budget on the UI
		console.log(budget);
	};

	// main method that calls the modules methods to create a new item
	const addItem = () => {
		//variables declarations
		let input, newItem;

		// get fields input data
		input = UICtrl.getInput();

		if (input.budgetDesc !== '' && !isNaN(input.budgetValue) && input.budgetValue > 0) {
			// add the item to the budget controller
			newItem = budgetCtrl.addItem(input.typeOfBudget, input.budgetDesc, input.budgetValue);

			// add the item to the UI
			UIController.addListItem(newItem, input.typeOfBudget);

			// clear fields after user input an item
			UIController.clearFields();

			// calculate and update budget
			updateBudget();
			// budgetController.testing();
		}
	};

	return {
		init: () => {
			console.log('app started');
			setupEventListeners();
		}
	};
})(budgetController, UIController);

controler.init();
