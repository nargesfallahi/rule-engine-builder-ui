"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _uuid = _interopRequireDefault(require("../../../../utils/uuid"));

var _reactstrap = require("reactstrap");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

var _default = function _default(props) {
  var value = props.value,
      setValue = props.setValue,
      config = props.config,
      labelYes = props.labelYes,
      labelNo = props.labelNo,
      readonly = props.readonly;

  var onRadioChange = function onRadioChange(e) {
    return setValue(e.target.value == "true");
  };

  var id = (0, _uuid["default"])(),
      id2 = (0, _uuid["default"])();
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_reactstrap.ButtonGroup, null, /*#__PURE__*/_react["default"].createElement(_reactstrap.Button, {
    id: id,
    value: true,
    checked: !!value,
    disabled: readonly,
    color: value === true ? "success" : "secondary",
    onClick: onRadioChange,
    size: "sm"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faCheck
  })), /*#__PURE__*/_react["default"].createElement(_reactstrap.Button, {
    id: id2,
    value: false,
    checked: !value,
    disabled: readonly,
    color: value === false ? "danger" : "secondary",
    onClick: onRadioChange,
    size: "sm"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faTimes
  }))));
};

exports["default"] = _default;