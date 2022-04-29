"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var RadioButton = _antd.Radio.Button;
var RadioGroup = _antd.Radio.Group;

var ValueSources = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(ValueSources, _PureComponent);

  var _super = _createSuper(ValueSources);

  function ValueSources() {
    var _this;

    (0, _classCallCheck2["default"])(this, ValueSources);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onChange = function (e) {
      var setValueSrc = _this.props.setValueSrc;
      setValueSrc(e.target.value);
    };

    return _this;
  }

  (0, _createClass2["default"])(ValueSources, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          valueSources = _this$props.valueSources,
          valueSrc = _this$props.valueSrc,
          readonly = _this$props.readonly,
          title = _this$props.title;

      var content = /*#__PURE__*/_react["default"].createElement(RadioGroup, {
        value: valueSrc || "value",
        size: config.settings.renderSize,
        onChange: this.onChange,
        disabled: readonly
      }, valueSources.map(function (_ref) {
        var _ref2 = (0, _slicedToArray2["default"])(_ref, 2),
            srcKey = _ref2[0],
            info = _ref2[1];

        return /*#__PURE__*/_react["default"].createElement(RadioButton, {
          key: srcKey,
          value: srcKey
        }, info.label);
      }));

      return /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement(_antd.Popover, {
        content: content,
        title: title
      }, /*#__PURE__*/_react["default"].createElement(_icons.EllipsisOutlined, null)));
    }
  }]);
  return ValueSources;
}(_react.PureComponent);

exports["default"] = ValueSources;