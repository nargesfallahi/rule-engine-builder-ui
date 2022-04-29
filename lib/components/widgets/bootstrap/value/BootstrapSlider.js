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
      min = props.min,
      max = props.max,
      step = props.step,
      placeholder = props.placeholder;

  var onChange = function onChange(e) {
    var val = e.target.value;
    if (val === "" || val === null) val = undefined;else val = Number(val);
    setValue(val);
  };

  var stylesWrapper = {
    display: "inline-flex"
  };
  var stylesInputWrapper = {
    marginLeft: "5px"
  };
  var numberValue = value == undefined ? "" : value;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: stylesWrapper
  }, /*#__PURE__*/_react["default"].createElement(_reactstrap.Input, {
    key: "number",
    bsSize: "sm",
    style: stylesInputWrapper,
    type: "number",
    value: numberValue,
    placeholder: placeholder,
    disabled: readonly,
    min: min,
    max: max,
    step: step,
    onChange: onChange
  }), /*#__PURE__*/_react["default"].createElement(_reactstrap.Input, {
    key: "range",
    bsSize: "sm",
    style: stylesInputWrapper,
    type: "range",
    value: numberValue,
    disabled: readonly,
    min: min,
    max: max,
    step: step,
    onChange: onChange
  }));
};

exports["default"] = _default;