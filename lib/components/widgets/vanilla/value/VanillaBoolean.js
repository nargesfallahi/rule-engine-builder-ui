"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _uuid = _interopRequireDefault(require("../../../../utils/uuid"));

var _default = function _default(props) {
  var value = props.value,
      setValue = props.setValue,
      config = props.config,
      labelYes = props.labelYes,
      labelNo = props.labelNo,
      readonly = props.readonly,
      _props$customProps = props.customProps,
      customProps = _props$customProps === void 0 ? {} : _props$customProps;
  var customRadioYesProps = customProps.radioYes || {};
  var customRadioNoProps = customProps.radioNo || {};

  var onCheckboxChange = function onCheckboxChange(e) {
    return setValue(e.target.checked);
  };

  var onRadioChange = function onRadioChange(e) {
    return setValue(e.target.value == "true");
  };

  var id = (0, _uuid["default"])(),
      id2 = (0, _uuid["default"])(); // return <>
  //     <input key={id}  type="checkbox" id={id} checked={!!value} disabled={readonly} onChange={onCheckboxChange} />
  //     <label style={{display: "inline"}} key={id+"label"}  htmlFor={id}>{value ? labelYes : labelNo}</label>
  // </>;

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
    key: id,
    type: "radio",
    id: id,
    value: true,
    checked: !!value,
    disabled: readonly,
    onChange: onRadioChange
  }, customRadioYesProps)), /*#__PURE__*/_react["default"].createElement("label", {
    style: {
      display: "inline"
    },
    key: id + "label",
    htmlFor: id
  }, labelYes), /*#__PURE__*/_react["default"].createElement("input", (0, _extends2["default"])({
    key: id2,
    type: "radio",
    id: id2,
    value: false,
    checked: !value,
    disabled: readonly,
    onChange: onRadioChange
  }, customRadioNoProps)), /*#__PURE__*/_react["default"].createElement("label", {
    style: {
      display: "inline"
    },
    key: id2 + "label",
    htmlFor: id2
  }, labelNo));
};

exports["default"] = _default;