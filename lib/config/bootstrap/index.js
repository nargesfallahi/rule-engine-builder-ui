"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _bootstrap = _interopRequireDefault(require("../../components/widgets/bootstrap"));

var _basic = _interopRequireDefault(require("../basic"));

var _react = _interopRequireDefault(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var BootstrapBooleanWidget = _bootstrap["default"].BootstrapBooleanWidget,
    BootstrapTextWidget = _bootstrap["default"].BootstrapTextWidget,
    BootstrapTextAreaWidget = _bootstrap["default"].BootstrapTextAreaWidget,
    BootstrapDateWidget = _bootstrap["default"].BootstrapDateWidget,
    BootstrapTimeWidget = _bootstrap["default"].BootstrapTimeWidget,
    BootstrapDateTimeWidget = _bootstrap["default"].BootstrapDateTimeWidget,
    BootstrapMultiSelectWidget = _bootstrap["default"].BootstrapMultiSelectWidget,
    BootstrapSelectWidget = _bootstrap["default"].BootstrapSelectWidget,
    BootstrapNumberWidget = _bootstrap["default"].BootstrapNumberWidget,
    BootstrapSliderWidget = _bootstrap["default"].BootstrapSliderWidget,
    BootstrapFieldSelect = _bootstrap["default"].BootstrapFieldSelect,
    BootstrapConjs = _bootstrap["default"].BootstrapConjs,
    BootstrapButton = _bootstrap["default"].BootstrapButton,
    BootstrapButtonGroup = _bootstrap["default"].BootstrapButtonGroup,
    BootstrapValueSources = _bootstrap["default"].BootstrapValueSources,
    BootstrapProvider = _bootstrap["default"].BootstrapProvider,
    BootstrapConfirm = _bootstrap["default"].BootstrapConfirm;

var settings = _objectSpread(_objectSpread({}, _basic["default"].settings), {}, {
  renderField: function renderField(props) {
    return /*#__PURE__*/_react["default"].createElement(BootstrapFieldSelect, props);
  },
  renderOperator: function renderOperator(props) {
    return /*#__PURE__*/_react["default"].createElement(BootstrapFieldSelect, props);
  },
  renderFunc: function renderFunc(props) {
    return /*#__PURE__*/_react["default"].createElement(BootstrapFieldSelect, props);
  },
  renderConjs: function renderConjs(props) {
    return /*#__PURE__*/_react["default"].createElement(BootstrapConjs, props);
  },
  renderButton: function renderButton(props) {
    return /*#__PURE__*/_react["default"].createElement(BootstrapButton, props);
  },
  renderButtonGroup: function renderButtonGroup(props) {
    return /*#__PURE__*/_react["default"].createElement(BootstrapButtonGroup, props);
  },
  renderValueSources: function renderValueSources(props) {
    return /*#__PURE__*/_react["default"].createElement(BootstrapValueSources, props);
  },
  renderProvider: function renderProvider(props) {
    return /*#__PURE__*/_react["default"].createElement(BootstrapProvider, props);
  },
  renderConfirm: BootstrapConfirm
});

var widgets = _objectSpread(_objectSpread({}, _basic["default"].widgets), {}, {
  text: _objectSpread(_objectSpread({}, _basic["default"].widgets.text), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapTextWidget, props);
    }
  }),
  textarea: _objectSpread(_objectSpread({}, _basic["default"].widgets.textarea), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapTextAreaWidget, props);
    }
  }),
  number: _objectSpread(_objectSpread({}, _basic["default"].widgets.number), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapNumberWidget, props);
    }
  }),
  multiselect: _objectSpread(_objectSpread({}, _basic["default"].widgets.multiselect), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapMultiSelectWidget, props);
    }
  }),
  select: _objectSpread(_objectSpread({}, _basic["default"].widgets.select), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapSelectWidget, props);
    }
  }),
  slider: _objectSpread(_objectSpread({}, _basic["default"].widgets.slider), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapSliderWidget, props);
    }
  }),
  "boolean": _objectSpread(_objectSpread({}, _basic["default"].widgets["boolean"]), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapBooleanWidget, props);
    }
  }),
  date: _objectSpread(_objectSpread({}, _basic["default"].widgets.date), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapDateWidget, props);
    }
  }),
  time: _objectSpread(_objectSpread({}, _basic["default"].widgets.time), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapTimeWidget, props);
    }
  }),
  datetime: _objectSpread(_objectSpread({}, _basic["default"].widgets.datetime), {}, {
    factory: function factory(props) {
      return /*#__PURE__*/_react["default"].createElement(BootstrapDateTimeWidget, props);
    }
  })
});

var types = _objectSpread({}, _basic["default"].types);

var _default = _objectSpread(_objectSpread({}, _basic["default"]), {}, {
  types: types,
  widgets: widgets,
  settings: settings
});

exports["default"] = _default;