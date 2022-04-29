"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _TimePicker = _interopRequireDefault(require("@mui/lab/TimePicker"));

var _moment = _interopRequireDefault(require("moment"));

var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));

var _TextField = _interopRequireDefault(require("@mui/material/TextField"));

var _default = function _default(props) {
  var value = props.value,
      setValue = props.setValue,
      use12Hours = props.use12Hours,
      readonly = props.readonly,
      placeholder = props.placeholder,
      timeFormat = props.timeFormat,
      valueFormat = props.valueFormat,
      customProps = props.customProps;

  var formatSingleValue = function formatSingleValue(value) {
    return value && value.isValid() ? value.format(valueFormat) : undefined;
  };

  var handleChange = function handleChange(value) {
    setValue(formatSingleValue(value));
  };

  var hasSeconds = timeFormat.indexOf(":ss") != -1;
  var timeValue = value ? (0, _moment["default"])(value, timeFormat) : null;

  var renderInput = function renderInput(params) {
    return /*#__PURE__*/_react["default"].createElement(_TextField["default"], (0, _extends2["default"])({
      size: "small",
      variant: "standard"
    }, params));
  };

  return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement(_TimePicker["default"], (0, _extends2["default"])({
    readOnly: readonly,
    disabled: readonly,
    ampm: !!use12Hours,
    toolbarPlaceholder: !readonly ? placeholder : "",
    inputFormat: timeFormat,
    value: timeValue || null,
    onChange: handleChange,
    views: hasSeconds ? ["hours", "minutes", "seconds"] : ["hours", "minutes"],
    renderInput: renderInput
  }, customProps)));
};

exports["default"] = _default;