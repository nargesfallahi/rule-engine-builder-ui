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
  var value = _ref.value,
      setValue = _ref.setValue,
      label = _ref.label,
      checkedLabel = _ref.checkedLabel,
      hideLabel = _ref.hideLabel,
      id = _ref.id,
      config = _ref.config,
      type = _ref.type;
  var renderSize = config.settings.renderSize;

  var onSwitch = function onSwitch(switchValue) {
    return setValue(switchValue);
  };

  var onClick = function onClick() {
    return setValue(!value);
  };

  var postfix = type;
  var showLabel = hideLabel ? null : value ? checkedLabel || label : label;

  if (type == "lock") {
    return /*#__PURE__*/_react["default"].createElement(_antd.Button, {
      key: id + postfix,
      type: value ? "danger" : undefined,
      icon: value ? /*#__PURE__*/_react["default"].createElement(_icons.LockFilled, null) : /*#__PURE__*/_react["default"].createElement(_icons.UnlockOutlined, null),
      onClick: onClick,
      checked: !!value,
      size: renderSize
    }, showLabel);
  }

  return /*#__PURE__*/_react["default"].createElement(_antd.Switch, {
    key: id + postfix,
    checkedChildren: checkedLabel || label,
    unCheckedChildren: value ? checkedLabel || label : label,
    onChange: onSwitch,
    checked: !!value,
    size: renderSize
  });
};

exports["default"] = _default;