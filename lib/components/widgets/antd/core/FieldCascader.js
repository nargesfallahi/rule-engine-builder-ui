"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _stuff = require("../../../../utils/stuff");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var FieldCascader = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(FieldCascader, _PureComponent);

  var _super = _createSuper(FieldCascader);

  function FieldCascader() {
    var _this;

    (0, _classCallCheck2["default"])(this, FieldCascader);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onChange = function (keys) {
      var parentField = _this.props.parentField;

      var dotNotationToPath = function dotNotationToPath(str) {
        return str.split(".");
      };

      var parentPath = parentField ? dotNotationToPath(parentField) : [];

      _this.props.setField([].concat((0, _toConsumableArray2["default"])(parentPath), (0, _toConsumableArray2["default"])(keys)));
    };

    _this.filterOption = function (inputValue, path) {
      var keysForFilter = ["label", "key", "altLabel"];
      return path.some(function (option) {
        return keysForFilter.map(function (k) {
          return option[k];
        }).join("\0").toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
      });
    };

    return _this;
  }

  (0, _createClass2["default"])(FieldCascader, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          customProps = _this$props.customProps,
          items = _this$props.items,
          placeholder = _this$props.placeholder,
          selectedPath = _this$props.selectedPath,
          selectedLabel = _this$props.selectedLabel,
          selectedOpts = _this$props.selectedOpts,
          selectedAltLabel = _this$props.selectedAltLabel,
          selectedFullLabel = _this$props.selectedFullLabel,
          readonly = _this$props.readonly,
          selectedField = _this$props.selectedField,
          parentField = _this$props.parentField;

      var customProps2 = _objectSpread({}, customProps);

      if (customProps2.showSearch) {
        customProps2.showSearch = {
          filter: this.filterOption
        };
      }

      var fieldSeparator = config.settings.fieldSeparator;
      var parentFieldPath = parentField ? parentField.split(fieldSeparator) : [];
      var value = (0, _stuff.removePrefixPath)(selectedPath, parentFieldPath);

      var res = /*#__PURE__*/_react["default"].createElement(_antd.Cascader, (0, _extends2["default"])({
        fieldNames: {
          label: "label",
          value: "key",
          children: "items"
        },
        options: items,
        value: value,
        onChange: this.onChange,
        allowClear: false,
        placeholder: placeholder,
        size: config.settings.renderSize,
        disabled: readonly
      }, customProps2));

      var tooltipText = selectedOpts.tooltip || selectedAltLabel;
      if (tooltipText == selectedLabel) tooltipText = null;

      if (tooltipText) {
        res = /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
          title: tooltipText
        }, res);
      }

      return res;
    }
  }]);
  return FieldCascader;
}(_react.PureComponent);

exports["default"] = FieldCascader;
FieldCascader.propTypes = {
  config: _propTypes["default"].object.isRequired,
  customProps: _propTypes["default"].object,
  items: _propTypes["default"].array.isRequired,
  placeholder: _propTypes["default"].string,
  selectedKey: _propTypes["default"].string,
  selectedKeys: _propTypes["default"].array,
  selectedPath: _propTypes["default"].array,
  selectedLabel: _propTypes["default"].string,
  selectedAltLabel: _propTypes["default"].string,
  selectedFullLabel: _propTypes["default"].string,
  selectedOpts: _propTypes["default"].object,
  readonly: _propTypes["default"].bool,
  //actions
  setField: _propTypes["default"].func.isRequired
};