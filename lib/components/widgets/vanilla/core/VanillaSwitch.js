"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _default = function _default(_ref) {
  var value = _ref.value,
      setValue = _ref.setValue,
      label = _ref.label,
      id = _ref.id,
      config = _ref.config,
      type = _ref.type;

  var onChange = function onChange(e) {
    return setValue(e.target.checked);
  };

  var postfix = type;
  return [/*#__PURE__*/_react["default"].createElement("input", {
    key: id + postfix,
    type: "checkbox",
    id: id + postfix,
    checked: !!value,
    onChange: onChange
  }), /*#__PURE__*/_react["default"].createElement("label", {
    key: id + postfix + "label",
    htmlFor: id + postfix
  }, label)];
};

exports["default"] = _default;