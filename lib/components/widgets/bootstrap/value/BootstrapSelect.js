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

var _stuff = require("../../../../utils/stuff");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(_ref) {
  var listValues = _ref.listValues,
      selectedValue = _ref.value,
      setValue = _ref.setValue,
      allowCustomValues = _ref.allowCustomValues,
      readonly = _ref.readonly,
      placeholder = _ref.placeholder;

  var onChange = function onChange(e) {
    if (e.target.value === undefined) return;
    setValue(e.target.value);
  };

  var renderOptions = function renderOptions() {
    return (0, _stuff.mapListValues)(listValues, function (_ref2) {
      var title = _ref2.title,
          value = _ref2.value;
      return /*#__PURE__*/_react["default"].createElement(_reactstrap.DropdownItem, {
        key: value,
        onClick: onChange,
        value: value,
        active: selectedValue == value
      }, title);
    });
  };

  var renderValue = function renderValue(selectedValue) {
    if (!readonly && selectedValue == null) return placeholder;
    return getListValueTitle(selectedValue);
  };

  var getListValueTitle = function getListValueTitle(selectedValue) {
    return (0, _stuff.mapListValues)(listValues, function (_ref3) {
      var title = _ref3.title,
          value = _ref3.value;
      return value === selectedValue ? title : null;
    }).filter(function (v) {
      return v !== null;
    }).shift();
  };

  var hasValue = selectedValue != null;

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
    tag: "button",
    className: "form-select",
    style: stylesDropdownWrapper,
    color: "transparent"
  }, hasValue ? renderValue(selectedValue) : /*#__PURE__*/_react["default"].createElement("span", null, "\xA0")), /*#__PURE__*/_react["default"].createElement(_reactstrap.DropdownMenu, {
    container: "body",
    style: stylesDropdownMenuWrapper
  }, !hasValue && /*#__PURE__*/_react["default"].createElement(_reactstrap.DropdownItem, {
    disabled: true,
    value: ""
  }), renderOptions()));
};

exports["default"] = _default;