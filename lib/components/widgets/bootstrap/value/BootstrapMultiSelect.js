"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactstrap = require("reactstrap");

var _stuff = require("../../../../utils/stuff");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _default = function _default(_ref) {
  var listValues = _ref.listValues,
      value = _ref.value,
      setValue = _ref.setValue,
      allowCustomValues = _ref.allowCustomValues,
      placeholder = _ref.placeholder,
      readonly = _ref.readonly;

  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      isOpen = _useState2[0],
      setIsOpen = _useState2[1];

  var _useState3 = (0, _react.useState)(value !== null && value !== void 0 ? value : []),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      selectedValues = _useState4[0],
      setSelectedValues = _useState4[1];

  var onChange = function onChange(e) {
    var value = getMultiSelectValues(e.target.value, listValues);
    if (value.length == 0) value = undefined;
    setValue(value);
  };

  var renderOptions = function renderOptions() {
    return (0, _stuff.mapListValues)(listValues, function (_ref2) {
      var title = _ref2.title,
          value = _ref2.value;
      return /*#__PURE__*/_react["default"].createElement(_reactstrap.DropdownItem, {
        key: value,
        onClick: onChange,
        value: value,
        active: selectedValues.some(function (x) {
          return x === value;
        })
      }, title);
    });
  };

  var stylesDropdownWrapper = {
    lineHeight: "105%",
    minHeight: "1.7rem",
    paddingBottom: "0.45rem"
  };
  var stylesDropdownMenuWrapper = {//minWidth: "100%"
  };

  var renderValue = function renderValue(selectedValues) {
    if (!readonly && !selectedValues.length) return placeholder;
    var selectedTitles = (0, _stuff.mapListValues)(listValues, function (_ref3) {
      var title = _ref3.title,
          value = _ref3.value;
      return selectedValues.indexOf(value) > -1 ? title : null;
    }).filter(function (v) {
      return v !== null;
    });
    return selectedTitles.join(", ");
  };

  var getMultiSelectValues = function getMultiSelectValues(value, options) {
    if (!value) return selectedValues;
    var isNewSelection = !selectedValues.includes(value);
    var newSelectedValues = [];

    if (isNewSelection) {
      newSelectedValues = [].concat((0, _toConsumableArray2["default"])(selectedValues), [value]);
      setSelectedValues(newSelectedValues);
    } else {
      newSelectedValues = selectedValues.filter(function (x) {
        return x !== value;
      });
      setSelectedValues(newSelectedValues);
    }

    return newSelectedValues;
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
  }, selectedValues.length ? renderValue(selectedValues) : /*#__PURE__*/_react["default"].createElement("span", null, "\xA0")), /*#__PURE__*/_react["default"].createElement(_reactstrap.DropdownMenu, {
    container: "body",
    style: stylesDropdownMenuWrapper
  }, renderOptions()));
};

exports["default"] = _default;