"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactstrap = require("reactstrap");

var _default = function _default(props) {
  var value = props.value,
      setValue = props.setValue,
      config = props.config,
      valueFormat = props.valueFormat,
      readonly = props.readonly;

  var onChange = function onChange(e) {
    var value = e.target.value;
    if (value == "") value = undefined;
    setValue(value);
  };

  return /*#__PURE__*/_react["default"].createElement(_reactstrap.Input, {
    type: "date",
    bsSize: "sm",
    value: value || "",
    disabled: readonly,
    onChange: onChange
  });
};

exports["default"] = _default;