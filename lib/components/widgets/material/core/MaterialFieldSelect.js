"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _MenuItem = _interopRequireDefault(require("@material-ui/core/MenuItem"));

var _ListSubheader = _interopRequireDefault(require("@material-ui/core/ListSubheader"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _default = function _default(_ref) {
  var items = _ref.items,
      setField = _ref.setField,
      selectedKey = _ref.selectedKey,
      readonly = _ref.readonly,
      placeholder = _ref.placeholder;

  var renderOptions = function renderOptions(fields) {
    var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return fields.map(function (field) {
      var items = field.items,
          path = field.path,
          label = field.label,
          disabled = field.disabled;
      var prefix = "\xA0\xA0".repeat(level);

      if (items) {
        return [/*#__PURE__*/_react["default"].createElement(_ListSubheader["default"], {
          disabled: disabled,
          key: path,
          disableSticky: true
        }, prefix && /*#__PURE__*/_react["default"].createElement("span", null, prefix), label), renderOptions(items, level + 1)];
      } else {
        return /*#__PURE__*/_react["default"].createElement(_MenuItem["default"], {
          disabled: disabled,
          key: path,
          value: path
        }, prefix && /*#__PURE__*/_react["default"].createElement("span", null, prefix), label);
      }
    });
  };

  var onChange = function onChange(e) {
    if (e.target.value === undefined) return;
    setField(e.target.value);
  };

  var renderValue = function renderValue(selectedValue) {
    if (!readonly && !selectedValue) return placeholder;

    var findLabel = function findLabel(fields) {
      return fields.map(function (field) {
        if (!field.items) return field.path === selectedValue ? field.label : null;
        return findLabel(field.items);
      });
    };

    return findLabel(items).filter(function (v) {
      if (Array.isArray(v)) {
        return v.some(function (value) {
          return value !== null;
        });
      } else {
        return v !== null;
      }
    }).pop();
  };

  var hasValue = selectedKey != null;
  return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], null, /*#__PURE__*/_react["default"].createElement(_Select["default"], {
    autoWidth: true,
    displayEmpty: true,
    label: placeholder,
    onChange: onChange,
    value: hasValue ? selectedKey : "",
    disabled: readonly,
    renderValue: renderValue
  }, renderOptions(items)));
};

exports["default"] = _default;