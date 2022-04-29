"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _domUtils = require("../../../../utils/domUtils");

var _propTypes = _interopRequireDefault(require("prop-types"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Option = _antd.Select.Option,
    OptGroup = _antd.Select.OptGroup;

var FieldSelect = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(FieldSelect, _PureComponent);

  var _super = _createSuper(FieldSelect);

  function FieldSelect() {
    var _this;

    (0, _classCallCheck2["default"])(this, FieldSelect);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _this.onChange = function (key) {
      _this.props.setField(key);
    };

    _this.filterOption = function (input, option) {
      var dataForFilter = option;
      var keysForFilter = ["title", "value", "grouplabel", "label"];
      var valueForFilter = keysForFilter.map(function (k) {
        return typeof dataForFilter[k] == "string" ? dataForFilter[k] : "";
      }).join("\0");
      return valueForFilter.toLowerCase().indexOf(input.toLowerCase()) >= 0;
    };

    return _this;
  }

  (0, _createClass2["default"])(FieldSelect, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          customProps = _this$props.customProps,
          items = _this$props.items,
          placeholder = _this$props.placeholder,
          selectedKey = _this$props.selectedKey,
          selectedLabel = _this$props.selectedLabel,
          selectedOpts = _this$props.selectedOpts,
          selectedAltLabel = _this$props.selectedAltLabel,
          selectedFullLabel = _this$props.selectedFullLabel,
          readonly = _this$props.readonly;

      var _ref = customProps || {},
          showSearch = _ref.showSearch;

      var selectText = selectedLabel || placeholder;
      var selectWidth = (0, _domUtils.calcTextWidth)(selectText);
      var isFieldSelected = !!selectedKey;
      var dropdownPlacement = config.settings.dropdownPlacement;
      var dropdownAlign = dropdownPlacement ? _domUtils.BUILT_IN_PLACEMENTS[dropdownPlacement] : undefined;
      var width = isFieldSelected && !showSearch ? null : selectWidth + _domUtils.SELECT_WIDTH_OFFSET_RIGHT;
      var tooltipText = selectedAltLabel || selectedFullLabel;
      if (tooltipText == selectedLabel) tooltipText = null;
      var fieldSelectItems = this.renderSelectItems(items);

      var res = /*#__PURE__*/_react["default"].createElement(_antd.Select, (0, _extends2["default"])({
        dropdownAlign: dropdownAlign,
        dropdownMatchSelectWidth: false,
        style: {
          width: width
        },
        placeholder: placeholder,
        size: config.settings.renderSize,
        onChange: this.onChange,
        value: selectedKey || undefined,
        filterOption: this.filterOption,
        disabled: readonly
      }, customProps), fieldSelectItems);

      if (tooltipText && !selectedOpts.tooltip) {
        res = /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
          title: tooltipText
        }, res);
      }

      return res;
    }
  }, {
    key: "renderSelectItems",
    value: function renderSelectItems(fields) {
      var _this2 = this;

      var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      return fields.map(function (field) {
        var items = field.items,
            key = field.key,
            path = field.path,
            label = field.label,
            fullLabel = field.fullLabel,
            altLabel = field.altLabel,
            tooltip = field.tooltip,
            grouplabel = field.grouplabel,
            disabled = field.disabled;
        var groupPrefix = level > 0 ? "\xA0\xA0".repeat(level) : "";
        var prefix = level > 1 ? "\xA0\xA0".repeat(level - 1) : "";
        var pathKey = path || key;

        if (items) {
          var simpleItems = items.filter(function (it) {
            return !it.items;
          });
          var complexItems = items.filter(function (it) {
            return !!it.items;
          });
          var gr = simpleItems.length ? [/*#__PURE__*/_react["default"].createElement(OptGroup, {
            key: pathKey,
            label: groupPrefix + label
          }, _this2.renderSelectItems(simpleItems, level + 1))] : [];
          var list = complexItems.length ? _this2.renderSelectItems(complexItems, level + 1) : [];
          return [].concat(gr, (0, _toConsumableArray2["default"])(list));
        } else {
          var option = tooltip ? /*#__PURE__*/_react["default"].createElement(_antd.Tooltip, {
            title: tooltip
          }, prefix + label) : prefix + label;
          return /*#__PURE__*/_react["default"].createElement(Option, {
            key: pathKey,
            value: pathKey,
            title: altLabel,
            grouplabel: grouplabel,
            label: label,
            disabled: disabled
          }, option);
        }
      }).flat(Infinity);
    }
  }]);
  return FieldSelect;
}(_react.PureComponent);

exports["default"] = FieldSelect;
FieldSelect.propTypes = {
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