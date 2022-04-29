"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _Switch = _interopRequireDefault(require("@material-ui/core/Switch"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Grid = _interopRequireDefault(require("@material-ui/core/Grid"));

var _Typography = _interopRequireDefault(require("@material-ui/core/Typography"));

var _default = function _default(props) {
  var customProps = props.customProps,
      value = props.value,
      setValue = props.setValue,
      labelYes = props.labelYes,
      labelNo = props.labelNo,
      readonly = props.readonly;

  var onChange = function onChange() {
    setValue(!value);
  };

  return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement(_Typography["default"], {
    component: "div"
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    component: "label",
    container: true,
    alignItems: "center",
    spacing: 0
  }, /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    component: "span"
  }, labelNo), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    component: "span"
  }, /*#__PURE__*/_react["default"].createElement(_Switch["default"], (0, _extends2["default"])({
    checked: !!value,
    onChange: onChange,
    disabled: readonly
  }, customProps))), /*#__PURE__*/_react["default"].createElement(_Grid["default"], {
    item: true,
    component: "span"
  }, labelYes))));
};

exports["default"] = _default;