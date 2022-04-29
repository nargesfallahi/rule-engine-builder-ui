"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _Slider = _interopRequireDefault(require("@material-ui/core/Slider"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _excluded = ["width"];

var _default = function _default(props) {
  var config = props.config,
      placeholder = props.placeholder,
      customProps = props.customProps,
      value = props.value,
      setValue = props.setValue,
      min = props.min,
      max = props.max,
      step = props.step,
      marks = props.marks,
      readonly = props.readonly;
  var defaultSliderWidth = config.settings.defaultSliderWidth;

  var handleSliderChange = function handleSliderChange(_e, newValue) {
    setValue(newValue);
  };

  var handleInputChange = function handleInputChange(e) {
    var val = e.target.value;
    if (val === "" || val === null) val = undefined;else val = Number(val);
    setValue(val);
  };

  var handleInputBlur = function handleInputBlur() {
    // TIP: Fix if typed value out of range in input
    if (value < min) {
      setValue(min);
    } else if (value > max) {
      setValue(max);
    }
  };

  var _ref = customProps || {},
      width = _ref.width,
      rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);

  var customInputProps = rest.input || {};
  var customSliderProps = rest.slider || rest; // TIP: Can't pass undefined to MUI, cause it means uncontrolled component use.
  //      For empty value input needs "", slider needs null or 0

  var inputValue = typeof value === "number" ? value : "";
  var sliderValue = typeof value === "number" ? value : null; // marks example: { 0: "0%", 100: React.createElement('strong', null, "100%") }

  var muiMarks = marks ? Object.keys(marks).map(function (v) {
    return {
      value: v,
      label: marks[v]
    };
  }) : false;

  var InputCmp = /*#__PURE__*/_react["default"].createElement(_TextField["default"], (0, _extends2["default"])({
    type: "number",
    value: inputValue,
    placeholder: placeholder,
    InputProps: {
      readOnly: readonly
    },
    inputProps: {
      min: min,
      max: max,
      step: step
    },
    disabled: readonly,
    onChange: handleInputChange,
    onBlur: handleInputBlur
  }, customInputProps));

  var SliderCmp = /*#__PURE__*/_react["default"].createElement(_Slider["default"], (0, _extends2["default"])({
    value: sliderValue,
    onChange: handleSliderChange,
    disabled: readonly,
    min: min,
    max: max,
    step: step,
    marks: muiMarks,
    valueLabelDisplay: "auto"
  }, customSliderProps));

  var stylesWrapper = {
    display: "inline-flex",
    alignItems: "center"
  };
  var stylesInputWrapper = {
    marginLeft: "5px"
  };
  var stylesSliderWrapper = {
    marginLeft: "5px",
    paddingLeft: "12px",
    marginBottom: muiMarks && "-16px",
    width: width || defaultSliderWidth
  };
  return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement("div", {
    style: stylesWrapper
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: stylesInputWrapper
  }, InputCmp), /*#__PURE__*/_react["default"].createElement("div", {
    style: stylesSliderWrapper
  }, SliderCmp)));
};

exports["default"] = _default;