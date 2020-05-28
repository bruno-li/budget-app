const budgetController = (function() {
	//factory functions for Expense and Income
	const Expense = (id, description, value) => {
		return { id, description, value };
	};
	const Income = (id, description, value) => {
		return { id, description, value };
	};

	const calculateTotal = (type) => {
		// get the sum of either inc or exp and assign it to totals obj
		let sum = data.allItems[type].reduce((acc, item) => {
			acc += item.value;
			return acc;
		}, 0);

		data.totals[type] = sum;
	};
	// data structure to store user input
	const data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		percentage: -1
	};

	// public method
	return {
		addItem: (type, desc, val) => {
			let newItem, ID;
			// create unique ID for every new item by retriving the last id of the exp array of objs
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// check what type value user is adding, expense or income
			if (type === 'exp') {
				newItem = Expense(ID, desc, val);
			} else if (type === 'inc') {
				newItem = Income(ID, desc, val);
			}
			// push the new item according to the type
			data.allItems[type].push(newItem);

			// return element
			return newItem;
		},

		calculateBudget: () => {
			//calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');
			//calculate budget: income - expenses
			data.budget = data.totals.inc - data.totals.exp;
			//calculate percentage of income that was spent
			if (data.totals.inc > 0) {
				data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
			} else {
				data.percentage = -1;
			}
		},
		getBudget: () => {
			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			};
		},

		testing: () => {
			console.log(data);
		}
	};
})();

export { budgetController };
