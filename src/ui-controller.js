export const UIController = (function() {
	// store all the DOM element for easy change
	let DOMstrings = {
		inputType: '.add__type',
		inputDesc: '.add__description',
		inputAddValue: '.add__value',
		addValue: '.add__btn'
	};
	return {
		getInput: () => {
			return {
				// income or expense type
				typeOfBudget: document.querySelector(DOMstrings.inputType).value,
				// description of the income or expense
				budgetDesc: document.querySelector(DOMstrings.inputDesc).value,
				// the amount
				budgetValue: document.querySelector(DOMstrings.inputAddValue).value
			};
		},

		getDOMstrings: () => {
			return DOMstrings;
		}
	};
})();
