"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _antd = require("antd");

var _icons = require("@ant-design/icons");

var _default = function _default(_ref) {
  var type = _ref.type,
      onClick = _ref.onClick,
      label = _ref.label,
      readonly = _ref.readonly,
      settings = _ref.config.settings;
  var typeToIcon = {
    "addRule": /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null),
    "addGroup": /*#__PURE__*/_react["default"].createElement(_icons.PlusCircleOutlined, null),
    "delRule": /*#__PURE__*/_react["default"].createElement(_icons.DeleteFilled, null),
    //?
    "delGroup": /*#__PURE__*/_react["default"].createElement(_icons.DeleteFilled, null),
    "delRuleGroup": /*#__PURE__*/_react["default"].createElement(_icons.DeleteFilled, null),
    "addRuleGroup": /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null)
  };
  var typeToClass = {
    "addRule": "action action--ADD-RULE",
    "addGroup": "action action--ADD-GROUP",
    "delRule": "action action--DELETE",
    //?
    "delGroup": "action action--DELETE",
    "delRuleGroup": "action action--DELETE",
    "addRuleGroup": /*#__PURE__*/_react["default"].createElement(_icons.PlusOutlined, null)
  };
  var typeToType = {
    "delRule": "danger",
    "delGroup": "danger",
    "delRuleGroup": "danger"
  };
  var renderSize = settings.renderSize;
  var btnLabel = type == "addRuleGroup" ? "" : label;
  return /*#__PURE__*/_react["default"].createElement(_antd.Button, {
    key: type,
    type: typeToType[type] || "default",
    icon: typeToIcon[type],
    className: typeToClass[type],
    onClick: onClick,
    size: renderSize,
    disabled: readonly
  }, btnLabel);
};

exports["default"] = _default;