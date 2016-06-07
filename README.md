## calculator-js

This is a browser calculator with basic arithmetic operations. It is developed in native JavaScript without using the `eval()` method. The application was designed by using the Command pattern. As a result, it is not difficult to develop this basic version by adding new features.

[Demo: http://ygazhala.github.io/calculator-js](http://ygazhala.github.io/calculator-js)

###Features:

- Four arithmetic operations are available: Addition, Subtraction, Multiplication and Division. 

- In addition, UNDO and REDO methods are implemented.

- If the "Equal" button is pressed twice in a row - the previous calculation operation will be repeated.

- There are two possibilities of entering characters: by inputting from the keyboard or by clicking on the calculator buttons.

- Data inputting from the desktop keyboard is on tracking: only digits, arithmetic operators, and a dot are allowed.

###Aditional info

The application was developed according to ES 6 standard and was compiled to ES 5 by using Webpack and Babel.js.  
The source code in ES 6 may be seen in the `scripts` folder or in demo preview by using Chrome console (sources/webpack/scripts).

Browser support: IE9+.
