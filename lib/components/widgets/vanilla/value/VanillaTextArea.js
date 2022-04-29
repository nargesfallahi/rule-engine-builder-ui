"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _default = function _default(props) {
  var value = props.value,
      setValue = props.setValue,
      config = props.config,
      readonly = props.readonly,
      placeholder = props.placeholder,
      maxLength = props.maxLength,
      maxRows = props.maxRows,
      fullWidth = props.fullWidth,
      customProps = props.customProps;

  var onChange = function onChange(e) {
    var val = e.target.value;
    if (val === "") val = undefined; // don't allow empty value

    setValue(val);
  };

  var textValue = value || "";
  return /*#__PURE__*/_react["default"].createElement("textarea", (0, _extends2["default"])({
    value: textValue,
    placeholder: placeholder,
    disabled: readonly,
    onChange: onChange,
    maxLength: maxLength,
    style: {
      width: fullWidth ? "100%" : undefined
    }
  }, customProps));
};

exports["default"] = _default;