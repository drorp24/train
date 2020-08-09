"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Page = function Page(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react.default.createElement(_Paper.default, {
    square: true,
    style: {
      height: '100vh'
    }
  }, children);
};

var _default = Page;
exports.default = _default;

//# sourceMappingURL=Page.js.map