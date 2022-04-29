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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _domUtils = require("../../../../utils/domUtils");

var _stuff = require("../../../../utils/stuff");

var _reactUtils = require("../../../../utils/reactUtils");

var _antd = require("antd");

var _omit = _interopRequireDefault(require("lodash/omit"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Option = _antd.Select.Option;

var SelectWidget = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(SelectWidget, _PureComponent);

  var _super = _createSuper(SelectWidget);

  function SelectWidget(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, SelectWidget);
    _this = _super.call(this, props);

    _this.handleChange = function (val) {
      _this.props.setValue(val);
    };

    _this.filterOption = function (input, option) {
      var dataForFilter = option.children || option.value;
      return dataForFilter.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    (0, _reactUtils.useOnPropsChanged)((0, _assertThisInitialized2["default"])(_this));

    _this.onPropsChanged(props);

    return _this;
  }

  (0, _createClass2["default"])(SelectWidget, [{
    key: "onPropsChanged",
    value: function onPropsChanged(props) {
      var listValues = props.listValues;
      var optionsMaxWidth = 0;
      (0, _stuff.mapListValues)(listValues, function (_ref) {
        var title = _ref.title,
            value = _ref.value;
        optionsMaxWidth = Math.max(optionsMaxWidth, (0, _domUtils.calcTextWidth)(title, null));
      });
      this.optionsMaxWidth = optionsMaxWidth;
      this.options = (0, _stuff.mapListValues)(listValues, function (_ref2) {
        var title = _ref2.title,
            value = _ref2.value;
        return /*#__PURE__*/_react["default"].createElement(Option, {
          key: value + "",
          value: value + ""
        }, title);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          placeholder = _this$props.placeholder,
          customProps = _this$props.customProps,
          value = _this$props.value,
          readonly = _this$props.readonly;
      var renderSize = config.settings.renderSize;
      var placeholderWidth = (0, _domUtils.calcTextWidth)(placeholder);
      var dropdownWidth = this.optionsMaxWidth + _domUtils.SELECT_WIDTH_OFFSET_RIGHT;
      var width = value ? dropdownWidth : placeholderWidth + _domUtils.SELECT_WIDTH_OFFSET_RIGHT;
      var aValue = value != undefined ? value + "" : undefined;
      var customSelectProps = (0, _omit["default"])(customProps, [""]);
      return /*#__PURE__*/_react["default"].createElement(_antd.Select, (0, _extends2["default"])({
        disabled: readonly,
        style: {
          width: width
        },
        key: "widget-select",
        dropdownMatchSelectWidth: false,
        placeholder: placeholder,
        size: renderSize,
        value: aValue,
        onChange: this.handleChange,
        filterOption: this.filterOption
      }, customSelectProps), this.options);
    }
  }]);
  return SelectWidget;
}(_react.PureComponent);

exports["default"] = SelectWidget;
SelectWidget.propTypes = {
  setValue: _propTypes["default"].func.isRequired,
  config: _propTypes["default"].object.isRequired,
  field: _propTypes["default"].string,
  value: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  //key in listValues
  customProps: _propTypes["default"].object,
  fieldDefinition: _propTypes["default"].object,
  readonly: _propTypes["default"].bool,
  // from fieldSettings:
  listValues: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array])
};