const budgetController = (function() {
	//factory functions for Expense and Income
	const Expense = (id, description, value) => {
		// set default percentage value
		let percentage = -1;

		const calcPercentage = (totalIncome) => {
			if (totalIncome > 0) {
				percentage = Math.round(value / totalIncome * 100);
			} else {
				percentage = -1;
			}
		};

		const getPercentage = () => {
			return percentage;
		};

		return { id, description, value, calcPercentage, getPercentage };
	};

	const Income = (id, description, value) => {
		return { id, description, value };
	};

	// calculate the total of income or expenses
	const calculateTotal = (type) => {
		// get the sum of either inc or exp and assign it to totals obj
		let sum = data.allItems[type].reduce((acc, item) => {
			acc += item.value;
			return acc;
		}, 0);

		data.totals[type] = sum;
	};
	// data structure to store user data
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

	// public methods
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

		deleteItem: (type, id) => {
			let ids, index;
			// create an array with all unique ids
			ids = data.allItems[type].map((item) => {
				return item.id;
			});
			// get the index of the id that needs to be delete
			index = ids.indexOf(id);
			//check if id exists, if does, delete
			if (index !== -1) {
				data.allItems[type].splice(index, 1);
			}
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

		calculatePercentage: () => {
			data.allItems.exp.forEach((item) => {
				item.calcPercentage(data.totals.inc);
			});
		},

		getPercentages: () => {
			let allPerc = data.allItems.exp.map((item) => {
				return item.getPercentage();
			});
			return allPerc;
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
