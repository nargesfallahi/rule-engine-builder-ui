"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _en_US = _interopRequireDefault(require("antd/lib/locale-provider/en_US"));

var _antd = _interopRequireDefault(require("../../components/widgets/antd"));

var _basic = _interopRequireWildcard(require("../basic"));

var _stuff = require("../../utils/stuff");

var _export = require("../../utils/export");

var _react = _interopRequireDefault(require("react"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var FieldSelect = _antd["default"].FieldSelect,
    FieldDropdown = _antd["default"].FieldDropdown,
    FieldCascader = _antd["default"].FieldCascader,
    FieldTreeSelect = _antd["default"].FieldTreeSelect,
    Button = _antd["default"].Button,
    ButtonGroup = _antd["default"].ButtonGroup,
    Conjs = _antd["default"].Conjs,
    Switch = _antd["default"].Switch,
    ValueSources = _antd["default"].ValueSources,
    Provider = _antd["default"].Provider,
    confirm = _antd["default"].confirm;
var TextWidget = _antd["default"].TextWidget,
    TextAreaWidget = _antd["default"].TextAreaWidget,
    NumberWidget = _antd["default"].NumberWidget,
    SliderWidget = _antd["default"].SliderWidget,
    RangeWidget = _antd["default"].RangeWidget,
    SelectWidget = _antd["default"].SelectWidget,
    MultiSelectWidget = _antd["default"].MultiSelectWidget,
    AutocompleteWidget = _antd["default"].AutocompleteWidget,
    TreeSelectWidget = _antd["default"].TreeSelectWidget,
    DateWidget = _antd["default"].DateWidget,
    BooleanWidget = _antd["default"].BooleanWidget,
    TimeWidget = _antd["default"].TimeWidget,
    DateTimeWidget = _antd["default"].DateTimeWidget;

var settings = _objectSpread(_objectSpread({}, _basic["default"].settings), {}, {
  renderField: function renderField(props) {
    return /*#__PURE__*/_react["default"].createElement(FieldSelect, props);
  },
  // renderField: (props) => <FieldDropdown {...props} />,
  // renderField: (props) => <FieldCascader {...props} />,
  // renderField: (props) => <FieldTreeSelect {...props} />,
  renderOperator: function renderOperator(props) {
    return /*#__PURE__*/_react["default"].createElement(FieldSelect, props);
  },
  // renderOperator: (props) => <FieldDropdown {...props} />,
  renderFunc: function renderFunc(props) {
    return /*#__PURE__*/_react["default"].createElement(FieldSelect, props);
  },
  renderConjs: function renderConjs(props) {
    return /*#__PURE__*/_react["default"].createElement(Conjs, props);
  },
  renderSwitch: function renderSwitch(props) {
    return /*#__PURE__*/_react["default"].createElement(Switch, props);
  },
  renderButton: function renderButton(props) {
    return /*#__PURE__*/_react["default"].createElement(Button, props);
  },
  renderButtonGroup: function renderButtonGroup(props) {
    return /*#__PURE__*/_react["default"].createElement(ButtonGroup, props);
  },
  renderValueSources: function renderValueSources(props) {
    return /*#__PURE__*/_react["default"].createElement(ValueSources, props);
  },
  renderProvider: function renderProvider(props) {
    return /*#__PURE__*/_react["default"].createElement(Provider, props);
  },
  renderConfirm: confirm,
  // localization
  locale: _objectSpread(_objectSpread({}, _basic["default"].settings.locale), {}, {
    antd: _en_US["default"]
  })
});

var widgets = _objectSpread(_objectSpread({}, _basic["default"].widgets), {}, {
  text: _objectSpread(_objectSpread({}, _basic["default"].widgets.text), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(TextWidget, props);
    }
  }),
  textarea: _objectSpread(_objectSpread({}, _basic["default"].widgets.textarea), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(TextAreaWidget, props);
    }
  }),
  number: _objectSpread(_objectSpread({}, _basic["default"].widgets.number), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(NumberWidget, props);
    }
  }),
  multiselect: _objectSpread(_objectSpread({}, _basic["default"].widgets.multiselect), {}, {
    factory: function factory(props) {
      return props.asyncFetch || props.showSearch ? /*#__PURE__*/_react["default"].createElement(AutocompleteWidget, (0, _extends2["default"])({
        multiple: true
      }, props)) : /*#__PURE__*/_react["default"].createElement(MultiSelectWidget, props);
    }
  }),
  select: _objectSpread(_objectSpread({}, _basic["default"].widgets.select), {}, {
    factory: function factory(props) {
      return props.asyncFetch || props.showSearch ? /*#__PURE__*/_react["default"].createElement(AutocompleteWidget, props) : /*#__PURE__*/_react["default"].createElement(SelectWidget, props);
    }
  }),
  slider: _objectSpread(_objectSpread({}, _basic["default"].widgets.slider), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(SliderWidget, props);
    }
  }),
  "boolean": _objectSpread(_objectSpread({}, _basic["default"].widgets["boolean"]), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BooleanWidget, props);
    }
  }),
  date: _objectSpread(_objectSpread({}, _basic["default"].widgets.date), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(DateWidget, props);
    }
  }),
  time: _objectSpread(_objectSpread({}, _basic["default"].widgets.time), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(TimeWidget, props);
    }
  }),
  datetime: _objectSpread(_objectSpread({}, _basic["default"].widgets.datetime), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(DateTimeWidget, props);
    }
  }),
  rangeslider: {
    type: "number",
    jsType: "number",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(RangeWidget, props);
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
    spelFormatValue: function spelFormatValue(val) {
      return (0, _export.spelEscape)(val);
    },
    singleWidget: "slider",
    toJS: function toJS(val, fieldSettings) {
      return val;
    }
  },
  treeselect: {
    type: "treeselect",
    jsType: "string",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(TreeSelectWidget, props);
    },
    valueLabel: "Value",
    valuePlaceholder: "Select value",
    formatValue: function formatValue(val, fieldDef, wgtDef, isForDisplay) {
      var valLabel = (0, _stuff.getTitleInListValues)(fieldDef.fieldSettings.listValues || fieldDef.asyncListValues, val);
      return isForDisplay ? (0, _basic.stringifyForDisplay)(valLabel) : JSON.stringify(val);
    },
    sqlFormatValue: function sqlFormatValue(val, fieldDef, wgtDef, op, opDef) {
      return _export.SqlString.escape(val);
    },
    spelFormatValue: function spelFormatValue(val) {
      return (0, _export.spelEscape)(val);
    },
    toJS: function toJS(val, fieldSettings) {
      return val;
    }
  },
  treemultiselect: {
    type: "treemultiselect",
    jsType: "array",
    valueSrc: "value",
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(TreeSelectWidget, (0, _extends2["default"])({}, props, {
        treeMultiple: true
      }));
    },
    valueLabel: "Values",
    valuePlaceholder: "Select values",
    formatValue: function formatValue(vals, fieldDef, wgtDef, isForDisplay) {
      var valsLabels = vals.map(function (v) {
        return (0, _stuff.getTitleInListValues)(fieldDef.fieldSettings.listValues || fieldDef.asyncListValues, v);
      });
      return isForDisplay ? valsLabels.map(_basic.stringifyForDisplay) : vals.map(JSON.stringify);
    },
    sqlFormatValue: function sqlFormatValue(vals, fieldDef, wgtDef, op, opDef) {
      return vals.map(function (v) {
        return _export.SqlString.escape(v);
      });
    },
    spelFormatValue: function spelFormatValue(val) {
      return (0, _export.spelEscape)(val);
    },
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
        operators: ["between", "not_between", "is_null", "is_not_null"]
      }
    })
  }),
  date: _objectSpread(_objectSpread({}, _basic["default"].types.date), {}, {
    widgets: {
      date: _objectSpread(_objectSpread({}, _basic["default"].types.date.widgets.date), {}, {
        opProps: {
          between: {
            isSpecialRange: true,
            textSeparators: [null, null]
          },
          not_between: {
            isSpecialRange: true,
            textSeparators: [null, null]
          }
        }
      })
    }
  }),
  treeselect: {
    mainWidget: "treeselect",
    defaultOperator: "select_equals",
    widgets: {
      treeselect: {
        operators: ["select_equals", "select_not_equals"]
      },
      treemultiselect: {
        operators: ["select_any_in", "select_not_any_in"]
      }
    }
  },
  treemultiselect: {
    defaultOperator: "multiselect_equals",
    widgets: {
      treemultiselect: {
        operators: ["multiselect_equals", "multiselect_not_equals"]
      }
    }
  }
});

var _default = _objectSpread(_objectSpread({}, _basic["default"]), {}, {
  types: types,
  widgets: widgets,
  settings: settings
});

exports["default"] = _default;