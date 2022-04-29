"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Switch = _interopRequireDefault(require("@material-ui/core/Switch"));

var _FormControlLabel = _interopRequireDefault(require("@material-ui/core/FormControlLabel"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _Button = _interopRequireDefault(require("@material-ui/core/Button"));

var _LockOpen = _interopRequireDefault(require("@material-ui/icons/LockOpen"));

var _Lock = _interopRequireDefault(require("@material-ui/icons/Lock"));

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

  var onChange = function onChange(e) {
    return setValue(e.target.checked);
  };

  var onClick = function onClick() {
    return setValue(!value);
  };

  var postfix = type;
  var showLabel = value ? checkedLabel || label : label;
  var icon = value ? /*#__PURE__*/_react["default"].createElement(_Lock["default"], null) : /*#__PURE__*/_react["default"].createElement(_LockOpen["default"], null);

  if (type == "lock") {
    if (hideLabel) {
      return /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
        key: id + postfix,
        onClick: onClick,
        size: "small"
      }, icon);
    } else {
      return /*#__PURE__*/_react["default"].createElement(_Button["default"], {
        key: id + postfix,
        onClick: onClick,
        size: "small",
        startIcon: icon
      }, showLabel);
    }
  }

  return /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
    control: /*#__PURE__*/_react["default"].createElement(_Switch["default"], {
      checked: !!value,
      size: "small",
      onChange: onChange
    }),
    label: showLabel
  });
};

exports["default"] = _default;