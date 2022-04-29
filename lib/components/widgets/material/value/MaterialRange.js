"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _Slider = _interopRequireDefault(require("@material-ui/core/Slider"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _excluded = ["width"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(props) {
  var config = props.config,
      placeholders = props.placeholders,
      customProps = props.customProps,
      value = props.value,
      setValue = props.setValue,
      min = props.min,
      max = props.max,
      step = props.step,
      marks = props.marks,
      readonly = props.readonly,
      textSeparators = props.textSeparators;
  var defaultSliderWidth = config.settings.defaultSliderWidth;
  (0, _react.useEffect)(function () {
    var _ref = props.value || [undefined, undefined],
        _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
        valueFrom = _ref2[0],
        valueTo = _ref2[1];

    if (props.value && (valueFrom == undefined || valueTo == undefined)) {
      // happens if we changed op from '==' to 'between'
      // (I know, timeout is dirty hack..)
      setTimeout(function () {
        var oneValue = valueFrom || valueTo;
        var value = [oneValue, oneValue];
        setValue(value);
      }, 1);
    }
  }, []);

  var handleSliderChange = function handleSliderChange(_e, newValues) {
    setValue(newValues);
  };

  var handleInputChangeFrom = function handleInputChangeFrom(e) {
    // TIP: need to use props.value instead of value
    var valueFrom = e.target.value;
    if (valueFrom === "" || valueFrom == null) valueFrom = undefined;else valueFrom = Number(valueFrom);
    var value = props.value ? (0, _toConsumableArray2["default"])(props.value) : [undefined, undefined];
    value[0] = valueFrom;
    setValue(value);
  };

  var handleInputChangeTo = function handleInputChangeTo(e) {
    var valueTo = e.target.value;
    if (valueTo === "" || valueTo == null) valueTo = undefined;else valueTo = Number(valueTo);
    var value = props.value ? (0, _toConsumableArray2["default"])(props.value) : [undefined, undefined];
    value[1] = valueTo;
    setValue(value);
  };

  var handleInputBlur = function handleInputBlur() {
    // TIP: Fix if typed value out of range in inputs
    if (!value) return;

    if (value[0] < min) {
      setValue([min, value[1]]);
    } else if (value[1] > max) {
      setValue([value[0], max]);
    }
  };

  var _ref3 = customProps || {},
      width = _ref3.width,
      rest = (0, _objectWithoutProperties2["default"])(_ref3, _excluded);

  var customInputProps = rest.input || {};
  var customSliderProps = rest.slider || rest; // marks example: { 0: "0%", 100: React.createElement('strong', null, "100%") }

  var muiMarks = marks ? Object.keys(marks).map(function (v) {
    return {
      value: v,
      label: marks[v]
    };
  }) : false; // TIP: Can't pass undefined to MUI, cause it means uncontrolled component use.
  //      For empty value input needs "", slider needs null or 0, but null will cause problems with range mode

  var sliderValue = value ? (0, _toConsumableArray2["default"])(value) : [undefined, undefined];

  var _sliderValue = (0, _slicedToArray2["default"])(sliderValue, 2),
      valueFrom = _sliderValue[0],
      valueTo = _sliderValue[1];

  if (valueFrom == undefined) {
    valueFrom = "";
    sliderValue[0] = 0;
  }

  if (valueTo == undefined) {
    valueTo = "";
    sliderValue[1] = 0;
  }

  var FromInputCmp = /*#__PURE__*/_react["default"].createElement(_TextField["default"], (0, _extends2["default"])({
    type: "number",
    value: valueFrom,
    placeholder: placeholders[0],
    InputProps: {
      readOnly: readonly
    },
    inputProps: {
      min: min,
      max: max,
      step: step
    },
    disabled: readonly,
    onChange: handleInputChangeFrom,
    onBlur: handleInputBlur
  }, customInputProps));

  var ToInputCmp = /*#__PURE__*/_react["default"].createElement(_TextField["default"], (0, _extends2["default"])({
    type: "number",
    value: valueTo,
    placeholder: placeholders[1],
    InputProps: {
      readOnly: readonly
    },
    inputProps: {
      min: min,
      max: max,
      step: step
    },
    disabled: readonly,
    onChange: handleInputChangeTo,
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
    display: "inline-flex"
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
  }, FromInputCmp), /*#__PURE__*/_react["default"].createElement("div", {
    className: "widget--sep"
  }, /*#__PURE__*/_react["default"].createElement("span", null, textSeparators[1])), /*#__PURE__*/_react["default"].createElement("div", {
    style: stylesInputWrapper
  }, ToInputCmp), /*#__PURE__*/_react["default"].createElement("div", {
    style: stylesSliderWrapper
  }, SliderCmp)));
};

exports["default"] = _default;