'use strict';
// Invoker.
// Object of this class keeps history of objects of commands, and calls execute method on them.
// In addition it describes undo and redo methods.

export default class ControlUnit {
    constructor() {
        this._commands = [];
        this._current = 0; // index of command which is going to be executed
    }

    executeCommand(command) {
        // In case we are going to add new command after we have used undo/redo method,
        // it is necessary to check if we are not currently pointing at the middle of array.
        // If we are - cut the rest of array so the new adding command will be in the proper order.
        if (this._current <= this._commands.length -1) {
            this._commands.splice(this._current);
        }
        this._commands.push(command);
        this._commands[this._current].execute();
        this._current++;
    }

    undo(levels) {
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
