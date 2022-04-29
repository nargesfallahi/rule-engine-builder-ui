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
      min = props.min,
      max = props.max,
      step = props.step,
      placeholder = props.placeholder,
      _props$customProps = props.customProps,
      customProps = _props$customProps === void 0 ? {} : _props$customProps;
  var customInputProps = customProps.input || {};
  var customSliderProps = customProps.slider || customProps;

  var onChange = function onChange(e) {
    var val = e.target.value;
    if (val === "" || val === null) val = undefined;else val = Number(val);
    setValue(val);
  };

  var numberValue = value == undefined ? "" : value;
  return [/*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
    key: "number",
    type: "number",
    value: numberValue,
    placeholder: placeholder,
    disabled: readonly,
    min: min,
    max: max,
    step: step,
    onChange: onChange
  }, customInputProps)), /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
    key: "range",
    type: "range",
    value: numberValue,
    disabled: readonly,
    min: min,
    max: max,
    step: step,
    onChange: onChange
  }, customSliderProps))];
};

exports["default"] = _default;