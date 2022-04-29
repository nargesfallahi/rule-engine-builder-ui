"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "VanillaBooleanWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaBoolean["default"];
  }
});
Object.defineProperty(exports, "VanillaButton", {
  enumerable: true,
  get: function get() {
    return _VanillaButton["default"];
  }
});
Object.defineProperty(exports, "VanillaButtonGroup", {
  enumerable: true,
  get: function get() {
    return _VanillaButtonGroup["default"];
  }
});
Object.defineProperty(exports, "VanillaConjs", {
  enumerable: true,
  get: function get() {
    return _VanillaConjs["default"];
  }
});
Object.defineProperty(exports, "VanillaDateTimeWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaDateTime["default"];
  }
});
Object.defineProperty(exports, "VanillaDateWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaDate["default"];
  }
});
Object.defineProperty(exports, "VanillaFieldSelect", {
  enumerable: true,
  get: function get() {
    return _VanillaFieldSelect["default"];
  }
});
Object.defineProperty(exports, "VanillaMultiSelectWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaMultiSelect["default"];
  }
});
Object.defineProperty(exports, "VanillaNumberWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaNumber["default"];
  }
});
exports.VanillaProvider = void 0;
Object.defineProperty(exports, "VanillaSelectWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaSelect["default"];
  }
});
Object.defineProperty(exports, "VanillaSliderWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaSlider["default"];
  }
});
Object.defineProperty(exports, "VanillaSwitch", {
  enumerable: true,
  get: function get() {
    return _VanillaSwitch["default"];
  }
});
Object.defineProperty(exports, "VanillaTextAreaWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaTextArea["default"];
  }
});
Object.defineProperty(exports, "VanillaTextWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaText["default"];
  }
});
Object.defineProperty(exports, "VanillaTimeWidget", {
  enumerable: true,
  get: function get() {
    return _VanillaTime["default"];
  }
});
Object.defineProperty(exports, "VanillaValueSources", {
  enumerable: true,
  get: function get() {
    return _VanillaValueSources["default"];
  }
});
Object.defineProperty(exports, "vanillaConfirm", {
  enumerable: true,
  get: function get() {
    return _vanillaConfirm["default"];
  }
});

var _react = _interopRequireDefault(require("react"));

var _VanillaBoolean = _interopRequireDefault(require("./value/VanillaBoolean"));

var _VanillaText = _interopRequireDefault(require("./value/VanillaText"));

var _VanillaTextArea = _interopRequireDefault(require("./value/VanillaTextArea"));

var _VanillaDate = _interopRequireDefault(require("./value/VanillaDate"));

var _VanillaTime = _interopRequireDefault(require("./value/VanillaTime"));

var _VanillaDateTime = _interopRequireDefault(require("./value/VanillaDateTime"));

var _VanillaMultiSelect = _interopRequireDefault(require("./value/VanillaMultiSelect"));

var _VanillaSelect = _interopRequireDefault(require("./value/VanillaSelect"));

var _VanillaNumber = _interopRequireDefault(require("./value/VanillaNumber"));

var _VanillaSlider = _interopRequireDefault(require("./value/VanillaSlider"));

var _VanillaFieldSelect = _interopRequireDefault(require("./core/VanillaFieldSelect"));

var _VanillaConjs = _interopRequireDefault(require("./core/VanillaConjs"));

var _VanillaButton = _interopRequireDefault(require("./core/VanillaButton"));

var _VanillaButtonGroup = _interopRequireDefault(require("./core/VanillaButtonGroup"));

var _VanillaValueSources = _interopRequireDefault(require("./core/VanillaValueSources"));

var _VanillaSwitch = _interopRequireDefault(require("./core/VanillaSwitch"));

var _vanillaConfirm = _interopRequireDefault(require("./core/vanillaConfirm"));

// value widgets
// field select widget
// core components
var VanillaProvider = function VanillaProvider(_ref) {
  var config = _ref.config,
      children = _ref.children;
  return children;
};

exports.VanillaProvider = VanillaProvider;