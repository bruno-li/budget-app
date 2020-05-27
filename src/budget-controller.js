const budgetController = (function() {
	//factory functions for Expense and Income
	const Expense = (id, description, value) => {
		return { id, description, value };
	};
	const Income = (id, description, value) => {
		return { id, description, value };
	};
	// data structure to store user input
	const data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			totalExpense: 0,
			totalIncome: 0
		}
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
		}
	};
})();

export { budgetController };
