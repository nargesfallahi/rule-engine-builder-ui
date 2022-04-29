"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var ButtonGroup = _antd.Button.Group;

var _default = function _default(_ref) {
  var children = _ref.children,
      settings = _ref.config.settings;
  var renderSize = settings.renderSize;
  return /*#__PURE__*/_react["default"].createElement(ButtonGroup, {
    size: renderSize
  }, children);
};

exports["default"] = _default;