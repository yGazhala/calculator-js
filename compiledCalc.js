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
	// initialization
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.calcApp = undefined;
	
	var _calcApp = __webpack_require__(1);
	
	var _calcApp2 = _interopRequireDefault(_calcApp);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var calcApp = exports.calcApp = new _calcApp2.default(document.getElementById('calculatorContainer'));

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// This class includes all application.
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _calculator = __webpack_require__(2);
	
	var _calculator2 = _interopRequireDefault(_calculator);
	
	var _calculatorUI = __webpack_require__(10);
	
	var _calculatorUI2 = _interopRequireDefault(_calculatorUI);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CalcApp = function CalcApp(htmlContainer) {
	    _classCallCheck(this, CalcApp);
	
	    // This object contains interface methods of realization
	    this.calculator = new _calculator2.default();
	
	    // User interface
	    this.calculatorUI = new _calculatorUI2.default(this.calculator, htmlContainer);
	};
	
	exports.default = CalcApp;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// This class describes interface of realization.
	// It receives queries from object of CalculatorUI class,
	// creates object of Concrete Command class and sets receiver fot it.
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	// concrete command classes
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _arithmeticUnit = __webpack_require__(3);
	
	var _arithmeticUnit2 = _interopRequireDefault(_arithmeticUnit);
	
	var _controlUnit = __webpack_require__(4);
	
	var _controlUnit2 = _interopRequireDefault(_controlUnit);
	
	var _add = __webpack_require__(5);
	
	var _add2 = _interopRequireDefault(_add);
	
	var _sub = __webpack_require__(7);
	
	var _sub2 = _interopRequireDefault(_sub);
	
	var _mul = __webpack_require__(8);
	
	var _mul2 = _interopRequireDefault(_mul);
	
	var _div = __webpack_require__(9);
	
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
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	// Receiver.
	// Object of this class performs computing operations.
	// Any class may receive the result of these operations.
	// In our case, the result reads object of Calculator class.
	
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
/* 4 */
/***/ function(module, exports) {

	'use strict';
	// Invoker.
	// Object of this class keeps history of objects of commands, and calls execute method on them.
	// In addition it describes undo and redo methods.
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ControlUnit = function () {
	    function ControlUnit() {
	        _classCallCheck(this, ControlUnit);
	
	        this._commands = [];
	        this._current = 0; // index of command which is going to be executed
	    }
	
	    _createClass(ControlUnit, [{
	        key: 'executeCommand',
	        value: function executeCommand(command) {
	            // In case we are going to add new command after we have used undo/redo method,
	            // it is necessary to check if we are not currently pointing at the middle of array.
	            // If we are - cut the rest of array so the new adding command will be in the proper order.
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _command = __webpack_require__(6);
	
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
/* 6 */
/***/ function(module, exports) {

	'use strict';
	// Abstract class Command provides an interface to perform the operation.
	// Concrete Command classes inherit from it.
	
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _command = __webpack_require__(6);
	
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _command = __webpack_require__(6);
	
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _command = __webpack_require__(6);
	
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
/* 10 */
/***/ function(module, exports) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var CalculatorUI = function () {
	    function CalculatorUI(calculator, calcContainer) {
	        _classCallCheck(this, CalculatorUI);
	
	        this._calculator = calculator;
	        this._calcContainer = calcContainer;
	        this._screen = this._calcContainer.querySelector('.calculator__screen');
	        this._screen.value = 0; // default value
	
	        // helper flags for calculator buttons
	        this._firstOperandInputted = false;
	        this._equallyInputted = false;
	        this._currentOperator = null; // the current operator, which is going to be executed
	        this._inputUpdated = false; // it changes, when user inputs new character
	
	        // add event handlers for mobile devices
	        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
	
	            this._calcContainer.addEventListener('mousedown', this._processMouseEvent.bind(this));
	
	            // for desktop
	        } else {
	                this._screen.focus(); // default
	                this._calcContainer.addEventListener('click', this._processMouseEvent.bind(this));
	                this._calcContainer.addEventListener('click', function () {
	                    this._screen.focus();
	                }.bind(this));
	                this._screen.addEventListener('keypress', this._processKeyboardEvent.bind(this));
	            }
	    }
	
	    _createClass(CalculatorUI, [{
	        key: '_processMouseEvent',
	        value: function _processMouseEvent(event) {
	            var char = event.target.getAttribute('data-character');
	            var operator = event.target.getAttribute('data-operator');
	            var key = event.target.getAttribute('data-key');
	
	            if (char) {
	                this._inputChar(char);
	
	                return;
	            }
	
	            if (operator) {
	                this._performOperator(operator);
	
	                return;
	            }
	
	            if (key) {
	                this[key]();
	            }
	        }
	    }, {
	        key: '_processKeyboardEvent',
	        value: function _processKeyboardEvent(event) {
	
	            // Determine and perform backspace.
	            // There is some strange behavior in Mozilla browser: if we input backspace,
	            // method _getChar inputs 'null' into screen.value. Other browsers don't do this.
	            // But if we do preventDefault for backspace at the beginning, problem disappears.
	            if (event.which === 8) {
	                event.preventDefault();
	                this._performBackspace();
	
	                return;
	            }
	
	            var strFromChar = undefined; // it keeps current symbol from keypress event
	
	            // getting character from keypress event
	            if (event.type === 'keypress') {
	                event.preventDefault();
	                strFromChar = this._getChar(event);
	            }
	
	            var operators = {
	                '+': 'add',
	                '-': 'sub',
	                '*': 'mul',
	                '/': 'div'
	            };
	
	            // determine and perform the operator
	            if (operators[strFromChar]) {
	                this._performOperator(operators[strFromChar]);
	
	                return;
	            }
	
	            var ALLOWED_CHAR = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
	
	            // Determine digit and perform input
	            if (ALLOWED_CHAR.indexOf(strFromChar) !== -1) {
	                this._inputChar(strFromChar);
	
	                return;
	            }
	
	            if (strFromChar === '.') {
	                this._inputDot();
	
	                return;
	            }
	
	            // determine and perform equally command
	            if (event.which === 13) {
	                this._performEqually();
	            }
	        }
	    }, {
	        key: '_performBackspace',
	        value: function _performBackspace() {
	            this._screen.value = this._screen.value.slice(0, -1);
	
	            if (this._screen.value === '') {
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
	            // if dot has inputted after equally command - update screen.value
	            if (this._equallyInputted === true) {
	                this._screen.value = '0.';
	                this._inputUpdated = true;
	            }
	
	            // if the screen.value has no dot - add it
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
	
	            // Catching first operand.
	            // If operator inputted at the first time, read first operand
	            // and add it to calculator register
	            if (this._currentOperator === null) {
	
	                // If equally button has been inputted already -
	                // set default settings for it
	                if (this._equallyInputted) {
	                    this._equallyInputted = false;
	                    this._calculator.clean();
	                }
	
	                this._calculator.add(parseFloat(this._screen.value));
	                this._firstOperandInputted = true;
	                this._currentOperator = operator;
	                this._inputUpdated = false;
	            }
	
	            // Catching next operand.
	            // If operator inputted not at the first time, and the new character was inputted -
	            // read second operand and call calculation method
	            if (this._currentOperator && this._inputUpdated) {
	                this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
	                this._currentOperator = operator;
	                this._inputUpdated = false;
	            }
	
	            // change current operator
	            if (this._currentOperator && this._inputUpdated === false) {
	                this._currentOperator = operator;
	            }
	        }
	    }, {
	        key: '_performEqually',
	        value: function _performEqually() {
	
	            // If equally inputted at the first time - catch the next operand,
	            // and call the calculation method
	
	            if (this._equallyInputted === false && this._firstOperandInputted && this._inputUpdated && this._currentOperator) {
	
	                this._screen.value = this._calculator[this._currentOperator](parseFloat(this._screen.value));
	                this._equallyInputted = true;
	                this._setDefaultFlags();
	
	                // if equally inputted at next time - repeat last command inputted
	            } else {
	                    if (this._firstOperandInputted === false) {
	                        this._screen.value = this._calculator.repeatLastCommand();
	                        this._inputUpdated = false;
	                    } else {
	                        return false; // in other cases - do nothing
	                    }
	                }
	        }
	    }, {
	        key: '_performClean',
	        value: function _performClean() {
	            this._screen.value = this._calculator.clean();
	            this._setDefaultFlags();
	        }
	    }, {
	        key: '_performUndo',
	        value: function _performUndo() {
	            this._screen.value = this._calculator.undo(1);
	        }
	    }, {
	        key: '_performRedo',
	        value: function _performRedo() {
	            this._screen.value = this._calculator.redo(1);
	        }
	
	        // prepare for new commands
	
	    }, {
	        key: '_setDefaultFlags',
	        value: function _setDefaultFlags() {
	            this._firstOperandInputted = false;
	            this._currentOperator = null;
	            this._inputUpdated = false;
	        }
	
	        // helper cross-browser function for getting character from keypress event
	
	    }, {
	        key: '_getChar',
	        value: function _getChar(event) {
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
	    }]);
	
	    return CalculatorUI;
	}();

	exports.default = CalculatorUI;

/***/ }
/******/ ]);
//# sourceMappingURL=compiledCalc.js.map