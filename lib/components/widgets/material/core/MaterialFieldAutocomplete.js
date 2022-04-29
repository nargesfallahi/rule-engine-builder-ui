"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _MaterialAutocomplete = _interopRequireDefault(require("../value/MaterialAutocomplete"));

var _excluded = ["items", "selectedKey", "setField"];

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var itemsToListValues = function itemsToListValues(items) {
  var level = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return items.map(function (item) {
    var items = item.items,
        path = item.path,
        label = item.label,
        disabled = item.disabled,
        grouplabel = item.grouplabel;
    var prefix = "\xA0\xA0".repeat(level);

    if (items) {
      return itemsToListValues(items, level + 1);
    } else {
      return {
        title: label,
        renderTitle: prefix + label,
        value: path,
        disabled: disabled,
        groupTitle: level > 0 ? prefix + grouplabel : null
      };
    }
  }).flat(Infinity);
};

var filterOptionsConfig = {
  stringify: function stringify(option) {
    var keysForFilter = ["title", "value", "grouplabel", "label"];
    var valueForFilter = keysForFilter.map(function (k) {
      return typeof option[k] == "string" ? option[k] : "";
    }).join("\0");
    return valueForFilter;
  }
};

var fieldAdapter = function fieldAdapter(_ref) {
  var items = _ref.items,
      selectedKey = _ref.selectedKey,
      setField = _ref.setField,
      rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);
  var listValues = itemsToListValues(items);

  var groupBy = function groupBy(option) {
    return option.groupTitle;
  };

  var value = selectedKey;

  var setValue = function setValue(value, _asyncValues) {
    if (!value) return undefined;
    return setField(value);
  };

  return _objectSpread(_objectSpread({}, rest), {}, {
    listValues: listValues,
    setValue: setValue,
    groupBy: groupBy,
    filterOptionsConfig: filterOptionsConfig,
    allowCustomValues: false,
    multiple: false,
    value: value
  });
};

var _default = function _default(props) {
  return /*#__PURE__*/_react["default"].createElement(_MaterialAutocomplete["default"], fieldAdapter(props));
};

exports["default"] = _default;