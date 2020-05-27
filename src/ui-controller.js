export const UIController = (function() {
	// store all the DOM element for easy change
	let DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputAddValue: '.add__value',
		addValue: '.add__btn'
	};
	return {
		getInput: () => {
			return {
				typeOfBudget: document.querySelector(DOMstrings.inputType).value,
				budgetDescription: document.querySelector(DOMstrings.inputDescription).value,
				budgetValue: document.querySelector(DOMstrings.inputAddValue).value
			};
		},

		getDOMstrings: () => {
			return DOMstrings;
		}
	};
})();
