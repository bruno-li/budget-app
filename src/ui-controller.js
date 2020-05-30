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
			container: '.container',
			expensesPercLabel: '.item__percentage',
			monthLabel: '.budget__title--month'
		},
		formatNumber = (num, type) => {
			let numSplit, int, dec, sign;

			num = Math.abs(num);

			num = num.toFixed(2);

			numSplit = num.split('.');

			int = numSplit[0];
			// add the comma according to the amount
			if (int.length > 3) {
				int = `${int.substr(0, int.length - 3)} , ${int.substr(int.length - 3, 3)}`;
			}
			dec = numSplit[1];

			type === 'exp' ? (sign = '-') : (sign = '+');

			return `${sign} ${int}.${dec}`;
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
                                <div class="item__value">${formatNumber(newItemObj.value, type)}</div>
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
                                <div class="item__value">${formatNumber(newItemObj.value, type)}</div>
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

		deleteListItem: (selectorID) => {
			let element = document.getElementById(selectorID);
			element.parentNode.removeChild(element);
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
			let type;
			obj.budget > 0 ? (type = 'inc') : (type = 'exp');

			document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
			document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.budget, 'inc');
			document.querySelector(DOMstrings.expenseLabel).textContent = formatNumber(obj.budget, 'exp');

			//display % only if available
			if (obj.percentage > 0) {
				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {
				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		},

		displayPercentage: (percentages) => {
			// get all percentage elements
			let fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

			// spread nodelist into an array and loop thorugh them
			[ ...fields ].forEach((item, index) => {
				if (percentages[index] > 0) {
					item.textContent = percentages[index] + '%';
				} else {
					item.textContent = '---';
				}
			});
		},
		getMonth: () => {
			let currentMonth, months, year, date;
			months = [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December'
			];
			// get current year
			year = new Date();
			year.getFullYear();

			// get current month
			date = new Date();
			currentMonth = date.getMonth();
			// display in the DOM
			document.querySelector(DOMstrings.monthLabel).innerHTML = `${months[currentMonth]} , ${year.getFullYear()}`;
		},

		getDOMstrings: () => {
			return DOMstrings;
		}
	};
})();
