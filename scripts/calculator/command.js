'use strict';
// The abstract class Command provides an interface to perform the operation.
// Concrete command classes inherit from it.

export default class Command {
    execute() {
        this._receiver.compute(this._operator, this._operand);
    }

    unExecute() {
        this._receiver.compute(this._reverseOperator, this._operand);
    }
}
