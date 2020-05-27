const budgetController = (function() {
	const Expense = (id, description, value) => {
		return { id, description, value };
	};
	const Income = (id, description, value) => {
		return { id, description, value };
	};

	const data = {
		allItems: {
			expenses: [],
			incomes: []
		},
		totals: {
			totalExpense: 0,
			totalIncome: 0
		}
	};
})();

export { budgetController };
