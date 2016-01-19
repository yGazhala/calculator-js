'use strict';
// This application has been designed within pattern "Command"

class calcApp {
    constructor(container) {
        // this object contains interface methods of realization
        let calculator = new Calculator();

        // user interface
        let calculatorUI = new CalculatorUI(calculator, container);
    }
}

class CalculatorUI {
    constructor(calculator, calcContainer) {
        this._calculator = calculator;
        this._calcContainer = calcContainer;
        this._screen = this._calcContainer.querySelector('.calculator__screen');
        this._screen.focus();
        this._screen.value = 0; // default value

        // helper flags for calculator buttons
        this._firstOperandInputted = false;
        this._equallyInputted = false;
        this._currentOperator = null; // the current operator, which is going to be executed
        this._inputUpdated = false; // it changes, when user inputs new character

        // listen user's mouse and keyboard events
        this._calcContainer.addEventListener('click', () => this._processMouseEvent(event));
        this._screen.addEventListener('keypress', () => this._processKeyboardEvent(event));
    }

    _processMouseEvent(event) {
        let char = event.target.getAttribute('data-character');
        let operator = event.target.getAttribute('data-operator');
        let key = event.target.getAttribute('data-key');

        if (char) {
            this._inputChar(char);
        }

        if (operator) {
            this._performOperator(operator);
        }

        if (key) {
            this[key]();
        }
    }

    _processKeyboardEvent(event) {
        let operators = {
            '+': 'add',
            '-': 'sub',
            '*': 'mul',
            '/': 'div'
        };

        let strFromChar; // it keeps current symbol from keypress event

        // getting character from keypress event
        if (event.type === 'keypress') {
            event.preventDefault();
            strFromChar = this._getChar(event);
        }

        // Determine digit, dot and perform input
        if (strFromChar >= '0' && strFromChar <= '9') {
            this._inputChar(strFromChar);
        }

        if (strFromChar === '.') {
            this._inputDot();
        }

        // determine and perform the operator
        if (operators[strFromChar]) {
            this._performOperator(operators[strFromChar]);
        }

        // determine and perform equally command
        if (event.which === 13) {
            this._performEqually();
        }
    }

    _performBackspace() {
        this._screen.focus();
        this._screen.value = this._screen.value.slice(0, -1);

        if (this._screen.value === '') {
            this._screen.value = 0;
            this._inputUpdated = false;
        }
    }

    _performMinusPlus() {
        this._screen.focus();

        if (this._screen.value) {
            this._screen.value *= -1;
        }
    }

    _inputDot() {
        this._screen.focus();

        // if dot has inputted after equally command - update screen.value
        if (this._equallyInputted === true) {
                this._screen.value = '0.';
                this._inputUpdated = true;
        }

        // if the screen.value has not a dot - add it
        if (/\./g.test(this._screen.value) === false) {
            this._screen.value += '.';
            this._inputUpdated = true;

        } else {
            return false; // do nothing
        }
    }

    _inputChar(char) {
        this._screen.focus();

        // Catching first character inputted
        if (this._inputUpdated === false) {
            this._screen.value = char; // replace default or previous value
            this._inputUpdated = true;

        } else {
            // The next inputted character will be added after previous one.
            this._screen.value += char;
        }
    }

    _performOperator(operator) {
        this._screen.focus();

        if (!this._screen.value) {
            return false; // in case of screen.value === '';
        }

        // Catching first operand.
        // If operator inputted at the first time, read first operand
        // and add it to calculator register
        if (this._currentOperator === null) {

            // If equally button has been inputted already -
            // set default settings for it
            if (this._equallyInputted) {
                this._equallyInputted = false;
                this._calculator.clean();
            }

            this._calculator.add(parseFloat(this._screen.value));
            this._firstOperandInputted = true;
            this._currentOperator = operator;
            this._inputUpdated = false;
        }

        // Catching next operand.
        // If operator inputted not at the first time, and the new character was inputted -
        // read second operand and call calculation method
        if (this._currentOperator && this._inputUpdated) {
            this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
            this._currentOperator = operator;
            this._inputUpdated = false;
        }

        // change current operator
        if (this._currentOperator && this._inputUpdated === false) {
            this._currentOperator = operator;
        }
    }

    _performEqually() {
        this._screen.focus();

        // If equally inputted at the first time - catch the next operand,
        // and call the calculation method

        if (this._equallyInputted === false && this._firstOperandInputted &&
            this._inputUpdated && this._currentOperator) {

            this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
            this._equallyInputted = true;
            this._setDefaultFlags();

        // if equally inputted at next time - repeat last command inputted
        } else {
            if (this._firstOperandInputted === false) {
                this._screen.value = this._calculator.repeatLastCommand();
                this._inputUpdated = false;

            } else {
                return false;  // in other cases - do nothing
            }
        }
    }

    _performClean() {
        this._screen.focus();
        this._screen.value = this._calculator.clean();
        this._setDefaultFlags();
    }

    _performUndo() {
        this._screen.focus();
        this._screen.value = this._calculator.undo(1);
    }

    _performRedo() {
        this._screen.focus();
        this._screen.value = this._calculator.redo(1);
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
