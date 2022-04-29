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
      customProps = props.customProps;

  var onChange = function onChange(e) {
    var val = e.target.value;
    if (val === "" || val === null) val = undefined;else val = Number(val);
    setValue(val);
  };

  var numberValue = value == undefined ? "" : value;
  return /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
    type: "number",
    value: numberValue,
    placeholder: placeholder,
    disabled: readonly,
    min: min,
    max: max,
    step: step,
    onChange: onChange
  }, customProps));
};

exports["default"] = _default;