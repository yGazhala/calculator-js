'use strict';
// This class describes interface of realization.
// It receives queries from object of CalculatorUI class,
// creates object of Concrete Command class and sets receiver fot it.


import ArithmeticUnit from './arithmeticUnit.js';
import ControlUnit from './controlUnit.js';

// concrete command classes
import Add from './commands/add.js';
import Sub from './commands/sub.js';
import Mul from './commands/mul.js';
import Div from './commands/div.js';


export default class Calculator {
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
