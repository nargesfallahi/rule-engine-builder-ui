"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactstrap = require("reactstrap");

var _default = function _default(_ref) {
  var children = _ref.children,
      config = _ref.config;
  return /*#__PURE__*/_react["default"].createElement(_reactstrap.ButtonGroup, null, children);
};

exports["default"] = _default;