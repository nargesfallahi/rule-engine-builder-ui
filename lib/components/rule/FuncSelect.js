"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _configUtils = require("../../utils/configUtils");

var _ruleUtils = require("../../utils/ruleUtils");

var _stuff = require("../../utils/stuff");

var _reactUtils = require("../../utils/reactUtils");

var _last = _interopRequireDefault(require("lodash/last"));

var _keys = _interopRequireDefault(require("lodash/keys"));

var _clone = _interopRequireDefault(require("clone"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

//tip: this.props.value - right value, this.props.field - left value
var FuncSelect = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(FuncSelect, _PureComponent);

  var _super = _createSuper(FuncSelect);

  function FuncSelect(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, FuncSelect);
    _this = _super.call(this, props);
    (0, _reactUtils.useOnPropsChanged)((0, _assertThisInitialized2["default"])(_this));

    _this.onPropsChanged(props);

    return _this;
  }

  (0, _createClass2["default"])(FuncSelect, [{
    key: "onPropsChanged",
    value: function onPropsChanged(nextProps) {
      var prevProps = this.props;
      var keysForItems = ["config", "field", "operator"];
      var keysForMeta = ["config", "field", "value"];
      var needUpdateItems = !this.items || keysForItems.map(function (k) {
        return nextProps[k] !== prevProps[k];
      }).filter(function (ch) {
        return ch;
      }).length > 0;
      var needUpdateMeta = !this.meta || keysForMeta.map(function (k) {
        return nextProps[k] !== prevProps[k];
      }).filter(function (ch) {
        return ch;
      }).length > 0;

      if (needUpdateMeta) {
        this.meta = this.getMeta(nextProps);
      }

      if (needUpdateItems) {
        this.items = this.getItems(nextProps);
      }
    }
  }, {
    key: "getItems",
    value: function getItems(_ref) {
      var config = _ref.config,
          field = _ref.field,
          operator = _ref.operator,
          parentFuncs = _ref.parentFuncs;
      var canUseFuncForField = config.settings.canUseFuncForField;
      var filteredFuncs = this.filterFuncs(config, config.funcs, field, operator, canUseFuncForField, parentFuncs);
      var items = this.buildOptions(config, filteredFuncs);
      return items;
    }
  }, {
    key: "getMeta",
    value: function getMeta(_ref2) {
      var config = _ref2.config,
          field = _ref2.field,
          value = _ref2.value;
      var _config$settings = config.settings,
          funcPlaceholder = _config$settings.funcPlaceholder,
          fieldSeparatorDisplay = _config$settings.fieldSeparatorDisplay;
      var selectedFuncKey = value;
      var isFuncSelected = !!value;
      var leftFieldConfig = (0, _configUtils.getFieldConfig)(config, field);
      var leftFieldWidgetField = leftFieldConfig.widgets.field;
      var leftFieldWidgetFieldProps = leftFieldWidgetField && leftFieldWidgetField.widgetProps || {};
      var placeholder = !isFuncSelected ? funcPlaceholder : null;
      var currFunc = isFuncSelected ? (0, _configUtils.getFuncConfig)(config, selectedFuncKey) : null;
      var selectedOpts = currFunc || {};
      var selectedKeys = (0, _ruleUtils.getFieldPath)(selectedFuncKey, config);
      var selectedPath = (0, _ruleUtils.getFieldPath)(selectedFuncKey, config, true);
      var selectedLabel = this.getFuncLabel(currFunc, selectedFuncKey, config);
      var partsLabels = (0, _ruleUtils.getFuncPathLabels)(selectedFuncKey, config);
      var selectedFullLabel = partsLabels ? partsLabels.join(fieldSeparatorDisplay) : null;
      if (selectedFullLabel == selectedLabel) selectedFullLabel = null;
      return {
        placeholder: placeholder,
        selectedKey: selectedFuncKey,
        selectedKeys: selectedKeys,
        selectedPath: selectedPath,
        selectedLabel: selectedLabel,
        selectedOpts: selectedOpts,
        selectedFullLabel: selectedFullLabel
      };
    }
  }, {
    key: "filterFuncs",
    value: function filterFuncs(config, funcs, leftFieldFullkey, operator, canUseFuncForField, parentFuncs) {
      funcs = (0, _clone["default"])(funcs);
      var fieldSeparator = config.settings.fieldSeparator;
      var leftFieldConfig = (0, _configUtils.getFieldConfig)(config, leftFieldFullkey);
      var expectedType;
      var widget = (0, _ruleUtils.getWidgetForFieldOp)(config, leftFieldFullkey, operator, "value");

      if (widget) {
        var widgetConfig = config.widgets[widget];
        var widgetType = widgetConfig.type; //expectedType = leftFieldConfig.type;

        expectedType = widgetType;
      } else {
        expectedType = leftFieldConfig.type;
      }

      function _filter(list, path) {
        for (var funcKey in list) {
          var subfields = list[funcKey].subfields;
          var subpath = (path ? path : []).concat(funcKey);
          var funcFullkey = subpath.join(fieldSeparator);
          var funcConfig = (0, _configUtils.getFuncConfig)(config, funcFullkey);

          if (funcConfig.type == "!struct") {
            if (_filter(subfields, subpath) == 0) delete list[funcKey];
          } else {
            var canUse = funcConfig.returnType == expectedType;
            if (leftFieldConfig.funcs) canUse = canUse && leftFieldConfig.funcs.includes(funcFullkey);
            if (canUseFuncForField) canUse = canUse && canUseFuncForField(leftFieldFullkey, leftFieldConfig, funcFullkey, funcConfig, operator); // don't use func in func (can be configurable, but usually users don't need this)

            if (parentFuncs && parentFuncs.includes(funcFullkey)) canUse = false;
            if (!canUse) delete list[funcKey];
          }
        }

        return (0, _keys["default"])(list).length;
      }

      _filter(funcs, []);

      return funcs;
    }
  }, {
    key: "buildOptions",
    value: function buildOptions(config, funcs) {
      var _this2 = this;

      var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var optGroupLabel = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
      if (!funcs) return null;
      var _config$settings2 = config.settings,
          fieldSeparator = _config$settings2.fieldSeparator,
          fieldSeparatorDisplay = _config$settings2.fieldSeparatorDisplay;
      var prefix = path ? path.join(fieldSeparator) + fieldSeparator : "";
      return (0, _keys["default"])(funcs).map(function (funcKey) {
        var func = funcs[funcKey];

        var label = _this2.getFuncLabel(func, funcKey, config);

        var partsLabels = (0, _ruleUtils.getFuncPathLabels)(funcKey, config);
        var fullLabel = partsLabels.join(fieldSeparatorDisplay);
        if (fullLabel == label) fullLabel = null;
        var tooltip = func.tooltip;
        var subpath = (path ? path : []).concat(funcKey);

        if (func.type == "!struct") {
          return {
            key: funcKey,
            path: prefix + funcKey,
            label: label,
            fullLabel: fullLabel,
            tooltip: tooltip,
            items: _this2.buildOptions(config, func.subfields, subpath, label)
          };
        } else {
          return {
            key: funcKey,
            path: prefix + funcKey,
            label: label,
            fullLabel: fullLabel,
            tooltip: tooltip,
            grouplabel: optGroupLabel
          };
        }
      });
    }
  }, {
    key: "getFuncLabel",
    value: function getFuncLabel(funcOpts, funcKey, config) {
      if (!funcKey) return null;
      var fieldSeparator = config.settings.fieldSeparator;
      var maxLabelsLength = config.settings.maxLabelsLength;
      var funcParts = Array.isArray(funcKey) ? funcKey : funcKey.split(fieldSeparator);
      var label = funcOpts.label || (0, _last["default"])(funcParts);
      label = (0, _stuff.truncateString)(label, maxLabelsLength);
      return label;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          config = _this$props.config,
          customProps = _this$props.customProps,
          setValue = _this$props.setValue,
          readonly = _this$props.readonly,
          id = _this$props.id,
          groupId = _this$props.groupId;
      var renderFunc = config.settings.renderFunc;

      var renderProps = _objectSpread({
        config: config,
        customProps: customProps,
        readonly: readonly,
        setField: setValue,
        items: this.items,
        id: id,
        groupId: groupId
      }, this.meta);

      return renderFunc(renderProps);
    }
  }]);
  return FuncSelect;
}(_react.PureComponent);

exports["default"] = FuncSelect;
FuncSelect.propTypes = {
  id: _propTypes["default"].string,
  groupId: _propTypes["default"].string,
  config: _propTypes["default"].object.isRequired,
  field: _propTypes["default"].string.isRequired,
  operator: _propTypes["default"].string,
  customProps: _propTypes["default"].object,
  value: _propTypes["default"].string,
  setValue: _propTypes["default"].func.isRequired,
  readonly: _propTypes["default"].bool,
  parentFuncs: _propTypes["default"].array
};