'use strict';
// This application has been designed within pattern "Command"

function initApp() {
    // realization interface
    let calculator = new Calculator();

    // user interface
    let calculatorUI = new CalculatorUI(calculator, document.getElementById('calculatorContainer'));
}

class CalculatorUI {
    constructor(calculator, calcContainer) {
        this._calculator = calculator;
        this._calcContainer = calcContainer;
        this._screen = this._calcContainer.querySelector('.calculator__screen');
        this._screen.value = 0; // default value

        // listen user's mouse and keyboard events
        this._calcContainer.addEventListener('click', () => this.processUserAction(event));
        this._screen.addEventListener('keypress', () => this.processUserAction(event));

        // helper flags for calculator buttons
        this._firstOperandInputted = false;
        this._equallyInputted = false;
        this._currentOperator = null; // the current operator, which is going to be executed
        this._inputUpdated = false; // it changes, when user inputs new character
    }

    processUserAction(event) {
        if (event.type === 'keypress') {
            event.preventDefault();
        }

        let target = event.target,
            strFromChar = this._getChar(event);

        // Determine numbers (0-9) from keyboard event
        if (strFromChar >= 0 && strFromChar <= 9) {
            var numberFromChar = strFromChar;
        }

        // determine calculator operators from keyboard event
        let operatorFromChar = false;
        if (strFromChar === '+') { operatorFromChar = 'add'; }
        if (strFromChar === '-') { operatorFromChar = 'sub'; }
        if (strFromChar === '*') { operatorFromChar = 'mul'; }
        if (strFromChar === '/') { operatorFromChar = 'div'; }

        // determine equally command from keyboard event
        if (event.which === 13) { var equallyFromKeyboard = true; }

        // determine user input from mouse event || keyboard event
        let inputBackspace = target.getAttribute('data-input-backspace'), // when input focused, it works from keyboard
            inputMinusPlus = target.getAttribute('data-input-minus-plus'), // no need to support from keyboard
            inputDot = target.getAttribute('data-input-dot') || strFromChar === '.',
            inputChar = target.getAttribute('data-input-character') || numberFromChar,

            calcOperator = target.getAttribute('data-calc-operator') || operatorFromChar,
            calcCommand = target.getAttribute('data-calc-command'), // no need to support from keyboard
            calcEqually = target.getAttribute('data-calc-equally') || equallyFromKeyboard;

        // if user makes some action - call appropriate methods
        if (inputBackspace) { this._performInputBackspace(); }
        if (inputMinusPlus) { this._performInputMinusPlus(); }
        if (inputDot) { this._performInputDot(); }
        if (inputChar) { this._performInputChar(inputChar); }
        if (calcOperator) { this._performCalcOperator(calcOperator); }
        if (calcEqually) { this._performCalcEqually(); }
        if (calcCommand === 'clean') { this._performCalcClean(); }

        if (calcCommand === 'undo' || calcCommand === 'redo') {
            // perform one step back || forward
            this._screen.value = this._calculator[calcCommand](1);
            this._screen.focus();
        }
    }

    _performInputBackspace() {
        this._screen.value = String.prototype.slice.call(this._screen.value, 0, -1);
        this._screen.focus();

        if (this._screen.value === '') {
            this._screen.value = 0;
            this._inputUpdated = false;
            this._screen.focus();
        }
    }

    _performInputMinusPlus() {
        if (this._screen.value) {
            this._screen.value *= -1;
            this._screen.focus();
        }
    }

    _performInputDot() {
        if ( /\./g.test(this._screen.value) === false ) {
            this._screen.value += '.';
            this._inputUpdated = true;
            this._screen.focus();
        } else {
            this._screen.focus();
            return false;
        }
    }

    _performInputChar(inputChar) {
        // Catching first character inputted
        if (this._inputUpdated === false) {
            this._screen.value = inputChar; // replace default or previous value
            this._inputUpdated = true;
            this._screen.focus();
        } else {
            // The next inputted character will be added after previous one.
            this._screen.value += inputChar;
            this._screen.focus();
        }
    }

    _performCalcOperator(calcOperator) {
        if (!this._screen.value) {
            this._screen.focus();
            return false; // in case of screen.value === '';
        }

        // Catching first operand.
        // If operator inputted at the first time, read first operand
        // and add it to calculator register
        if (this._currentOperator === null) {

            // If equally button have been inputted already -
            // set default settings for it
            if (this._equallyInputted) {
                this._equallyInputted = false;
                this._calculator.clean();
            }

            this._calculator.add(parseFloat(this._screen.value));
            this._firstOperandInputted = true;
            this._currentOperator = calcOperator;
            this._inputUpdated = false;
            this._screen.focus();
        }

        // Catching next operand.
        // If operator inputted not at the first time, and the new character was inputted -
        // read second operand and call calculation method
        if (this._currentOperator && this._inputUpdated) {
            this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
            this._currentOperator = calcOperator;
            this._inputUpdated = false;
            this._screen.focus();
        }

        // change current operator
        if (this._currentOperator && this._inputUpdated === false) {
            this._currentOperator = calcOperator;
            this._screen.focus();
        }
    }

    _performCalcEqually() {
        // If equally inputted at the first time - catch the next operand,
        // and call the calculation method

        if (this._equallyInputted === false && this._firstOperandInputted &&
            this._inputUpdated && this._currentOperator) {

            this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
            this._equallyInputted = true;
            this._setDefaultFlags();
            this._screen.focus();

        // if equally inputted at next time - repeat last command inputted
        } else {
            if (this._firstOperandInputted === false) {
                this._screen.value = this._calculator.repeatLastCommand();
                this._inputUpdated = false;
                this._screen.focus();
            } else {
                this._screen.focus();
                return false;  // in other cases - do nothing
            }
        }
        this._screen.focus();
    }

    _performCalcClean() {
        this._screen.value = this._calculator.clean();
        this._setDefaultFlags();
        this._screen.focus();
    }

    // prepare for new commands
    _setDefaultFlags() {
        this._firstOperandInputted = false;
        this._currentOperator = null;
        this._inputUpdated = false;
    }

    // helper cross-browser function for getting character from keypress event
    _getChar(event) {
        if (event.which == null) { // IE
            if (event.keyCode < 32) return null; // special symbol
            return String.fromCharCode(event.keyCode)
        }

        if (event.which != 0 && event.charCode != 0) { // other browsers
            if (event.which < 32) return null; // special symbol
            return String.fromCharCode(event.which);
        }

        return null; // special symbol
    }


}


// This class describes interface of realization.
// It receives queries from object of CalculatorUI class,
// creates object of Concrete Command class and sets receiver fot it.
class Calculator {
    constructor() {
        this._arithmeticUnit = new ArithmeticUnit();
        this._controlUnit = new ControlUnit();
    }

    add(operand) {
        return this._run(new Add(this._arithmeticUnit, operand));
    }

    sub(operand) {
        return this._run(new Sub(this._arithmeticUnit, operand));
    }

    mul(operand) {
        return this._run(new Mul(this._arithmeticUnit, operand));
    }

    div(operand) {
        return this._run(new Div(this._arithmeticUnit, operand));
    }

    undo(levels) {
        this._controlUnit.undo(levels);
        return this._arithmeticUnit.result;
    }

    redo(levels) {
        this._controlUnit.redo(levels);
        return this._arithmeticUnit.result;
    }

    clean() {
        this._controlUnit._commands.length = 0;
        this._controlUnit._current = 0;
        return this._arithmeticUnit.result = 0;
    }

    repeatLastCommand() {
        let commands = this._controlUnit._commands;

        if (commands.length > 0) {
            this._run(commands[commands.length -1]);
        }
        return this._arithmeticUnit.result;
    }

    _run(command) {
        this._controlUnit.executeCommand(command);
        return this._arithmeticUnit.result;
    }
}

// Invoker.
// Object of this class keeps history of objects of commands, and calls execute method on them.
// In addition it describes undo and redo methods.
class ControlUnit {
    constructor() {
        this._commands = [];
        this._current = 0; // index of command which is going to be executed
    }

    executeCommand(command) {
        // In case we are going to add new command after we have used undo/redo method,
        // it is necessary to check if we are not currently pointing at the middle of array.
        // If we are - cut the rest of array so the new adding command will be in the proper order.
        if (this._current <= this._commands.length -1) {
            this._commands.splice(this._current);
        }
        this._commands.push(command);
        this._commands[this._current].execute();
        this._current++;
    }

    undo(levels) {
        for (let i = 0; i < levels; i++) {
            if (this._current > 0) {
                this._commands[--this._current].unExecute();
            }
        }
    }

    redo(levels) {
        for (let i = 0; i < levels; i++) {
            if (this._current <= this._commands.length -1) {
                this._commands[this._current++].execute(); //
            }
        }
    }
}

// Abstract class Command provides an interface to perform the operation.
// Concrete Command classes inherit from it.
class Command {
    execute() {
        this._receiver.compute(this._operator, this._operand);
    }

    unExecute() {
        this._receiver.compute(this._reverseOperator, this._operand);
    }
}

// Concrete Command classes
class Add extends Command {
    constructor(receiver, operand) {
        super();
        this._receiver = receiver;
        this._operand = operand;
        this._operator = '+';
    }

    get _reverseOperator() {
        return '-';
    }
}

class Sub extends Command {
    constructor(receiver, operand) {
        super();
        this._receiver = receiver;
        this._operand = operand;
        this._operator = '-';
    }

    get _reverseOperator() {
        return '+';
    }
}

class Mul extends Command {
    constructor(receiver, operand) {
        super();
        this._receiver = receiver;
        this._operand = operand;
        this._operator = '*';
    }

    get _reverseOperator() {
        return '/';
    }
}

class Div extends Command {
    constructor(receiver, operand) {
        super();
        this._receiver = receiver;
        this._operand = operand;
        this._operator = '/';
    }

    get _reverseOperator() {
        return '*';
    }
}

// Receiver.
// Object of this class performs computing operations.
// Any class may receive the result of these operations.
// In our case, the result reads object of Calculator class.
class ArithmeticUnit {
    constructor() {
        this.result = 0;
    }

    compute(operator, operand) {
        switch(operator) {
            case '+':
                this.result += operand;
                break;

            case '-':
                this.result -= operand;
                break;

            case '*':
                this.result *= operand;
                break;

            case '/':
                this.result /= operand;
                break;

            default:
                throw new Error('Unknown operator');
        }
    }
}
