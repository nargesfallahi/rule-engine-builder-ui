"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _mui = _interopRequireDefault(require("../../components/widgets/mui"));

var _basic = _interopRequireWildcard(require("../basic"));

var _react = _interopRequireDefault(require("react"));

var _export = require("../../utils/export");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var MuiBooleanWidget = _mui["default"].MuiBooleanWidget,
    MuiTextWidget = _mui["default"].MuiTextWidget,
    MuiTextAreaWidget = _mui["default"].MuiTextAreaWidget,
    MuiDateWidget = _mui["default"].MuiDateWidget,
    MuiTimeWidget = _mui["default"].MuiTimeWidget,
    MuiDateTimeWidget = _mui["default"].MuiDateTimeWidget,
    MuiMultiSelectWidget = _mui["default"].MuiMultiSelectWidget,
    MuiSelectWidget = _mui["default"].MuiSelectWidget,
    MuiNumberWidget = _mui["default"].MuiNumberWidget,
    MuiSliderWidget = _mui["default"].MuiSliderWidget,
    MuiRangeWidget = _mui["default"].MuiRangeWidget,
    MuiAutocompleteWidget = _mui["default"].MuiAutocompleteWidget,
    MuiFieldSelect = _mui["default"].MuiFieldSelect,
    MuiFieldAutocomplete = _mui["default"].MuiFieldAutocomplete,
    MuiConjs = _mui["default"].MuiConjs,
    MuiSwitch = _mui["default"].MuiSwitch,
    MuiButton = _mui["default"].MuiButton,
    MuiButtonGroup = _mui["default"].MuiButtonGroup,
    MuiValueSources = _mui["default"].MuiValueSources,
    MuiProvider = _mui["default"].MuiProvider,
    MuiConfirm = _mui["default"].MuiConfirm,
    MuiUseConfirm = _mui["default"].MuiUseConfirm;

var settings = _objectSpread(_objectSpread({}, _basic["default"].settings), {}, {
  renderField: function renderField(props) {
    var _props$customProps;

    return props !== null && props !== void 0 && (_props$customProps = props.customProps) !== null && _props$customProps !== void 0 && _props$customProps.showSearch ? /*#__PURE__*/_react["default"].createElement(MuiFieldAutocomplete, props) : /*#__PURE__*/_react["default"].createElement(MuiFieldSelect, props);
  },
  renderOperator: function renderOperator(props) {
    return /*#__PURE__*/_react["default"].createElement(MuiFieldSelect, props);
  },
  renderFunc: function renderFunc(props) {
    return /*#__PURE__*/_react["default"].createElement(MuiFieldSelect, props);
  },
  renderConjs: function renderConjs(props) {
    return /*#__PURE__*/_react["default"].createElement(MuiConjs, props);
  },
  renderSwitch: function renderSwitch(props) {
    return /*#__PURE__*/_react["default"].createElement(MuiSwitch, props);
  },
  renderButton: function renderButton(props) {
    return /*#__PURE__*/_react["default"].createElement(MuiButton, props);
  },
  renderButtonGroup: function renderButtonGroup(props) {
    return /*#__PURE__*/_react["default"].createElement(MuiButtonGroup, props);
  },
  renderValueSources: function renderValueSources(props) {
    return /*#__PURE__*/_react["default"].createElement(MuiValueSources, props);
  },
  renderProvider: function renderProvider(props) {
    return /*#__PURE__*/_react["default"].createElement(MuiProvider, props);
  },
  renderConfirm: MuiConfirm,
  useConfirm: MuiUseConfirm
});

var widgets = _objectSpread(_objectSpread({}, _basic["default"].widgets), {}, {
  text: _objectSpread(_objectSpread({}, _basic["default"].widgets.text), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MuiTextWidget, props);
    }
  }),
  textarea: _objectSpread(_objectSpread({}, _basic["default"].widgets.textarea), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MuiTextAreaWidget, props);
    }
  }),
  number: _objectSpread(_objectSpread({}, _basic["default"].widgets.number), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MuiNumberWidget, props);
    }
  }),
  multiselect: _objectSpread(_objectSpread({}, _basic["default"].widgets.multiselect), {}, {
    factory: function factory(props) {
      return props.asyncFetch || props.showSearch ? /*#__PURE__*/_react["default"].createElement(MuiAutocompleteWidget, (0, _extends2["default"])({
        multiple: true
      }, props)) : /*#__PURE__*/_react["default"].createElement(MuiMultiSelectWidget, props);
    }
  }),
  select: _objectSpread(_objectSpread({}, _basic["default"].widgets.select), {}, {
    factory: function factory(props) {
      return props.asyncFetch || props.showSearch ? /*#__PURE__*/_react["default"].createElement(MuiAutocompleteWidget, props) : /*#__PURE__*/_react["default"].createElement(MuiSelectWidget, props);
    }
  }),
  slider: _objectSpread(_objectSpread({}, _basic["default"].widgets.slider), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MuiSliderWidget, props);
    }
  }),
  "boolean": _objectSpread(_objectSpread({}, _basic["default"].widgets["boolean"]), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MuiBooleanWidget, props);
    }
  }),
  date: _objectSpread(_objectSpread({}, _basic["default"].widgets.date), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MuiDateWidget, props);
    }
  }),
  time: _objectSpread(_objectSpread({}, _basic["default"].widgets.time), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MuiTimeWidget, props);
    }
  }),
  datetime: _objectSpread(_objectSpread({}, _basic["default"].widgets.datetime), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MuiDateTimeWidget, props);
    }
  }),
  rangeslider: {
    type: "number",
    jsType: "number",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(MuiRangeWidget, props);
    },
    valueLabel: "Range",
    valuePlaceholder: "Select range",
    valueLabels: [{
      label: "Number from",
      placeholder: "Enter number from"
    }, {
      label: "Number to",
      placeholder: "Enter number to"
    }],
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      return isForDisplay ? (0, _basic.stringifyForDisplay)(val) : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _export.SqlString.escape(val);
    },
    singleWidget: "slider",
    toJS: function toJS(val, fieldSettings) {
      return val;
    }
  }
});

var types = _objectSpread(_objectSpread({}, _basic["default"].types), {}, {
  number: _objectSpread(_objectSpread({}, _basic["default"].types.number), {}, {
    widgets: _objectSpread(_objectSpread({}, _basic["default"].types.number.widgets), {}, {
      rangeslider: {
        opProps: {
          between: {
            isSpecialRange: true
          },
          not_between: {
            isSpecialRange: true
          }
        },
        operators: ["between", "not_between", "is_empty", "is_not_empty"]
      }
    })
  })
});

var _default = _objectSpread(_objectSpread({}, _basic["default"]), {}, {
  types: types,
  widgets: widgets,
  settings: settings
});

exports["default"] = _default;