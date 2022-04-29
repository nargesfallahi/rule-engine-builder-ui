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

var _icons = require("@ant-design/icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var SubMenu = _antd.Menu.SubMenu;
var MenuItem = _antd.Menu.Item;

var FieldDropdown = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(FieldDropdown, _PureComponent);

  var _super = _createSuper(FieldDropdown);

  function FieldDropdown() {
    var _this;

    (0, _classCallCheck2["default"])(this, FieldDropdown);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onChange = function (_ref) {
      var key = _ref.key,
          keyPath = _ref.keyPath;

      _this.props.setField(key);
    };

    return _this;
  }

  (0, _createClass2["default"])(FieldDropdown, [{
    key: "renderMenuItems",
    value: function renderMenuItems(fields) {
      var _this2 = this;

      return fields.map(function (field) {
        var items = field.items,
            key = field.key,
            path = field.path,
            label = field.label,
            fullLabel = field.fullLabel,
            altLabel = field.altLabel,
            tooltip = field.tooltip,
            disabled = field.disabled;
        var pathKey = path || key;
        var option = tooltip ? /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
          title: tooltip
        }, label) : label;

        if (items) {
          return /*#__PURE__*/_react["default"].createElement(SubMenu, {
            key: pathKey,
            title: /*#__PURE__*/_react["default"].createElement("span", null, option, " \xA0\xA0\xA0\xA0")
          }, _this2.renderMenuItems(items));
        } else {
          return /*#__PURE__*/_react["default"].createElement(MenuItem, {
            key: pathKey,
            disabled: disabled
          }, option);
        }
      });
    }
  }, {
    key: "renderMenuToggler",
    value: function renderMenuToggler(togglerLabel, tooltipText, config, readonly) {
      var toggler = /*#__PURE__*/_react["default"].createElement(_antd.Button, {
        size: config.settings.renderSize,
        disabled: readonly
      }, togglerLabel, " ", /*#__PURE__*/_react["default"].createElement(_icons.DownOutlined, null));

      if (tooltipText) {
        toggler = /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
          placement: "top",
          title: tooltipText
        }, toggler);
      }

      return toggler;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          customProps = _this$props.customProps,
          items = _this$props.items,
          placeholder = _this$props.placeholder,
          selectedKeys = _this$props.selectedKeys,
          selectedLabel = _this$props.selectedLabel,
          selectedOpts = _this$props.selectedOpts,
          readonly = _this$props.readonly,
          selectedAltLabel = _this$props.selectedAltLabel,
          selectedFullLabel = _this$props.selectedFullLabel;
      var fieldMenuItems = this.renderMenuItems(items);

      var fieldMenu = /*#__PURE__*/_react["default"].createElement(_antd.Menu //size={config.settings.renderSize}
      , (0, _extends2["default"])({
        selectedKeys: selectedKeys,
        onClick: this.onChange
      }, customProps), fieldMenuItems);

      var togglerLabel = selectedAltLabel || selectedLabel || placeholder;
      var tooltipText = selectedFullLabel;
      if (tooltipText == selectedLabel) tooltipText = null;
      var fieldToggler = this.renderMenuToggler(togglerLabel, tooltipText, config, readonly);
      return readonly ? fieldToggler : /*#__PURE__*/_react["default"].createElement(_antd.Dropdown, {
        overlay: fieldMenu,
        trigger: ["click"],
        placement: config.settings.dropdownPlacement
      }, fieldToggler);
    }
  }]);
  return FieldDropdown;
}(_react.PureComponent);

exports["default"] = FieldDropdown;
FieldDropdown.propTypes = {
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