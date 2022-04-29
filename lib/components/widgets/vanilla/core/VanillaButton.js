"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _default = function _default(_ref) {
  var type = _ref.type,
      label = _ref.label,
      onClick = _ref.onClick,
      readonly = _ref.readonly,
      config = _ref.config;
  var typeToLabel = {
    "addRuleGroup": "+",
    "addRuleGroupExt": "+",
    "delGroup": "x",
    "delRuleGroup": "x",
    "delRule": "x"
  };
  var btnLabel = label || typeToLabel[type];
  return /*#__PURE__*/_react["default"].createElement("button", {
    onClick: onClick,
    type: "button",
    disabled: readonly
  }, btnLabel);
};

exports["default"] = _default;