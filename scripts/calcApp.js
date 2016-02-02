'use strict';
// This class includes all application.

import Calculator from './calculator.js';
import CalculatorUI from './calculatorUI.js';

export default class CalcApp {
    constructor(htmlContainer) {
        // This object contains interface methods of realization
        this.calculator = new Calculator();

        // User interface
        this.calculatorUI = new CalculatorUI(this.calculator, htmlContainer);
    }
}
