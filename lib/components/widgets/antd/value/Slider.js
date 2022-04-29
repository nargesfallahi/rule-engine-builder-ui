"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _reactUtils = require("../../../../utils/reactUtils");

var _excluded = ["width"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var __isInternal = true; //true to optimize render

var SliderWidget = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(SliderWidget, _PureComponent);

  var _super = _createSuper(SliderWidget);

  function SliderWidget(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SliderWidget);
    _this = _super.call(this, props);
    _this.state = {};

    _this.handleChange = function (val) {
      if (val === "") val = undefined;
      if (__isInternal) _this.setState({
        internalValue: val
      });

      _this.props.setValue(val, undefined, __isInternal);
    };

    _this.tipFormatter = function (val) {
      return val != undefined ? val.toString() : undefined;
    };

    (0, _reactUtils.useOnPropsChanged)((0, _assertThisInitialized2["default"])(_this));
    _this.state.internalValue = props.value;
    return _this;
  }

  (0, _createClass2["default"])(SliderWidget, [{
    key: "onPropsChanged",
    value: function onPropsChanged(nextProps) {
      this.setState({
        internalValue: nextProps.value
      });
    }
  }, {
    key: "UNSAFE_componentWillUpdate",
    value: function UNSAFE_componentWillUpdate(nextProps, nextState) {
      // RHL fix
      if (this.props.cacheBusterProp && __isInternal) {
        nextState.internalValue = this.state.internalValue;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          placeholder = _this$props.placeholder,
          customProps = _this$props.customProps,
          value = _this$props.value,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step,
          marks = _this$props.marks,
          readonly = _this$props.readonly,
          valueError = _this$props.valueError;
      var _config$settings = config.settings,
          renderSize = _config$settings.renderSize,
          showErrorMessage = _config$settings.showErrorMessage,
          defaultSliderWidth = _config$settings.defaultSliderWidth;

      var _ref = customProps || {},
          width = _ref.width,
          rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);

      var customInputProps = rest.input || {};
      var customSliderProps = rest.slider || rest;
      var canUseInternal = showErrorMessage ? true : !valueError;
      var aValue = __isInternal && canUseInternal ? this.state.internalValue : value;
      if (aValue == undefined) aValue = null;
      var sliderValue = aValue == null && min ? min : aValue;
      return /*#__PURE__*/_react["default"].createElement(_antd.Col, {
        style: {
          display: "inline-flex"
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Col, {
        style: {
          "float": "left",
          marginRight: "5px"
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.InputNumber, (0, _extends2["default"])({
        disabled: readonly,
        size: renderSize,
        value: aValue,
        min: min,
        max: max,
        step: step,
        placeholder: placeholder,
        onChange: this.handleChange
      }, customInputProps))), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
        style: {
          "float": "left",
          width: width || defaultSliderWidth
        }
      }, /*#__PURE__*/_react["default"].createElement(_antd.Slider, (0, _extends2["default"])({
        disabled: readonly,
        value: sliderValue,
        tipFormatter: this.tipFormatter,
        min: min,
        max: max,
        included: false,
        step: step,
        marks: marks,
        onChange: this.handleChange
      }, customSliderProps))), /*#__PURE__*/_react["default"].createElement(_antd.Col, {
        style: {
          clear: "both"
        }
      }));
    }
  }]);
  return SliderWidget;
}(_react.PureComponent);

exports["default"] = SliderWidget;
SliderWidget.propTypes = {
  setValue: _propTypes["default"].func.isRequired,
  placeholder: _propTypes["default"].string,
  config: _propTypes["default"].object.isRequired,
  field: _propTypes["default"].string.isRequired,
  value: _propTypes["default"].number,
  customProps: _propTypes["default"].object,
  fieldDefinition: _propTypes["default"].object,
  readonly: _propTypes["default"].bool,
  // from fieldSettings:
  min: _propTypes["default"].number,
  max: _propTypes["default"].number,
  step: _propTypes["default"].number,
  marks: _propTypes["default"].object
};
SliderWidget.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  marks: undefined
};