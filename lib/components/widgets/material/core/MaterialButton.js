"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Delete = _interopRequireDefault(require("@material-ui/icons/Delete"));

var _Add = _interopRequireDefault(require("@material-ui/icons/Add"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _default = function _default(_ref) {
  var type = _ref.type,
      label = _ref.label,
      onClick = _ref.onClick,
      readonly = _ref.readonly,
      config = _ref.config;
  var typeToOnlyIcon = {
    "delGroup": /*#__PURE__*/_react["default"].createElement(_Delete["default"], null),
    "delRuleGroup": /*#__PURE__*/_react["default"].createElement(_Delete["default"], null),
    "delRule": /*#__PURE__*/_react["default"].createElement(_Delete["default"], null),
    "addRuleGroup": /*#__PURE__*/_react["default"].createElement(_Add["default"], null)
  };
  var typeToIcon = {
    "addRule": /*#__PURE__*/_react["default"].createElement(_Add["default"], null),
    "addGroup": /*#__PURE__*/_react["default"].createElement(_Add["default"], null),
    "addRuleGroupExt": /*#__PURE__*/_react["default"].createElement(_Add["default"], null)
  };
  var typeToColor = {
    "addRule": "default",
    "addGroup": "primary",
    "delGroup": "secondary",
    "delRuleGroup": "secondary",
    "delRule": "secondary"
  };
  if (typeToOnlyIcon[type]) return /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    size: "small",
    disabled: readonly,
    onClick: onClick,
    color: typeToColor[type]
  }, typeToOnlyIcon[type]);else return /*#__PURE__*/_react["default"].createElement(_Button["default"], {
    size: "small",
    disabled: readonly,
    onClick: onClick,
    color: typeToColor[type],
    startIcon: typeToIcon[type]
  }, label);
};

exports["default"] = _default;