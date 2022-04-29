"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _default = function _default(_ref) {
  var config = _ref.config,
      valueSources = _ref.valueSources,
      valueSrc = _ref.valueSrc,
      title = _ref.title,
      setValueSrc = _ref.setValueSrc,
      readonly = _ref.readonly;

  var renderOptions = function renderOptions(valueSources) {
    return valueSources.map(function (_ref2) {
      var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
          srcKey = _ref3[0],
          info = _ref3[1];

      return /*#__PURE__*/_react["default"].createElement("option", {
        key: srcKey,
        value: srcKey
      }, info.label);
    });
  };

  var onChange = function onChange(e) {
    return setValueSrc(e.target.value);
  };

  return /*#__PURE__*/_react["default"].createElement("select", {
    onChange: onChange,
    value: valueSrc,
    disabled: readonly
  }, renderOptions(valueSources));
};

exports["default"] = _default;