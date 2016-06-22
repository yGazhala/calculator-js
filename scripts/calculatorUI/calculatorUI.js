'use strict';
// This class implements the user's interface.
// It process user's input and provides logic to the static HTML file.
// As dependencies, this class requires the html container and the calculator API object.

import getChar from './getChar.js';

export default class CalculatorUI {
    constructor(calculator, calcContainer) {
        this._calculator = calculator; // the object with the calculator API
        this._calcContainer = calcContainer; // the root HTML container of the calculator
        this._screen = this._calcContainer.querySelector('.calculator__screen');
        this._screen.value = 0; // default value

        // Flags for determining the status of user's input
        this._firstOperandInputted = false;
        this._equallyInputted = false;
        this._currentOperator = null; // the current operator, which is going to be executed
        this._inputUpdated = false; // it changes, when the user inputs a new character


        // Event handlers for mobile devices
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            this._calcContainer.addEventListener('touchstart', this._processMouseEvent.bind(this));

        // Event handlers for desktops
        } else {
            this._screen.focus(); // default

            // Keep the focus on the screen, when the user clicks on the calculator container
            this._calcContainer.addEventListener('click', (function() {this._screen.focus()}).bind(this));

            this._calcContainer.addEventListener('click', this._processMouseEvent.bind(this));
            this._screen.addEventListener('keypress', this._processKeyboardEvent.bind(this));
        }
    }

    _processMouseEvent(event) {
        // Read chars and commands from elements with 'data-' attributes, please see: index.html
        let char = event.target.getAttribute('data-character');
        let operator = event.target.getAttribute('data-operator');
        let key = event.target.getAttribute('data-key');

        if (char) {
            this._inputChar(char);

        } else {
            if (operator) {
                this._performOperator(operator);

            } else {
                if (key) {
                    // perform a command with a key, e.g:
                    // this["_performClean"](),
                    // this["_performUndo"]()
                    this[key]();
                }
            }
        }
    }

    _processKeyboardEvent(event) {

        // Determine and perform backspace.
        if (event.which === 8) {
            // There is some particularity in Mozilla browser: if we press backspace,
            // getChar() writes 'null' on the screen. Other browsers don't do this.
            // But if we do preventDefault() for the keyboard backspace, problem disappears.
            event.preventDefault();
            this._performBackspace();

            return;
        }

        let strFromChar; // it keeps the current symbol from the keypress event

        // Getting a character from the keypress event.
        if (event.type === 'keypress') {
            event.preventDefault();
            strFromChar = getChar(event);
        }

        // Determine and perform an operator.
        let operators = {
            '+': 'add',
            '-': 'sub',
            '*': 'mul',
            '/': 'div'
        };

        if (operators[strFromChar]) {
            this._performOperator(operators[strFromChar]);

            return;
        }

        // Determine a digit and perform input
        let ALLOWED_CHAR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        if (ALLOWED_CHAR.indexOf(strFromChar) !== -1) {
            this._inputChar(strFromChar);

            return;
        }

        // Determine the dot and perform input
        if (strFromChar === '.') {
            this._inputDot();

            return;
        }

        // Determine and perform the equally command
        if (event.which === 13) {
            this._performEqually();
        }
    }


    /* Internal methods */

    _performBackspace() {
        this._screen.value = this._screen.value.slice(0, -1);

        if (!this._screen.value) {
            this._screen.value = 0;
            this._inputUpdated = false;
        }
    }

    _performMinusPlus() {
        if (this._screen.value) {
            this._screen.value *= -1;
        }
    }

    _inputDot() {
        // if the dot has been inputted just after the equally command -
        // change the screen value to '0.'
        if (this._equallyInputted === true) {
            this._screen.value = '0.';
            this._inputUpdated = true;
        }

        // The screen value must not contain more than one dot.
        if (this._screen.value.indexOf('.') === -1) {
            this._screen.value += '.';
            this._inputUpdated = true;

        } else {
            return false; // do nothing
        }
    }

    _inputChar(char) {
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
        if (!this._screen.value) {
            return false; // in case of screen.value === '';
        }

        // Catching the first operand.
        // An operand will not be added to the calculator register until an operator is entered.

        // If an operator has been inputted at the first time, read the first operand
        // and add it to the calculator register.
        if (this._currentOperator === null) {

            // If the equally command has been performed before this step -
            // clean the calculator register and set the default value for the '_equallyInputted' flag.
            if (this._equallyInputted) {
                this._equallyInputted = false;
                this._calculator.clean();
            }

            // The default value of the calculator register is an empty array,
            // so we just adding the first operand to it.
            this._calculator.add(parseFloat(this._screen.value));
            this._firstOperandInputted = true;
            this._currentOperator = operator;
            this._inputUpdated = false; // prepare to catch a new operand

            return;
        }

        // Catching the second operand.
        // If an operator is entered not at the first time, and a new character was inputted -
        // read the second operand and perform calculation
        if (this._currentOperator && this._inputUpdated) {
            this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
            this._currentOperator = operator;
            this._inputUpdated = false;

            return;
        }

        // If different operators were entered one by one - update current operator (save the latest)
        if (this._currentOperator && this._inputUpdated === false) {
            this._currentOperator = operator;
        }
    }

    _performEqually() {

        // If the equally command is inputted at the first time, and there are the first operand
        // and the current operator - catch the second operand and make calculation

        if (!this._equallyInputted && this._firstOperandInputted && this._inputUpdated && this._currentOperator) {

            this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
            this._equallyInputted = true;
            this._setDefaultFlags();

        } else {
            // if the equally command is entered one by one - repeat the previous calculation operation.
            if (!this._firstOperandInputted) {
                this._screen.value = this._calculator.repeatLastCommand();
                this._inputUpdated = false;

            // in other cases - do nothing
            } else {
                return false;
            }
        }
    }

    // prepare for new commands
    _setDefaultFlags() {
        this._firstOperandInputted = false;
        this._currentOperator = null;
        this._inputUpdated = false;
    }

    // clean the calculator register and prepare for new commands
    _performClean() {
        this._screen.value = this._calculator.clean();
        this._setDefaultFlags();
    }

    // perform one step backward
    _performUndo() {
        this._screen.value = this._calculator.undo(1);
    }

    // perform one step forward
    _performRedo() {
        this._screen.value = this._calculator.redo(1);
    }
}