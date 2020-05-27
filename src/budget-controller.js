const budgetController = (function() {
	let x = 23;

	const add = (a) => {
		return x + a;
	};

	return {
		publicTest: (b) => {
			console.log(add(b));
		}
	};
})();

export { budgetController };
