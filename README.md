## calculator-js

This is a browser calculator with basic arithmetic operations. It is developed with native JavaScript without using the `eval()` method. The application was designed by using the Command pattern. As a result, it is not difficult to develop this basic version by adding new features.

Demo: [http://ygazhala.github.io/calculator-js](http://ygazhala.github.io/calculator-js)

###Features:

- Four arithmetic operations are available: Addition, Subtraction, Multiplication and Division. 

- In addition, UNDO and REDO methods are implemented.

- If the "Equal" button is pressed one by one - the previous calculation operation will be repeated.

- There are two possibilities of entering characters: by entering from the keyboard or by clicking on the calculator buttons.

- Entering from the desktop keyboard is on tracking: only digits, arithmetic operators, and a dot are allowed.

- Browser support: IE9+ .

###Architecture and the file system

The application was developed according to ES 6 standard and was compiled to ES 5 by using Webpack and Babel.js.
The source code in ES 6 may be seen in the `scripts` folder or in demo preview by using Chrome console (sources/webpack/scripts).

The application consists of 2 modules: `calculator` and `calculatorUI`.

The `calculator` module describes realization. This module was designed by using the Command pattern. The Command pattern allows encapsulating a request as an object, thereby letting the client parameterize the object with different requests, queue or log requests, and support UNDO / REDO operations. The `calculator` module includes the next classes:
```
calculator/
    calculator.js       // module
    controlUnit.js      // the invoker
    arithmeticUnit.js   // the receiver
    command.js          // abstract class command
    add.js              // concrete command classes
    sub.js
    mul.js
    div.js
```

- `calculator.js` -  this class includes all objects of realization and provides the calculator API. It receives queries from the object of `calculatorUI.js` class, creates objects of concrete command classes and sets the receiver (the arithmetic unit) for them.

- `controlUnit.js` - an object of this class keeps history of objects of commands, and calls the execute method on them. In addition this class describes UNDO and REDO methods.

- `arithmeticUnit.js` - an object of this class performs computing operations. The result of these operations is read by an object of `calculator.js` class.

- `command.js` - this abstract class provides an interface to perform the calculation operation. Concrete command classes inherit from it.

- `add.js`, `sub.js`, `mul.js`, `div.js` - these are concrete command classes. Objects of these classes implement `execute` operations and call appropriate methods on the receiver (the arithmetic unit).

The `calculatorUI` module implements the user's interface. It process user's input and provides logic to the static HTML file.