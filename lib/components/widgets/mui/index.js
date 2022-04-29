"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@mui/material/styles");

var _materialUiConfirm = require("material-ui-confirm");

var _LocalizationProvider = _interopRequireDefault(require("@mui/lab/LocalizationProvider"));

var _AdapterMoment = _interopRequireDefault(require("@mui/lab/AdapterMoment"));

var _MuiText = _interopRequireDefault(require("./value/MuiText"));

var _MuiTextArea = _interopRequireDefault(require("./value/MuiTextArea"));

var _MuiDate = _interopRequireDefault(require("./value/MuiDate"));

var _MuiDateTime = _interopRequireDefault(require("./value/MuiDateTime"));

var _MuiTime = _interopRequireDefault(require("./value/MuiTime"));

var _MuiSelect = _interopRequireDefault(require("./value/MuiSelect"));

var _MuiNumber = _interopRequireDefault(require("./value/MuiNumber"));

var _MuiSlider = _interopRequireDefault(require("./value/MuiSlider"));

var _MuiRange = _interopRequireDefault(require("./value/MuiRange"));

var _MuiBoolean = _interopRequireDefault(require("./value/MuiBoolean"));

var _MuiMultiSelect = _interopRequireDefault(require("./value/MuiMultiSelect"));

var _MuiAutocomplete = _interopRequireDefault(require("./value/MuiAutocomplete"));

var _MuiFieldSelect = _interopRequireDefault(require("./core/MuiFieldSelect"));

var _MuiFieldAutocomplete = _interopRequireDefault(require("./core/MuiFieldAutocomplete"));

var _MuiButton = _interopRequireDefault(require("./core/MuiButton"));

var _MuiButtonGroup = _interopRequireDefault(require("./core/MuiButtonGroup"));

var _MuiConjs = _interopRequireDefault(require("./core/MuiConjs"));

var _MuiSwitch = _interopRequireDefault(require("./core/MuiSwitch"));

var _MuiValueSources = _interopRequireDefault(require("./core/MuiValueSources"));

var _MuiConfirm = _interopRequireDefault(require("./core/MuiConfirm"));

// TODO: set moment to dayjs
// value widgets
// field select widgets
// core components
// provider
var MuiProvider = function MuiProvider(_ref) {
  var config = _ref.config,
      children = _ref.children;
  var settingsTheme = config.settings.theme || {};
  var settingsLocale = config.settings.locale || {};
  var themeConfig = settingsTheme.mui;
  var locale = settingsLocale.mui;
  var theme = (0, _styles.createTheme)(themeConfig, locale, {
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#fff"
      }
    }
  });

  var base = /*#__PURE__*/_react["default"].createElement("div", {
    className: "mui"
  }, children);

  var withProviders = /*#__PURE__*/_react["default"].createElement(_LocalizationProvider["default"], {
    dateAdapter: _AdapterMoment["default"]
  }, /*#__PURE__*/_react["default"].createElement(_materialUiConfirm.ConfirmProvider, null, base));

  var withTheme = theme ? /*#__PURE__*/_react["default"].createElement(_styles.ThemeProvider, {
    theme: theme
  }, withProviders) : withProviders;
  return withTheme;
};

var _default = {
  MuiTextWidget: _MuiText["default"],
  MuiTextAreaWidget: _MuiTextArea["default"],
  MuiDateWidget: _MuiDate["default"],
  MuiDateTimeWidget: _MuiDateTime["default"],
  MuiTimeWidget: _MuiTime["default"],
  MuiSelectWidget: _MuiSelect["default"],
  MuiNumberWidget: _MuiNumber["default"],
  MuiSliderWidget: _MuiSlider["default"],
  MuiRangeWidget: _MuiRange["default"],
  MuiBooleanWidget: _MuiBoolean["default"],
  MuiMultiSelectWidget: _MuiMultiSelect["default"],
  MuiAutocompleteWidget: _MuiAutocomplete["default"],
  MuiFieldSelect: _MuiFieldSelect["default"],
  MuiFieldAutocomplete: _MuiFieldAutocomplete["default"],
  MuiButton: _MuiButton["default"],
  MuiButtonGroup: _MuiButtonGroup["default"],
  MuiConjs: _MuiConjs["default"],
  MuiSwitch: _MuiSwitch["default"],
  MuiValueSources: _MuiValueSources["default"],
  MuiConfirm: _MuiConfirm["default"],
  MuiUseConfirm: _materialUiConfirm.useConfirm,
  MuiProvider: MuiProvider
};
exports["default"] = _default;