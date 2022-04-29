"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactstrap = require("reactstrap");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _default = function _default(_ref) {
  var type = _ref.type,
      label = _ref.label,
      onClick = _ref.onClick,
      config = _ref.config;
  var typeToOnlyIcon = {
    delGroup: _freeSolidSvgIcons.faTrashAlt,
    delRuleGroup: _freeSolidSvgIcons.faTrashAlt,
    delRule: _freeSolidSvgIcons.faTrashAlt,
    addRuleGroup: _freeSolidSvgIcons.faPlus,
    addRuleGroupExt: _freeSolidSvgIcons.faPlus
  };
  var typeToIcon = {
    addRule: _freeSolidSvgIcons.faPlus,
    addGroup: _freeSolidSvgIcons.faPlus
  };
  var typeToColor = {
    addRule: "primary",
    addGroup: "primary",
    delGroup: "danger",
    delRuleGroup: "danger",
    delRule: "danger"
  };
  var isOnlyIcon = typeToOnlyIcon[type];
  return /*#__PURE__*/_react["default"].createElement(_reactstrap.Button, {
    size: "sm",
    color: typeToColor[type],
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: isOnlyIcon ? typeToOnlyIcon[type] : typeToIcon[type]
  }), " ", !isOnlyIcon && label);
};

exports["default"] = _default;