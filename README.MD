# Budget App

A app to keep track your expenses for the month.


# App architecture

The app is designed with ES6 modules following MVC pattern to keep the data private within their modules.

The data is store in an object and manipulated within the budget-controller module. This is where the logic and the calculations are stored.

The UI is manipulated within the UI-controller where all the elemetns in the DOM is stored and uses. This is the module to render the data into the  the DOM.

The app.js is the main controller, it initialize the app. Call the UI module to render the data into the DOM and Budget module for the calculations.

# App written with:
- HTML5
- SASS/CSS
- Vanilla Javascript
- Webpack
