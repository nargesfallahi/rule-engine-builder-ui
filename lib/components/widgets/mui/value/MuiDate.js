"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _DatePicker = _interopRequireDefault(require("@mui/lab/DatePicker"));

var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));

var _TextField = _interopRequireDefault(require("@mui/material/TextField"));

var _default = function _default(props) {
  var value = props.value,
      setValue = props.setValue,
      readonly = props.readonly,
      customProps = props.customProps,
      dateFormat = props.dateFormat,
      valueFormat = props.valueFormat,
      placeholder = props.placeholder;

  var formatSingleValue = function formatSingleValue(value) {
    return value && value.isValid() ? value.format(valueFormat) : undefined;
  };

  var handleChange = function handleChange(value) {
    setValue(formatSingleValue(value));
  };

  var renderInput = function renderInput(params) {
    return /*#__PURE__*/_react["default"].createElement(_TextField["default"], (0, _extends2["default"])({
      size: "small",
      variant: "standard"
    }, params));
  };

  return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement(_DatePicker["default"], (0, _extends2["default"])({
    readOnly: readonly,
    disabled: readonly,
    toolbarPlaceholder: !readonly ? placeholder : "",
    inputFormat: dateFormat,
    value: value || null,
    onChange: handleChange,
    renderInput: renderInput
  }, customProps)));
};

exports["default"] = _default;