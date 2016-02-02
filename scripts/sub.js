'use strict';

import Command from './command.js';

export default class Sub extends Command {
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
