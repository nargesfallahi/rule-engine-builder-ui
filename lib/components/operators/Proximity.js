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

var _range = _interopRequireDefault(require("lodash/range"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Proximity = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(Proximity, _PureComponent);

  var _super = _createSuper(Proximity);

  function Proximity() {
    var _this;

    (0, _classCallCheck2["default"])(this, Proximity);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.handleChange = function (value) {
      _this.props.setOption("proximity", parseInt(value));
    };

    return _this;
  }

  (0, _createClass2["default"])(Proximity, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          defaults = _this$props.defaults,
          options = _this$props.options,
          config = _this$props.config,
          optionLabel = _this$props.optionLabel,
          optionPlaceholder = _this$props.optionPlaceholder,
          customProps = _this$props.customProps,
          minProximity = _this$props.minProximity,
          maxProximity = _this$props.maxProximity,
          optionTextBefore = _this$props.optionTextBefore,
          readonly = _this$props.readonly;
      var settings = config.settings,
          widgets = config.widgets;
      var defaultProximity = defaults ? defaults.proximity : undefined;
      var showLabels = settings.showLabels;
      var selectedProximity = options.get("proximity", defaultProximity);
      var proxValues = (0, _range["default"])(minProximity, maxProximity + 1).map(function (item) {
        return {
          title: item,
          value: item
        };
      });
      var Select = widgets.select.factory;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "operator--PROXIMITY"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "operator--options"
      }, showLabels && /*#__PURE__*/_react["default"].createElement("label", {
        className: "rule--label"
      }, optionLabel), !showLabels && optionTextBefore && /*#__PURE__*/_react["default"].createElement("div", {
        className: "operator--options--sep"
      }, /*#__PURE__*/_react["default"].createElement("span", null, optionTextBefore)), /*#__PURE__*/_react["default"].createElement(Select, (0, _extends2["default"])({
        config: config,
        value: selectedProximity,
        listValues: proxValues,
        setValue: this.handleChange,
        readonly: readonly,
        placeholder: optionPlaceholder
      }, customProps))), /*#__PURE__*/_react["default"].createElement("div", {
        className: "operator--widgets"
      }, this.props.children));
    }
  }]);
  return Proximity;
}(_react.PureComponent);

exports["default"] = Proximity;
Proximity.propTypes = {
  config: _propTypes["default"].object.isRequired,
  setOption: _propTypes["default"].func.isRequired,
  options: _propTypes["default"].any.isRequired,
  //instanceOf(Immutable.Map)
  minProximity: _propTypes["default"].number,
  maxProximity: _propTypes["default"].number,
  optionPlaceholder: _propTypes["default"].string,
  optionTextBefore: _propTypes["default"].string,
  optionLabel: _propTypes["default"].string,
  customProps: _propTypes["default"].object,
  readonly: _propTypes["default"].bool //children

};
Proximity.defaultProps = {
  customProps: {},
  minProximity: 2,
  maxProximity: 10,
  optionPlaceholder: "Select words between",
  optionLabel: "Words between",
  optionTextBefore: null
};