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
      use12Hours = props.use12Hours,
      readonly = props.readonly,
      placeholder = props.placeholder,
      dateFormat = props.dateFormat,
      timeFormat = props.timeFormat,
      valueFormat = props.valueFormat,
      customProps = props.customProps,
      useKeyboard = props.useKeyboard;

  var formatSingleValue = function formatSingleValue(value) {
    return value && value.isValid() ? value.format(valueFormat) : undefined;
  };

  var handleChange = function handleChange(value) {
    setValue(formatSingleValue(value));
  };

  var Picker = useKeyboard ? _pickers.KeyboardDateTimePicker : _pickers.DateTimePicker;
  var dateTimeFormat = dateFormat + " " + timeFormat;
  return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement(Picker, (0, _extends2["default"])({
    readOnly: readonly,
    disabled: readonly,
    ampm: !!use12Hours,
    placeholder: !readonly ? placeholder : "",
    format: dateTimeFormat,
    value: value || null,
    onChange: handleChange
  }, customProps)));
};

exports["default"] = _default;