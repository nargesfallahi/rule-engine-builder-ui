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

var _range = _interopRequireDefault(require("lodash/range"));

var _configUtils = require("../../utils/configUtils");

var _ruleUtils = require("../../utils/ruleUtils");

var _stuff = require("../../utils/stuff");

var _reactUtils = require("../../utils/reactUtils");

var _pick = _interopRequireDefault(require("lodash/pick"));

var _immutable = _interopRequireDefault(require("immutable"));

var _WidgetFactory = _interopRequireDefault(require("./WidgetFactory"));

var _utils = require("../utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var funcArgDummyOpDef = {
  cardinality: 1
};

var Widget = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(Widget, _PureComponent);

  var _super = _createSuper(Widget);

  function Widget(_props) {
    var _this;

    (0, _classCallCheck2["default"])(this, Widget);
    _this = _super.call(this, _props);

    _this._setValue = function (isSpecialRange, delta, widgetType, value, asyncListValues, __isInternal) {
      if (isSpecialRange && Array.isArray(value)) {
        var oldRange = [_this.props.value.get(0), _this.props.value.get(1)];
        if (oldRange[0] != value[0]) _this.props.setValue(0, value[0], widgetType, asyncListValues, __isInternal);
        if (oldRange[1] != value[1]) _this.props.setValue(1, value[1], widgetType, asyncListValues, __isInternal);
      } else {
        _this.props.setValue(delta, value, widgetType, asyncListValues, __isInternal);
      }
    };

    _this._onChangeValueSrc = function (delta, srcKey) {
      _this.props.setValueSrc(delta, srcKey);
    };

    _this.renderWidget = function (delta, meta, props) {
      var config = props.config,
          isFuncArg = props.isFuncArg,
          leftField = props.leftField,
          operator = props.operator,
          values = props.value,
          valueError = props.valueError,
          readonly = props.readonly,
          parentField = props.parentField,
          parentFuncs = props.parentFuncs,
          id = props.id,
          groupId = props.groupId;
      var settings = config.settings;
      var widgets = meta.widgets,
          iValues = meta.iValues,
          aField = meta.aField;
      var value = isFuncArg ? iValues : values;
      var field = isFuncArg ? leftField : aField;
      var _widgets$delta = widgets[delta],
          valueSrc = _widgets$delta.valueSrc,
          valueLabel = _widgets$delta.valueLabel;
      var widgetLabel = settings.showLabels ? /*#__PURE__*/_react["default"].createElement("label", {
        className: "rule--label"
      }, valueLabel.label) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: "widget-" + field + "-" + delta,
        className: "widget--widget"
      }, valueSrc == "func" ? null : widgetLabel, /*#__PURE__*/_react["default"].createElement(_WidgetFactory["default"], (0, _extends2["default"])({
        id: id,
        groupId: groupId,
        valueSrc: valueSrc,
        delta: delta,
        value: value,
        valueError: valueError,
        isFuncArg: isFuncArg
      }, (0, _pick["default"])(meta, ["isSpecialRange", "fieldDefinition", "asyncListValues"]), (0, _pick["default"])(widgets[delta], ["widget", "widgetDefinition", "widgetValueLabel", "valueLabels", "textSeparators", "setValueHandler"]), {
        config: config,
        field: field,
        parentField: parentField,
        parentFuncs: parentFuncs,
        operator: operator,
        readonly: readonly
      })));
    };

    _this.renderValueSources = function (delta, meta, props) {
      var config = props.config,
          isFuncArg = props.isFuncArg,
          leftField = props.leftField,
          operator = props.operator,
          readonly = props.readonly;
      var settings = config.settings;
      var valueSources = meta.valueSources,
          widgets = meta.widgets,
          aField = meta.aField;
      var field = isFuncArg ? leftField : aField;
      var _widgets$delta2 = widgets[delta],
          valueSrc = _widgets$delta2.valueSrc,
          setValueSrcHandler = _widgets$delta2.setValueSrcHandler;
      var valueSourcesInfo = settings.valueSourcesInfo,
          ValueSources = settings.renderValueSources;
      var valueSourcesOptions = valueSources.map(function (srcKey) {
        return [srcKey, {
          label: valueSourcesInfo[srcKey].label
        }];
      });
      var sourceLabel = settings.showLabels ? /*#__PURE__*/_react["default"].createElement("label", {
        className: "rule--label"
      }, "\xA0") : null;
      return valueSources.length > 1 && !readonly && /*#__PURE__*/_react["default"].createElement("div", {
        key: "valuesrc-" + field + "-" + delta,
        className: "widget--valuesrc"
      }, sourceLabel, /*#__PURE__*/_react["default"].createElement(ValueSources, {
        key: "valuesrc-" + delta,
        delta: delta,
        valueSources: valueSourcesOptions,
        valueSrc: valueSrc,
        config: config,
        field: field,
        operator: operator,
        setValueSrc: setValueSrcHandler,
        readonly: readonly,
        title: settings.valueSourcesPopupTitle
      }));
    };

    _this.renderSep = function (delta, meta, props) {
      var config = props.config;
      var widgets = meta.widgets;
      var settings = config.settings;
      var sepText = widgets[delta].sepText;
      var sepLabel = settings.showLabels ? /*#__PURE__*/_react["default"].createElement("label", {
        className: "rule--label"
      }, "\xA0") : null;
      return sepText && /*#__PURE__*/_react["default"].createElement("div", {
        key: "widget-separators-" + delta,
        className: "widget--sep"
      }, sepLabel, /*#__PURE__*/_react["default"].createElement("span", null, sepText));
    };

    _this.renderWidgetDelta = function (delta) {
      var sep = _this.renderSep(delta, _this.meta, _this.props);

      var sources = _this.renderValueSources(delta, _this.meta, _this.props);

      var widgetCmp = _this.renderWidget(delta, _this.meta, _this.props);

      return [sep, sources, widgetCmp];
    };

    (0, _reactUtils.useOnPropsChanged)((0, _assertThisInitialized2["default"])(_this));

    _this.onPropsChanged(_props);

    return _this;
  }

  (0, _createClass2["default"])(Widget, [{
    key: "onPropsChanged",
    value: function onPropsChanged(nextProps) {
      var prevProps = this.props;
      var keysForMeta = ["config", "field", "fieldFunc", "fieldArg", "leftField", "operator", "valueSrc", "isFuncArg", "asyncListValues"];
      var needUpdateMeta = !this.meta || keysForMeta.map(function (k) {
        return nextProps[k] !== prevProps[k] //tip: for isFuncArg we need to wrap value in Imm list
        || k == "isFuncArg" && nextProps["isFuncArg"] && nextProps["value"] !== prevProps["value"];
      }).filter(function (ch) {
        return ch;
      }).length > 0;

      if (needUpdateMeta) {
        this.meta = this.getMeta(nextProps);
      }
    }
  }, {
    key: "getMeta",
    value: function getMeta(_ref) {
      var _this2 = this;

      var config = _ref.config,
          simpleField = _ref.field,
          fieldFunc = _ref.fieldFunc,
          fieldArg = _ref.fieldArg,
          operator = _ref.operator,
          valueSrcs = _ref.valueSrc,
          values = _ref.value,
          isForRuleGruop = _ref.isForRuleGruop,
          isCaseValue = _ref.isCaseValue,
          isFuncArg = _ref.isFuncArg,
          leftField = _ref.leftField,
          asyncListValues = _ref.asyncListValues;
      var field = isFuncArg ? {
        func: fieldFunc,
        arg: fieldArg
      } : simpleField;
      var iValueSrcs = valueSrcs;
      var iValues = values;

      if (isFuncArg || isForRuleGruop || isCaseValue) {
        iValueSrcs = _immutable["default"].List([valueSrcs]);
        iValues = _immutable["default"].List([values]);
      }

      var fieldDefinition = (0, _configUtils.getFieldConfig)(config, field);
      var defaultWidget = (0, _ruleUtils.getWidgetForFieldOp)(config, field, operator);

      var _widgets = (0, _ruleUtils.getWidgetsForFieldOp)(config, field, operator);

      var operatorDefinition = isFuncArg ? funcArgDummyOpDef : (0, _configUtils.getOperatorConfig)(config, operator, field);

      if ((fieldDefinition == null || operatorDefinition == null) && !isCaseValue) {
        return null;
      }

      var isSpecialRange = operatorDefinition === null || operatorDefinition === void 0 ? void 0 : operatorDefinition.isSpecialRange;
      var isSpecialRangeForSrcField = isSpecialRange && (iValueSrcs.get(0) == "field" || iValueSrcs.get(1) == "field");
      var isTrueSpecialRange = isSpecialRange && !isSpecialRangeForSrcField;
      var cardinality = isTrueSpecialRange ? 1 : (0, _stuff.defaultValue)(operatorDefinition === null || operatorDefinition === void 0 ? void 0 : operatorDefinition.cardinality, 1);

      if (cardinality === 0) {
        return null;
      }

      var valueSources = (0, _ruleUtils.getValueSourcesForFieldOp)(config, field, operator, fieldDefinition, isFuncArg ? leftField : null);
      var widgets = (0, _range["default"])(0, cardinality).map(function (delta) {
        var _widgetDefinition;

        var valueSrc = iValueSrcs.get(delta) || null;
        var widget = (0, _ruleUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
        var widgetDefinition = (0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget, valueSrc);

        if (isSpecialRangeForSrcField) {
          widget = widgetDefinition.singleWidget;
          widgetDefinition = (0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget, valueSrc);
        }

        var widgetType = (_widgetDefinition = widgetDefinition) === null || _widgetDefinition === void 0 ? void 0 : _widgetDefinition.type;
        var valueLabel = (0, _ruleUtils.getValueLabel)(config, field, operator, delta, valueSrc, isTrueSpecialRange);
        var widgetValueLabel = (0, _ruleUtils.getValueLabel)(config, field, operator, delta, null, isTrueSpecialRange);
        var sepText = operatorDefinition !== null && operatorDefinition !== void 0 && operatorDefinition.textSeparators ? operatorDefinition === null || operatorDefinition === void 0 ? void 0 : operatorDefinition.textSeparators[delta] : null;

        var setValueSrcHandler = _this2._onChangeValueSrc.bind(_this2, delta);

        var valueLabels = null;
        var textSeparators = null;

        if (isSpecialRange) {
          valueLabels = [(0, _ruleUtils.getValueLabel)(config, field, operator, 0), (0, _ruleUtils.getValueLabel)(config, field, operator, 1)];
          valueLabels = {
            placeholder: [valueLabels[0].placeholder, valueLabels[1].placeholder],
            label: [valueLabels[0].label, valueLabels[1].label]
          };
          textSeparators = operatorDefinition === null || operatorDefinition === void 0 ? void 0 : operatorDefinition.textSeparators;
        }

        var setValueHandler = _this2._setValue.bind(_this2, isSpecialRange, delta, widgetType);

        return {
          valueSrc: valueSrc,
          valueLabel: valueLabel,
          widget: widget,
          sepText: sepText,
          setValueSrcHandler: setValueSrcHandler,
          widgetDefinition: widgetDefinition,
          widgetValueLabel: widgetValueLabel,
          valueLabels: valueLabels,
          textSeparators: textSeparators,
          setValueHandler: setValueHandler
        };
      });
      return {
        defaultWidget: defaultWidget,
        fieldDefinition: fieldDefinition,
        operatorDefinition: operatorDefinition,
        isSpecialRange: isTrueSpecialRange,
        cardinality: cardinality,
        valueSources: valueSources,
        widgets: widgets,
        iValues: iValues,
        //correct for isFuncArg
        aField: field,
        //correct for isFuncArg
        asyncListValues: asyncListValues
      };
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.meta) return null;
      var _this$meta = this.meta,
          defaultWidget = _this$meta.defaultWidget,
          cardinality = _this$meta.cardinality;
      if (!defaultWidget) return null;
      var name = defaultWidget;
      return /*#__PURE__*/_react["default"].createElement(_utils.Col, {
        className: "rule--widget rule--widget--".concat(name.toUpperCase()),
        key: "widget-col-" + name
      }, (0, _range["default"])(0, cardinality).map(this.renderWidgetDelta));
    }
  }]);
  return Widget;
}(_react.PureComponent);

exports["default"] = Widget;
Widget.propTypes = {
  config: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].any,
  //instanceOf(Immutable.List)
  valueSrc: _propTypes["default"].any,
  //instanceOf(Immutable.List)
  valueError: _propTypes["default"].any,
  field: _propTypes["default"].string,
  operator: _propTypes["default"].string,
  readonly: _propTypes["default"].bool,
  asyncListValues: _propTypes["default"].array,
  id: _propTypes["default"].string,
  groupId: _propTypes["default"].string,
  //actions
  setValue: _propTypes["default"].func,
  setValueSrc: _propTypes["default"].func,
  // for isFuncArg
  isFuncArg: _propTypes["default"].bool,
  fieldFunc: _propTypes["default"].string,
  fieldArg: _propTypes["default"].string,
  leftField: _propTypes["default"].string,
  // for RuleGroupExt
  isForRuleGruop: _propTypes["default"].bool,
  parentField: _propTypes["default"].string,
  // for func in func
  parentFuncs: _propTypes["default"].array,
  // for case_value
  isCaseValue: _propTypes["default"].bool
};