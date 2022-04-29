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
      readonly = props.readonly,
      placeholder = props.placeholder,
      maxLength = props.maxLength;

  var onChange = function onChange(e) {
    var val = e.target.value;
    if (val === "") val = undefined; // don't allow empty value

    setValue(val);
  };

  var textValue = value || "";
  return /*#__PURE__*/_react["default"].createElement(_reactstrap.Input, {
    type: "text",
    bsSize: "sm",
    value: textValue,
    placeholder: placeholder,
    disabled: readonly,
    onChange: onChange,
    maxLength: maxLength
  });
};

exports["default"] = _default;