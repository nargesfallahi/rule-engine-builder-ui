"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _freeSolidSvgIcons = require("@fortawesome/free-solid-svg-icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(_ref) {
  var config = _ref.config,
      valueSources = _ref.valueSources,
      valueSrc = _ref.valueSrc,
      title = _ref.title,
      setValueSrc = _ref.setValueSrc,
      readonly = _ref.readonly;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var stylesDropdownWrapper = {
    lineHeight: "105%",
    minHeight: "1.7rem",
    paddingBottom: "0.45rem"
  };
  var stylesDropdownMenuWrapper = {//minWidth: "100%"
  };

  var onChange = function onChange(e) {
    if (e.target.value === undefined) return;
    setValueSrc(e.target.value);
  };

  var getValueSrcLabel = function getValueSrcLabel(valueSrc) {
    var valueSrcInfo = valueSources.filter(function (_ref2) {
      var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
          srcKey = _ref3[0],
          _info = _ref3[1];

      return srcKey == valueSrc;
    }).map(function (_ref4) {
      var _ref5 = (0, _slicedToArray2["default"])(_ref4, 2),
          _srcKey = _ref5[0],
          info = _ref5[1];

      return info;
    }).shift();
    return (valueSrcInfo === null || valueSrcInfo === void 0 ? void 0 : valueSrcInfo.label) || valueSrc;
  };

  var renderOptions = function renderOptions(valueSources) {
    return valueSources.map(function (_ref6) {
      var _ref7 = (0, _slicedToArray2["default"])(_ref6, 2),
          srcKey = _ref7[0],
          info = _ref7[1];

      return /*#__PURE__*/_react["default"].createElement(_reactstrap.DropdownItem, {
        key: srcKey,
        onClick: onChange,
        value: srcKey,
        active: valueSrc == srcKey
      }, info.label || srcKey);
    });
  };

  return /*#__PURE__*/_react["default"].createElement(_reactstrap.Dropdown, {
    isOpen: isOpen,
    onClick: function onClick() {
      return !isOpen ? setIsOpen(true) : setIsOpen(false);
    },
    disabled: readonly,
    toggle: function toggle() {
      return setIsOpen(!isOpen);
    }
  }, /*#__PURE__*/_react["default"].createElement(_reactstrap.DropdownToggle, {
    tag: "span",
    className: "btn",
    style: stylesDropdownWrapper,
    color: "transparent"
  }, /*#__PURE__*/_react["default"].createElement(_reactFontawesome.FontAwesomeIcon, {
    icon: _freeSolidSvgIcons.faEllipsisV
  })), /*#__PURE__*/_react["default"].createElement(_reactstrap.DropdownMenu, {
    container: "body",
    style: stylesDropdownMenuWrapper
  }, renderOptions(valueSources)));
};

exports["default"] = _default;