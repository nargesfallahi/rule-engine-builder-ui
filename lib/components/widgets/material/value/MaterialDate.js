"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _pickers = require("@material-ui/pickers");

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _default = function _default(props) {
  var value = props.value,
      setValue = props.setValue,
      readonly = props.readonly,
      customProps = props.customProps,
      dateFormat = props.dateFormat,
      valueFormat = props.valueFormat,
      placeholder = props.placeholder,
      useKeyboard = props.useKeyboard;

  var formatSingleValue = function formatSingleValue(value) {
    return value && value.isValid() ? value.format(valueFormat) : undefined;
  };

  var handleChange = function handleChange(value) {
    setValue(formatSingleValue(value));
  };

  var Picker = useKeyboard ? _pickers.KeyboardDatePicker : _pickers.DatePicker;
  return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement(Picker, (0, _extends2["default"])({
    readOnly: readonly,
    disabled: readonly,
    placeholder: !readonly ? placeholder : "",
    format: dateFormat,
    value: value || null,
    onChange: handleChange
  }, customProps)));
};

exports["default"] = _default;