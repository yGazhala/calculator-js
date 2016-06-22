'use strict';

// The Arithmetic unit (the receiver).
// An object of this class performs computing operations.
// The result of these operations is read by an object of 'calculator.js' class.

export default class ArithmeticUnit {
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
