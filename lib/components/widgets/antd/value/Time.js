"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _moment = _interopRequireDefault(require("moment"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var TimeWidget = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(TimeWidget, _PureComponent);

  var _super = _createSuper(TimeWidget);

  function TimeWidget(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, TimeWidget);
    _this = _super.call(this, props);

    _this.handleChange = function (aValue) {
      var _this$props = _this.props,
          setValue = _this$props.setValue,
          valueFormat = _this$props.valueFormat,
          timeFormat = _this$props.timeFormat;

      if (aValue && aValue.isValid() && timeFormat == "HH:mm") {
        aValue.set({
          second: 0,
          millisecond: 0
        });
      }

      var value = aValue && aValue.isValid() ? aValue.format(valueFormat) : undefined;
      if (value || aValue === null) setValue(value);
    };

    var _valueFormat = props.valueFormat,
        _value = props.value,
        _setValue = props.setValue;
    var mValue = _value ? (0, _moment["default"])(_value, _valueFormat) : null;

    if (mValue && !mValue.isValid()) {
      _setValue(null);
    }

    return _this;
  }

  (0, _createClass2["default"])(TimeWidget, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          placeholder = _this$props2.placeholder,
          customProps = _this$props2.customProps,
          value = _this$props2.value,
          valueFormat = _this$props2.valueFormat,
          timeFormat = _this$props2.timeFormat,
          use12Hours = _this$props2.use12Hours,
          config = _this$props2.config,
          readonly = _this$props2.readonly;
      var renderSize = config.settings.renderSize;
      var timeValue = value ? (0, _moment["default"])(value, valueFormat) : null;
      return /*#__PURE__*/_react["default"].createElement(_antd.TimePicker, (0, _extends2["default"])({
        disabled: readonly,
        use12Hours: use12Hours,
        key: "widget-time",
        size: renderSize,
        placeholder: placeholder,
        format: timeFormat,
        value: timeValue,
        onChange: this.handleChange
      }, customProps));
    }
  }]);
  return TimeWidget;
}(_react.PureComponent);

exports["default"] = TimeWidget;
TimeWidget.propTypes = {
  setValue: _propTypes["default"].func.isRequired,
  value: _propTypes["default"].string,
  //in valueFormat
  config: _propTypes["default"].object.isRequired,
  field: _propTypes["default"].string.isRequired,
  placeholder: _propTypes["default"].string,
  customProps: _propTypes["default"].object,
  readonly: _propTypes["default"].bool,
  // from fieldSettings:
  timeFormat: _propTypes["default"].string,
  valueFormat: _propTypes["default"].string,
  use12Hours: _propTypes["default"].bool
};
TimeWidget.defaultProps = {
  timeFormat: "HH:mm",
  valueFormat: "HH:mm:ss",
  use12Hours: false
};