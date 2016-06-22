var calcApp =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.calcApp = undefined;
	
	var _calculator = __webpack_require__(1);
	
	var _calculator2 = _interopRequireDefault(_calculator);
	
	var _calculatorUI = __webpack_require__(9);
	
	var _calculatorUI2 = _interopRequireDefault(_calculatorUI);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	// This class includes the entire application
	
	var CalcApp = function CalcApp(htmlContainer) {
	    _classCallCheck(this, CalcApp);
	
	    // This object provides the calculator API
	    this.calculator = new _calculator2.default();
	
	    // This object provides the user's interface
	    this.calculatorUI = new _calculatorUI2.default(this.calculator, htmlContainer);
	};
	
	// Add the application to the page
	
	var calcApp = exports.calcApp = new CalcApp(document.getElementById('calculatorContainer'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// This class includes all objects of realization and provides the calculator API.
	// It receives queries from the object of the CalculatorUI class,
	// creates objects of concrete command classes and sets the receiver (the arithmetic unit) for them.
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	// concrete command classes
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _arithmeticUnit = __webpack_require__(2);
	
	var _arithmeticUnit2 = _interopRequireDefault(_arithmeticUnit);
	
	var _controlUnit = __webpack_require__(3);
	
	var _controlUnit2 = _interopRequireDefault(_controlUnit);
	
	var _add = __webpack_require__(4);
	
	var _add2 = _interopRequireDefault(_add);
	
	var _sub = __webpack_require__(6);
	
	var _sub2 = _interopRequireDefault(_sub);
	
	var _mul = __webpack_require__(7);
	
	var _mul2 = _interopRequireDefault(_mul);
	
	var _div = __webpack_require__(8);
	
	var _div2 = _interopRequireDefault(_div);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Calculator = function () {
	    function Calculator() {
	        _classCallCheck(this, Calculator);
	
	        this._arithmeticUnit = new _arithmeticUnit2.default();
	        this._controlUnit = new _controlUnit2.default();
	    }
	
	    _createClass(Calculator, [{
	        key: 'add',
	        value: function add(operand) {
	            return this._run(new _add2.default(this._arithmeticUnit, operand));
	        }
	    }, {
	        key: 'sub',
	        value: function sub(operand) {
	            return this._run(new _sub2.default(this._arithmeticUnit, operand));
	        }
	    }, {
	        key: 'mul',
	        value: function mul(operand) {
	            return this._run(new _mul2.default(this._arithmeticUnit, operand));
	        }
	    }, {
	        key: 'div',
	        value: function div(operand) {
	            return this._run(new _div2.default(this._arithmeticUnit, operand));
	        }
	    }, {
	        key: 'undo',
	        value: function undo(levels) {
	            this._controlUnit.undo(levels);
	
	            return this._arithmeticUnit.result;
	        }
	    }, {
	        key: 'redo',
	        value: function redo(levels) {
	            this._controlUnit.redo(levels);
	
	            return this._arithmeticUnit.result;
	        }
	    }, {
	        key: 'clean',
	        value: function clean() {
	            this._controlUnit._commands.length = 0;
	            this._controlUnit._current = 0;
	
	            return this._arithmeticUnit.result = 0;
	        }
	    }, {
	        key: 'repeatLastCommand',
	        value: function repeatLastCommand() {
	            var commands = this._controlUnit._commands;
	
	            if (commands.length > 0) {
	                this._run(commands[commands.length - 1]);
	            }
	
	            return this._arithmeticUnit.result;
	        }
	    }, {
	        key: '_run',
	        value: function _run(command) {
	            this._controlUnit.executeCommand(command);
	
	            return this._arithmeticUnit.result;
	        }
	    }]);
	
	    return Calculator;
	}();

	exports.default = Calculator;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	// The Arithmetic unit (the receiver).
	// An object of this class performs computing operations.
	// Any class may receive the result of these operations.
	// In our case, the result reads an object of Calculator class.
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ArithmeticUnit = function () {
	    function ArithmeticUnit() {
	        _classCallCheck(this, ArithmeticUnit);
	
	        this.result = 0;
	    }
	
	    _createClass(ArithmeticUnit, [{
	        key: 'compute',
	        value: function compute(operator, operand) {
	            switch (operator) {
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
	    }]);
	
	    return ArithmeticUnit;
	}();

	exports.default = ArithmeticUnit;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	// The Control unit (the invoker).
	// An object of this class keeps history of objects of commands, and calls the execute method on them.
	// In addition this class describes UNDO and REDO methods.
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ControlUnit = function () {
	    function ControlUnit() {
	        _classCallCheck(this, ControlUnit);
	
	        this._commands = [];
	        this._current = 0; // an index of the command which is going to be executed
	    }
	
	    _createClass(ControlUnit, [{
	        key: 'executeCommand',
	        value: function executeCommand(command) {
	            // In case, we are going to add a new command after we have used undo/redo method,
	            // it is necessary to check if we are not currently pointing at the middle of the array.
	            // If we are - cut the rest of the array, so the new adding command will be in the proper order.
	            if (this._current <= this._commands.length - 1) {
	                this._commands.splice(this._current);
	            }
	            this._commands.push(command);
	            this._commands[this._current].execute();
	            this._current++;
	        }
	    }, {
	        key: 'undo',
	        value: function undo(levels) {
	            // the levels - is a number of steps, that we are going to make backward
	            for (var i = 0; i < levels; i++) {
	                if (this._current > 0) {
	                    this._commands[--this._current].unExecute();
	                }
	            }
	        }
	    }, {
	        key: 'redo',
	        value: function redo(levels) {
	            for (var i = 0; i < levels; i++) {
	                if (this._current <= this._commands.length - 1) {
	                    this._commands[this._current++].execute();
	                }
	            }
	        }
	    }]);
	
	    return ControlUnit;
	}();

	exports.default = ControlUnit;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _command = __webpack_require__(5);
	
	var _command2 = _interopRequireDefault(_command);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Add = function (_Command) {
	    _inherits(Add, _Command);
	
	    function Add(receiver, operand) {
	        _classCallCheck(this, Add);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Add).call(this));
	
	        _this._receiver = receiver;
	        _this._operand = operand;
	        _this._operator = '+';
	        return _this;
	    }
	
	    _createClass(Add, [{
	        key: '_reverseOperator',
	        get: function get() {
	            return '-';
	        }
	    }]);
	
	    return Add;
	}(_command2.default);

	exports.default = Add;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	// Abstract class Command provides an interface to perform the operation.
	// Concrete command classes inherit from it.
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Command = function () {
	    function Command() {
	        _classCallCheck(this, Command);
	    }
	
	    _createClass(Command, [{
	        key: 'execute',
	        value: function execute() {
	            this._receiver.compute(this._operator, this._operand);
	        }
	    }, {
	        key: 'unExecute',
	        value: function unExecute() {
	            this._receiver.compute(this._reverseOperator, this._operand);
	        }
	    }]);
	
	    return Command;
	}();

	exports.default = Command;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _command = __webpack_require__(5);
	
	var _command2 = _interopRequireDefault(_command);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Sub = function (_Command) {
	    _inherits(Sub, _Command);
	
	    function Sub(receiver, operand) {
	        _classCallCheck(this, Sub);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Sub).call(this));
	
	        _this._receiver = receiver;
	        _this._operand = operand;
	        _this._operator = '-';
	        return _this;
	    }
	
	    _createClass(Sub, [{
	        key: '_reverseOperator',
	        get: function get() {
	            return '+';
	        }
	    }]);
	
	    return Sub;
	}(_command2.default);

	exports.default = Sub;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _command = __webpack_require__(5);
	
	var _command2 = _interopRequireDefault(_command);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Mul = function (_Command) {
	    _inherits(Mul, _Command);
	
	    function Mul(receiver, operand) {
	        _classCallCheck(this, Mul);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Mul).call(this));
	
	        _this._receiver = receiver;
	        _this._operand = operand;
	        _this._operator = '*';
	        return _this;
	    }
	
	    _createClass(Mul, [{
	        key: '_reverseOperator',
	        get: function get() {
	            return '/';
	        }
	    }]);
	
	    return Mul;
	}(_command2.default);

	exports.default = Mul;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _command = __webpack_require__(5);
	
	var _command2 = _interopRequireDefault(_command);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Div = function (_Command) {
	    _inherits(Div, _Command);
	
	    function Div(receiver, operand) {
	        _classCallCheck(this, Div);
	
	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Div).call(this));
	
	        _this._receiver = receiver;
	        _this._operand = operand;
	        _this._operator = '/';
	        return _this;
	    }
	
	    _createClass(Div, [{
	        key: '_reverseOperator',
	        get: function get() {
	            return '*';
	        }
	    }]);
	
	    return Div;
	}(_command2.default);

	exports.default = Div;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// This class implements the user's interface.
	// It process user's input and provides logic to the static HTML file.
	// As dependencies, this class requires the html container and the calculator API object.
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _getChar = __webpack_require__(10);
	
	var _getChar2 = _interopRequireDefault(_getChar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CalculatorUI = function () {
	    function CalculatorUI(calculator, calcContainer) {
	        _classCallCheck(this, CalculatorUI);
	
	        this._calculator = calculator; // the object with the calculator API
	        this._calcContainer = calcContainer; // the root HTML container of the calculator
	        this._screen = this._calcContainer.querySelector('.calculator__screen');
	        this._screen.value = 0; // default value
	
	        // Flags for determining the status of user's input
	        this._firstOperandInputted = false;
	        this._equallyInputted = false;
	        this._currentOperator = null; // the current operator, which is going to be executed
	        this._inputUpdated = false; // it changes, when the user inputs a new character
	
	        // Event handlers for mobile devices
	        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	
	            this._calcContainer.addEventListener('touchstart', this._processMouseEvent.bind(this));
	
	            // Event handlers for desktops
	        } else {
	                this._screen.focus(); // default
	
	                // Keep the focus on the screen, when the user clicks on the calculator container
	                this._calcContainer.addEventListener('click', function () {
	                    this._screen.focus();
	                }.bind(this));
	
	                this._calcContainer.addEventListener('click', this._processMouseEvent.bind(this));
	                this._screen.addEventListener('keypress', this._processKeyboardEvent.bind(this));
	            }
	    }
	
	    _createClass(CalculatorUI, [{
	        key: '_processMouseEvent',
	        value: function _processMouseEvent(event) {
	            // Read chars and commands from elements with 'data-' attributes, please see: index.html
	            var char = event.target.getAttribute('data-character');
	            var operator = event.target.getAttribute('data-operator');
	            var key = event.target.getAttribute('data-key');
	
	            if (char) {
	                this._inputChar(char);
	            } else {
	                if (operator) {
	                    this._performOperator(operator);
	                } else {
	                    if (key) {
	                        // perform a command with a key, e.g:
	                        // this["_performClean"](),
	                        // this["_performUndo"]()
	                        this[key]();
	                    }
	                }
	            }
	        }
	    }, {
	        key: '_processKeyboardEvent',
	        value: function _processKeyboardEvent(event) {
	
	            // Determine and perform backspace.
	            if (event.which === 8) {
	                // There is some particularity in Mozilla browser: if we press backspace,
	                // getChar() writes 'null' on the screen. Other browsers don't do this.
	                // But if we do preventDefault() for the keyboard backspace, problem disappears.
	                event.preventDefault();
	                this._performBackspace();
	
	                return;
	            }
	
	            var strFromChar = undefined; // it keeps the current symbol from the keypress event
	
	            // Getting a character from the keypress event.
	            if (event.type === 'keypress') {
	                event.preventDefault();
	                strFromChar = (0, _getChar2.default)(event);
	            }
	
	            // Determine and perform an operator.
	            var operators = {
	                '+': 'add',
	                '-': 'sub',
	                '*': 'mul',
	                '/': 'div'
	            };
	
	            if (operators[strFromChar]) {
	                this._performOperator(operators[strFromChar]);
	
	                return;
	            }
	
	            // Determine a digit and perform input
	            var ALLOWED_CHAR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	
	            if (ALLOWED_CHAR.indexOf(strFromChar) !== -1) {
	                this._inputChar(strFromChar);
	
	                return;
	            }
	
	            // Determine the dot and perform input
	            if (strFromChar === '.') {
	                this._inputDot();
	
	                return;
	            }
	
	            // Determine and perform the equally command
	            if (event.which === 13) {
	                this._performEqually();
	            }
	        }
	
	        /* Internal methods */
	
	    }, {
	        key: '_performBackspace',
	        value: function _performBackspace() {
	            this._screen.value = this._screen.value.slice(0, -1);
	
	            if (!this._screen.value) {
	                this._screen.value = 0;
	                this._inputUpdated = false;
	            }
	        }
	    }, {
	        key: '_performMinusPlus',
	        value: function _performMinusPlus() {
	            if (this._screen.value) {
	                this._screen.value *= -1;
	            }
	        }
	    }, {
	        key: '_inputDot',
	        value: function _inputDot() {
	            // if the dot has been inputted just after the equally command -
	            // change the screen value to '0.'
	            if (this._equallyInputted === true) {
	                this._screen.value = '0.';
	                this._inputUpdated = true;
	            }
	
	            // The screen value must not contain more than one dot.
	            if (this._screen.value.indexOf('.') === -1) {
	                this._screen.value += '.';
	                this._inputUpdated = true;
	            } else {
	                return false; // do nothing
	            }
	        }
	    }, {
	        key: '_inputChar',
	        value: function _inputChar(char) {
	            // Catching first character inputted
	            if (this._inputUpdated === false) {
	                this._screen.value = char; // replace default or previous value
	                this._inputUpdated = true;
	            } else {
	                // The next inputted character will be added after previous one.
	                this._screen.value += char;
	            }
	        }
	    }, {
	        key: '_performOperator',
	        value: function _performOperator(operator) {
	            if (!this._screen.value) {
	                return false; // in case of screen.value === '';
	            }
	
	            // Catching the first operand.
	            // An operand will not be added to the calculator register until an operator is entered.
	
	            // If an operator has been inputted at the first time, read the first operand
	            // and add it to the calculator register.
	            if (this._currentOperator === null) {
	
	                // If the equally command has been performed before this step -
	                // clean the calculator register and set the default value for the '_equallyInputted' flag.
	                if (this._equallyInputted) {
	                    this._equallyInputted = false;
	                    this._calculator.clean();
	                }
	
	                // The default value of the calculator register is an empty array,
	                // so we just adding the first operand to it.
	                this._calculator.add(parseFloat(this._screen.value));
	                this._firstOperandInputted = true;
	                this._currentOperator = operator;
	                this._inputUpdated = false; // prepare to catch a new operand
	
	                return;
	            }
	
	            // Catching the second operand.
	            // If an operator is entered not at the first time, and a new character was inputted -
	            // read the second operand and perform calculation
	            if (this._currentOperator && this._inputUpdated) {
	                this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
	                this._currentOperator = operator;
	                this._inputUpdated = false;
	
	                return;
	            }
	
	            // If different operators were entered one by one - update current operator (save the latest)
	            if (this._currentOperator && this._inputUpdated === false) {
	                this._currentOperator = operator;
	            }
	        }
	    }, {
	        key: '_performEqually',
	        value: function _performEqually() {
	
	            // If the equally command is inputted at the first time, and there are the first operand
	            // and the current operator - catch the second operand and make calculation
	
	            if (!this._equallyInputted && this._firstOperandInputted && this._inputUpdated && this._currentOperator) {
	
	                this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
	                this._equallyInputted = true;
	                this._setDefaultFlags();
	            } else {
	                // if the equally command is entered one by one - repeat the previous calculation operation.
	                if (!this._firstOperandInputted) {
	                    this._screen.value = this._calculator.repeatLastCommand();
	                    this._inputUpdated = false;
	
	                    // in other cases - do nothing
	                } else {
	                        return false;
	                    }
	            }
	        }
	
	        // prepare for new commands
	
	    }, {
	        key: '_setDefaultFlags',
	        value: function _setDefaultFlags() {
	            this._firstOperandInputted = false;
	            this._currentOperator = null;
	            this._inputUpdated = false;
	        }
	
	        // clean the calculator register and prepare for new commands
	
	    }, {
	        key: '_performClean',
	        value: function _performClean() {
	            this._screen.value = this._calculator.clean();
	            this._setDefaultFlags();
	        }
	
	        // perform one step backward
	
	    }, {
	        key: '_performUndo',
	        value: function _performUndo() {
	            this._screen.value = this._calculator.undo(1);
	        }
	
	        // perform one step forward
	
	    }, {
	        key: '_performRedo',
	        value: function _performRedo() {
	            this._screen.value = this._calculator.redo(1);
	        }
	    }]);
	
	    return CalculatorUI;
	}();

	exports.default = CalculatorUI;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';
	// The cross-browser function for getting character from the keypress event
	// Copied from: https://learn.javascript.ru/keyboard-events#getChar
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = getChar;
	function getChar(event) {
	    if (event.which == null) {
	        // IE
	        if (event.keyCode < 32) return null; // special symbol
	
	        return String.fromCharCode(event.keyCode);
	    }
	
	    if (event.which != 0 && event.charCode != 0) {
	        // other browsers
	        if (event.which < 32) {
	
	            return null; // special symbol
	        }
	
	        return String.fromCharCode(event.which);
	    }
	    return null; // special symbol
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map