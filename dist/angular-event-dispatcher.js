(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Logger = {
    logLevel: 'info',

    info: function info() {
        if (this.logLevel == 'info') {
            var args = [];
            for (var i = 0; i < arguments.length; i++) {
                args.push(arguments[i]);
            }

            console.log.apply(console, args);
        }
    },

    createTabs: function createTabs(nbTabs) {
        var tabs = "";
        var spaces = "    ";
        for (var i = 0; i < nbTabs; i++) {
            tabs += spaces;
        }
        return tabs;
    },

    setLevel: function setLevel(level) {
        this.logLevel = level;
    }
};

exports['default'] = Logger;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _eventServiceJs = require('./event.service.js');

var _eventServiceJs2 = _interopRequireDefault(_eventServiceJs);

exports['default'] = angular.module('angular-event-dispatcher', []).factory('EventService', function () {
    return new _eventServiceJs2['default']();
});
module.exports = exports['default'];

},{"./event.service.js":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _LoggerJs = require('./Logger.js');

var _LoggerJs2 = _interopRequireDefault(_LoggerJs);

var EventService = (function () {
    function EventService() {
        _classCallCheck(this, EventService);

        this.listeners = new Map();
        this.eventsRunning = 0;
    }

    _createClass(EventService, [{
        key: 'on',
        value: function on(eventType, callback) {
            if (!this.listeners.has(eventType)) {
                this.listeners.set(eventType, []);
            }
            this.listeners.get(eventType).push(callback);
        }
    }, {
        key: 'trigger',
        value: function trigger(eventType) {
            var args = [];
            for (var i = 1; i < arguments.length; i++) {
                args.push(arguments[i]);
            }

            this.log('event: "' + eventType + '" called with args:', args);

            var nbListeners = 0;
            if (this.listeners.has(eventType)) {
                nbListeners = this.listeners.get(eventType).length;
                this.eventsRunning++;
                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = this.listeners.get(eventType)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var listener = _step.value;

                        listener.apply(undefined, args);
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }

                this.eventsRunning--;
            }

            this.log('event: "' + eventType + '", called: ' + nbListeners + ' time(s)');

            if (this.eventsRunning === 0) {
                this.log();
            }
        }
    }, {
        key: 'addForwardEvents',
        value: function addForwardEvents(eventType, eventToForwardTo) {
            var self = this;

            // Can't use arrow function here, because we need the arguments of the callback function
            this.on(eventType, function () {
                var args = [];
                for (var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i]);
                }

                self.trigger.apply(self, [eventToForwardTo].concat(args));
            });
        }
    }, {
        key: 'getListeners',
        value: function getListeners(eventType) {
            return this.listeners.get(eventType);
        }
    }, {
        key: 'resetEvents',
        value: function resetEvents() {
            this.listeners = new Map();
        }
    }, {
        key: 'log',
        value: function log() {
            var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
            var args = arguments.length <= 1 || arguments[1] === undefined ? undefined : arguments[1];

            var spacesBefore = _LoggerJs2['default'].createTabs(this.eventsRunning);
            if (args) {
                _LoggerJs2['default'].info.apply(_LoggerJs2['default'], [spacesBefore + message].concat(_toConsumableArray(args)));
            } else {
                _LoggerJs2['default'].info(spacesBefore + message);
            }
        }
    }]);

    return EventService;
})();

exports['default'] = EventService;
module.exports = exports['default'];

},{"./Logger.js":1}]},{},[2]);
