"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _stuff = require("../../../../utils/stuff");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _default = function _default(_ref) {
  var listValues = _ref.listValues,
      value = _ref.value,
      setValue = _ref.setValue,
      allowCustomValues = _ref.allowCustomValues,
      readonly = _ref.readonly,
      customProps = _ref.customProps;

  var renderOptions = function renderOptions() {
    return (0, _stuff.mapListValues)(listValues, function (_ref2) {
      var title = _ref2.title,
          value = _ref2.value;
      return /*#__PURE__*/_react["default"].createElement("option", {
        key: value,
        value: value
      }, title);
    });
  };

  var onChange = function onChange(e) {
    return setValue(e.target.value);
  };

  var hasValue = value != null;
  return /*#__PURE__*/_react["default"].createElement("select", (0, _extends2["default"])({
    onChange: onChange,
    value: hasValue ? value : "",
    disabled: readonly
  }, (0, _omit["default"])(customProps, ["showSearch", "input"])), !hasValue && /*#__PURE__*/_react["default"].createElement("option", {
    disabled: true,
    value: ""
  }), renderOptions());
};

exports["default"] = _default;