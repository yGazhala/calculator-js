'use strict';
// The cross-browser function for getting character from the keypress event
// Copied from: https://learn.javascript.ru/keyboard-events#getChar

export default function getChar(event) {
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