'use strict';
// The Control unit (the invoker).
// An object of this class keeps history of objects of commands, and calls the execute method on them.
// In addition this class describes UNDO and REDO methods.

export default class ControlUnit {
    constructor() {
        this._commands = [];
        this._current = 0; // an index of the command which is going to be executed
    }

    executeCommand(command) {
        // In case, we are going to add a new command after we have used undo/redo method,
        // it is necessary to check if we are not currently pointing at the middle of the array.
        // If we are - cut the rest of the array, so the new adding command will be in the proper order.
        if (this._current <= this._commands.length -1) {
            this._commands.splice(this._current);
        }
        this._commands.push(command);
        this._commands[this._current].execute();
        this._current++;
    }

    undo(levels) {
        // the levels - is a number of steps, that we are going to make backward
        for (let i = 0; i < levels; i++) {
            if (this._current > 0) {
                this._commands[--this._current].unExecute();
            }
        }
    }

    redo(levels) {
        for (let i = 0; i < levels; i++) {
            if (this._current <= this._commands.length -1) {
                this._commands[this._current++].execute();
            }
        }
    }
}