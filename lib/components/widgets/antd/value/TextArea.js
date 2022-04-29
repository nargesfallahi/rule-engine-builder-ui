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

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var TextArea = _antd.Input.TextArea;

var TextAreaWidget = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(TextAreaWidget, _PureComponent);

  var _super = _createSuper(TextAreaWidget);

  function TextAreaWidget() {
    var _this;

    (0, _classCallCheck2["default"])(this, TextAreaWidget);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleChange = function (ev) {
      var v = ev.target.value;
      var val = v === "" ? undefined : v; // don't allow empty value

      _this.props.setValue(val);
    };

    return _this;
  }

  (0, _createClass2["default"])(TextAreaWidget, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          placeholder = _this$props.placeholder,
          customProps = _this$props.customProps,
          value = _this$props.value,
          readonly = _this$props.readonly,
          maxLength = _this$props.maxLength,
          maxRows = _this$props.maxRows,
          fullWidth = _this$props.fullWidth;
      var _config$settings = config.settings,
          renderSize = _config$settings.renderSize,
          defaultMaxRows = _config$settings.defaultMaxRows;
      var aValue = value != undefined ? value : null;
      return /*#__PURE__*/_react["default"].createElement(_antd.Col, null, /*#__PURE__*/_react["default"].createElement(TextArea, (0, _extends2["default"])({
        autoSize: {
          minRows: 1,
          maxRows: maxRows || defaultMaxRows
        },
        maxLength: maxLength,
        disabled: readonly,
        key: "widget-textarea",
        size: renderSize,
        value: aValue,
        placeholder: placeholder,
        onChange: this.handleChange
      }, customProps)));
    }
  }]);
  return TextAreaWidget;
}(_react.PureComponent);

exports["default"] = TextAreaWidget;
TextAreaWidget.propTypes = {
  setValue: _propTypes["default"].func.isRequired,
  placeholder: _propTypes["default"].string,
  config: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].string,
  field: _propTypes["default"].string.isRequired,
  readonly: _propTypes["default"].bool,
  customProps: _propTypes["default"].object,
  maxLength: _propTypes["default"].number,
  maxRows: _propTypes["default"].number
};