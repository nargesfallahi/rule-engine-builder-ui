"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("bootstrap/dist/css/bootstrap.min.css");

var _BootstrapText = _interopRequireDefault(require("./value/BootstrapText"));

var _BootstrapTextArea = _interopRequireDefault(require("./value/BootstrapTextArea"));

var _BootstrapDate = _interopRequireDefault(require("./value/BootstrapDate"));

var _BootstrapDateTime = _interopRequireDefault(require("./value/BootstrapDateTime"));

var _BootstrapTime = _interopRequireDefault(require("./value/BootstrapTime"));

var _BootstrapSelect = _interopRequireDefault(require("./value/BootstrapSelect"));

var _BootstrapNumber = _interopRequireDefault(require("./value/BootstrapNumber"));

var _BootstrapSlider = _interopRequireDefault(require("./value/BootstrapSlider"));

var _BootstrapBoolean = _interopRequireDefault(require("./value/BootstrapBoolean"));

var _BootstrapMultiSelect = _interopRequireDefault(require("./value/BootstrapMultiSelect"));

var _BootstrapFieldSelect = _interopRequireDefault(require("./core/BootstrapFieldSelect"));

var _BootstrapButton = _interopRequireDefault(require("./core/BootstrapButton"));

var _BootstrapButtonGroup = _interopRequireDefault(require("./core/BootstrapButtonGroup"));

var _BootstrapConjs = _interopRequireDefault(require("./core/BootstrapConjs"));

var _BootstrapValueSources = _interopRequireDefault(require("./core/BootstrapValueSources"));

var _BootstrapConfirm = _interopRequireDefault(require("./core/BootstrapConfirm"));

//bootstrap css
// value widgets
// field select widgets
// core components
// provider
var BootstrapProvider = function BootstrapProvider(_ref) {
  var config = _ref.config,
      children = _ref.children;
  return children;
};

var _default = {
  BootstrapTextWidget: _BootstrapText["default"],
  BootstrapTextAreaWidget: _BootstrapTextArea["default"],
  BootstrapDateWidget: _BootstrapDate["default"],
  BootstrapDateTimeWidget: _BootstrapDateTime["default"],
  BootstrapTimeWidget: _BootstrapTime["default"],
  BootstrapSelectWidget: _BootstrapSelect["default"],
  BootstrapNumberWidget: _BootstrapNumber["default"],
  BootstrapSliderWidget: _BootstrapSlider["default"],
  BootstrapBooleanWidget: _BootstrapBoolean["default"],
  BootstrapMultiSelectWidget: _BootstrapMultiSelect["default"],
  BootstrapFieldSelect: _BootstrapFieldSelect["default"],
  BootstrapButton: _BootstrapButton["default"],
  BootstrapButtonGroup: _BootstrapButtonGroup["default"],
  BootstrapConjs: _BootstrapConjs["default"],
  BootstrapValueSources: _BootstrapValueSources["default"],
  BootstrapConfirm: _BootstrapConfirm["default"],
  BootstrapProvider: BootstrapProvider
};
exports["default"] = _default;