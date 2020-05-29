import { budgetController } from './budget-controller';
import { UIController } from './ui-controller';
import './vendor';
import './style.scss';

const controler = (function(budgetCtrl, UICtrl) {
	const setupEventListeners = () => {
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

		// event delegation for deleting an item
		document.querySelector(DOM.container).addEventListener('click', deleteItem);
	};

	// function to update the budget and display  in the DOM
	const updateBudget = () => {
		// calculate the budget
		budgetCtrl.calculateBudget();

		// return budget
		let budget = budgetCtrl.getBudget();

		// display budget on the UI
		UICtrl.displayBudget(budget);
	};

	// funciton to update the budget percentage and display in the DOM
	const updatePercentage = () => {
		// calculate the percentage
		budgetCtrl.calculatePercentage();
		//read percentage from budget controller data structure
		let percentages = budgetCtrl.getPercentages();
		// update the percentage in the UI
		console.log(percentages);
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
			UICtrl.addListItem(newItem, input.typeOfBudget);

			// clear fields after user input an item
			UICtrl.clearFields();

			// calculate and update budget
			updateBudget();
			// budgetController.testing();

			// calculate and update percentage
			updatePercentage();
		}
	};

	const deleteItem = (item) => {
		let itemID, splitID, type, id;

		itemID = item.target.parentNode.parentNode.parentNode.parentNode.id;
		// split the element id to retrive the number id
		if (itemID) {
			splitID = itemID.split('-');
			type = splitID[0];
			id = parseInt(splitID[1]);

			// delete item from data structure on budget-controller
			budgetCtrl.deleteItem(type, id);

			// delete item from the UI
			UICtrl.deleteListItem(itemID);

			// update and show the new budget
			updateBudget();
			// calculate and update percentage
			updatePercentage();
		}
	};

	// public
	return {
		init: () => {
			console.log('app started');
			// initialize fields to 0
			UICtrl.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
			setupEventListeners();
		}
	};
})(budgetController, UIController);

controler.init();
