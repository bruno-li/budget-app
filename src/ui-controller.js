export const UIController = (function() {
	// store all the DOM element for easy change
	let DOMstrings = {
		inputType: '.add__type',
		inputDesc: '.add__description',
		inputAddValue: '.add__value',
		addValue: '.add__btn',
		incomeContainer: '.income__list',
		expensesContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expenseLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container'
	};

	return {
		getInput: () => {
			return {
				// income or expense type
				typeOfBudget: document.querySelector(DOMstrings.inputType).value,
				// description of the income or expense
				budgetDesc: document.querySelector(DOMstrings.inputDesc).value,
				// get the amount and parse to float
				budgetValue: parseFloat(document.querySelector(DOMstrings.inputAddValue).value)
			};
		},

		addListItem: (newItemObj, type) => {
			let html, element;

			if (type === 'inc') {
				element = DOMstrings.incomeContainer;
				//create html string with placeholder text
				html = ` <div class="item clearfix" id="inc-${newItemObj.id}">
                            <div class="item__description">${newItemObj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${newItemObj.value}</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="far fa-times-circle"></i></button>
                                </div>
                            </div>
                        </div>`;
			} else if (type === 'exp') {
				element = DOMstrings.expensesContainer;
				html = ` <div class="item clearfix" id="exp-${newItemObj.id}">
                            <div class="item__description">${newItemObj.description}</div>
                            <div class="right clearfix">
                                <div class="item__value">${newItemObj.value}</div>
                                <div class="item__percentage">21%</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="far fa-times-circle"></i></button>
                                </div>
                            </div>
                 </div>`;
			}

			//replace the placeholder text with data
			//insert html into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', html);
		},

		clearFields: () => {
			let fields, fieldsArr;
			// selects both input fields
			fields = document.querySelectorAll(`${DOMstrings.inputDesc} , ${DOMstrings.inputAddValue}`);

			// converting the nodelist into an array
			fieldsArr = Array.prototype.slice.call(fields);
			// clear the fields
			fieldsArr.forEach((field) => {
				field.value = '';
			});
			// focus back to description input
			fieldsArr[0].focus();
		},
		// display values in the DOM
		displayBudget: (obj) => {
			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expenseLabel).textContent = obj.totalExp;

			//display % only if available
			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		},

		getDOMstrings: () => {
			return DOMstrings;
		}
	};
})();
