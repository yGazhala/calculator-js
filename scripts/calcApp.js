'use strict';

import Calculator from './calculator/calculator.js';
import CalculatorUI from './calculatorUI/calculatorUI.js';

// This class includes the entire application
class CalcApp {
    constructor(htmlContainer) {
        // This object provides the calculator API
        this.calculator = new Calculator();

        // This object provides the user's interface
        this.calculatorUI = new CalculatorUI(this.calculator, htmlContainer);
    }
}

// Add the application to the page
export let calcApp = new CalcApp(document.getElementById('calculatorContainer'));
