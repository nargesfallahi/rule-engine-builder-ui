"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _materialUiConfirm = require("material-ui-confirm");

var _pickers = require("@material-ui/pickers");

var _moment = _interopRequireDefault(require("@date-io/moment"));

var _MaterialText = _interopRequireDefault(require("./value/MaterialText"));

var _MaterialTextArea = _interopRequireDefault(require("./value/MaterialTextArea"));

var _MaterialDate = _interopRequireDefault(require("./value/MaterialDate"));

var _MaterialDateTime = _interopRequireDefault(require("./value/MaterialDateTime"));

var _MaterialTime = _interopRequireDefault(require("./value/MaterialTime"));

var _MaterialSelect = _interopRequireDefault(require("./value/MaterialSelect"));

var _MaterialNumber = _interopRequireDefault(require("./value/MaterialNumber"));

var _MaterialSlider = _interopRequireDefault(require("./value/MaterialSlider"));

var _MaterialRange = _interopRequireDefault(require("./value/MaterialRange"));

var _MaterialBoolean = _interopRequireDefault(require("./value/MaterialBoolean"));

var _MaterialMultiSelect = _interopRequireDefault(require("./value/MaterialMultiSelect"));

var _MaterialAutocomplete = _interopRequireDefault(require("./value/MaterialAutocomplete"));

var _MaterialFieldSelect = _interopRequireDefault(require("./core/MaterialFieldSelect"));

var _MaterialFieldAutocomplete = _interopRequireDefault(require("./core/MaterialFieldAutocomplete"));

var _MaterialButton = _interopRequireDefault(require("./core/MaterialButton"));

var _MaterialButtonGroup = _interopRequireDefault(require("./core/MaterialButtonGroup"));

var _MaterialConjs = _interopRequireDefault(require("./core/MaterialConjs"));

var _MaterialSwitch = _interopRequireDefault(require("./core/MaterialSwitch"));

var _MaterialValueSources = _interopRequireDefault(require("./core/MaterialValueSources"));

var _MaterialConfirm = _interopRequireDefault(require("./core/MaterialConfirm"));

// value widgets
// field select widgets
// core components
// provider
var MaterialProvider = function MaterialProvider(_ref) {
  var config = _ref.config,
      children = _ref.children;
  var settingsTheme = config.settings.theme || {};
  var settingsLocale = config.settings.locale || {};
  var themeConfig = settingsTheme.material;
  var locale = settingsLocale.material;
  var useTheme = themeConfig || locale;
  var theme = useTheme ? (0, _styles.createTheme)(themeConfig, locale) : null;

  var base = /*#__PURE__*/_react["default"].createElement("div", {
    className: "mui"
  }, children);

  var withProviders = /*#__PURE__*/_react["default"].createElement(_pickers.MuiPickersUtilsProvider, {
    utils: _moment["default"]
  }, /*#__PURE__*/_react["default"].createElement(_materialUiConfirm.ConfirmProvider, null, base));

  var withTheme = theme ? /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
    theme: theme
  }, withProviders) : withProviders;
  return withTheme;
};

var _default = {
  MaterialTextWidget: _MaterialText["default"],
  MaterialTextAreaWidget: _MaterialTextArea["default"],
  MaterialDateWidget: _MaterialDate["default"],
  MaterialDateTimeWidget: _MaterialDateTime["default"],
  MaterialTimeWidget: _MaterialTime["default"],
  MaterialSelectWidget: _MaterialSelect["default"],
  MaterialNumberWidget: _MaterialNumber["default"],
  MaterialSliderWidget: _MaterialSlider["default"],
  MaterialRangeWidget: _MaterialRange["default"],
  MaterialBooleanWidget: _MaterialBoolean["default"],
  MaterialMultiSelectWidget: _MaterialMultiSelect["default"],
  MaterialAutocompleteWidget: _MaterialAutocomplete["default"],
  MaterialFieldSelect: _MaterialFieldSelect["default"],
  MaterialFieldAutocomplete: _MaterialFieldAutocomplete["default"],
  MaterialButton: _MaterialButton["default"],
  MaterialButtonGroup: _MaterialButtonGroup["default"],
  MaterialConjs: _MaterialConjs["default"],
  MaterialSwitch: _MaterialSwitch["default"],
  MaterialValueSources: _MaterialValueSources["default"],
  MaterialConfirm: _MaterialConfirm["default"],
  MaterialUseConfirm: _materialUiConfirm.useConfirm,
  MaterialProvider: MaterialProvider
};
exports["default"] = _default;