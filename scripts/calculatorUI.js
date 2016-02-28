'use strict';

export default class CalculatorUI {
    constructor(calculator, calcContainer) {
        this._calculator = calculator;
        this._calcContainer = calcContainer;
        this._screen = this._calcContainer.querySelector('.calculator__screen');
        this._screen.value = 0; // default value

        // helper flags for calculator buttons
        this._firstOperandInputted = false;
        this._equallyInputted = false;
        this._currentOperator = null; // the current operator, which is going to be executed
        this._inputUpdated = false; // it changes, when user inputs new character


        // add event handlers for mobile devices
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {

            this._calcContainer.addEventListener('touchstart', this._processMouseEvent.bind(this));

            // for desktop
        } else {
            this._screen.focus(); // default
            this._calcContainer.addEventListener('click', this._processMouseEvent.bind(this));
            this._calcContainer.addEventListener('click', (function() {this._screen.focus()}).bind(this));
            this._screen.addEventListener('keypress', this._processKeyboardEvent.bind(this));
        }
    }

    _processMouseEvent(event) {
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
                    this[key]();
                }
            }
        }
    }

    _processKeyboardEvent(event) {

        // Determine and perform backspace.
        // There is some strange behavior in Mozilla browser: if we input backspace,
        // method _getChar inputs 'null' into screen.value. Other browsers don't do this.
        // But if we do preventDefault for backspace at the beginning, problem disappears.
        if (event.which === 8) {
            event.preventDefault();
            this._performBackspace();

            return;
        }

        let strFromChar; // it keeps current symbol from keypress event

        // getting character from keypress event
        if (event.type === 'keypress') {
            event.preventDefault();
            strFromChar = this._getChar(event);
        }

        let operators = {
            '+': 'add',
            '-': 'sub',
            '*': 'mul',
            '/': 'div'
        };

        // determine and perform the operator
        if (operators[strFromChar]) {
            this._performOperator(operators[strFromChar]);

            return;
        }

        let ALLOWED_CHAR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

        // Determine digit and perform input
        if (ALLOWED_CHAR.indexOf(strFromChar) !== -1) {
            this._inputChar(strFromChar);

            return;
        }

        if (strFromChar === '.') {
            this._inputDot();

            return;
        }

        // determine and perform equally command
        if (event.which === 13) {
            this._performEqually();
        }
    }

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
        // if dot has inputted after equally command - update screen.value
        if (this._equallyInputted === true) {
            this._screen.value = '0.';
            this._inputUpdated = true;
        }

        // if the screen.value has no dot - add it
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

            return;
        }

        // Catching next operand.
        // If operator inputted not at the first time, and the new character was inputted -
        // read second operand and call calculation method
        if (this._currentOperator && this._inputUpdated) {
            this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
            this._currentOperator = operator;
            this._inputUpdated = false;

            return;
        }

        // change current operator
        if (this._currentOperator && this._inputUpdated === false) {
            this._currentOperator = operator;
        }
    }

    _performEqually() {

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
        this._screen.value = this._calculator.clean();
        this._setDefaultFlags();
    }

    _performUndo() {
        this._screen.value = this._calculator.undo(1);
    }

    _performRedo() {
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
            if (event.which < 32) {

                return null; // special symbol
            }

            return String.fromCharCode(event.which);
        }
        return null; // special symbol
    }
}
