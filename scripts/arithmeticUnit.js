'use strict';

// Receiver.
// Object of this class performs computing operations.
// Any class may receive the result of these operations.
// In our case, the result reads object of Calculator class.

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
