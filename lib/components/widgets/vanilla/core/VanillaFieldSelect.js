"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _default = function _default(_ref) {
  var items = _ref.items,
      setField = _ref.setField,
      selectedKey = _ref.selectedKey,
      readonly = _ref.readonly;

  var renderOptions = function renderOptions(fields) {
    return fields.map(function (field) {
      var items = field.items,
          path = field.path,
          label = field.label,
          disabled = field.disabled;

      if (items) {
        return /*#__PURE__*/_react["default"].createElement("optgroup", {
          disabled: disabled,
          key: path,
          label: label
        }, renderOptions(items));
      } else {
        return /*#__PURE__*/_react["default"].createElement("option", {
          disabled: disabled,
          key: path,
          value: path
        }, label);
      }
    });
  };

  var onChange = function onChange(e) {
    return setField(e.target.value);
  };

  var hasValue = selectedKey != null;
  return /*#__PURE__*/_react["default"].createElement("select", {
    onChange: onChange,
    value: hasValue ? selectedKey : "",
    disabled: readonly
  }, !hasValue && /*#__PURE__*/_react["default"].createElement("option", {
    disabled: true,
    value: ""
  }), renderOptions(items));
};

exports["default"] = _default;