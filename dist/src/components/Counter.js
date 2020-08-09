"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _counter = require("../redux/counter");

var _Link = _interopRequireDefault(require("./Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Counter = function Counter() {
  var dispatch = (0, _reactRedux.useDispatch)();
  var counter = (0, _reactRedux.useSelector)(function (state) {
    return state.counter.value;
  });
  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("h2", null, "Counter"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return dispatch((0, _counter.increment)());
    }
  }, "Increment"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: function onClick() {
      return dispatch((0, _counter.decrement)());
    }
  }, "Decrement"), /*#__PURE__*/_react.default.createElement("h3", null, "Counter value is ".concat(counter)), /*#__PURE__*/_react.default.createElement(_Link.default, {
    to: "/home"
  }, "Back Home"));
};

var _default = Counter;
exports.default = _default;

//# sourceMappingURL=Counter.js.map