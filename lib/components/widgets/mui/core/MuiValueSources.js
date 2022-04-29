"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _IconButton = _interopRequireDefault(require("@mui/material/IconButton"));

var _ExpandMoreSharp = _interopRequireDefault(require("@mui/icons-material/ExpandMoreSharp"));

var _Popover = _interopRequireDefault(require("@mui/material/Popover"));

var _Radio = _interopRequireDefault(require("@mui/material/Radio"));

var _RadioGroup = _interopRequireDefault(require("@mui/material/RadioGroup"));

var _FormControlLabel = _interopRequireDefault(require("@mui/material/FormControlLabel"));

var _FormControl = _interopRequireDefault(require("@mui/material/FormControl"));

var _FormLabel = _interopRequireDefault(require("@mui/material/FormLabel"));

var _default = function _default(_ref) {
  var valueSources = _ref.valueSources,
      valueSrc = _ref.valueSrc,
      title = _ref.title,
      setValueSrc = _ref.setValueSrc,
      readonly = _ref.readonly;

  var _React$useState = _react["default"].useState(null),
      _React$useState2 = (0, _slicedToArray2["default"])(_React$useState, 2),
      anchorEl = _React$useState2[0],
      setAnchorEl = _React$useState2[1];

  var handleOpen = function handleOpen(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  var toggleOpenClose = function toggleOpenClose(event) {
    anchorEl ? handleClose() : handleOpen(event);
  };

  var handleChange = function handleChange(e) {
    if (e.target.value === undefined) return;
    setValueSrc(e.target.value);
    handleClose();
  };

  var renderOptions = function renderOptions(valueSources) {
    return valueSources.map(function (_ref2) {
      var _ref3 = (0, _slicedToArray2["default"])(_ref2, 2),
          srcKey = _ref3[0],
          info = _ref3[1];

      return /*#__PURE__*/_react["default"].createElement(_FormControlLabel["default"], {
        key: srcKey,
        value: srcKey,
        checked: valueSrc == srcKey || !valueSrc && srcKey == "value",
        control: /*#__PURE__*/_react["default"].createElement(_Radio["default"], null),
        label: info.label
      });
    });
  };

  var open = Boolean(anchorEl);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_IconButton["default"], {
    size: "small",
    onClick: toggleOpenClose
  }, /*#__PURE__*/_react["default"].createElement(_ExpandMoreSharp["default"], null)), /*#__PURE__*/_react["default"].createElement(_Popover["default"], {
    open: open,
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "left"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "left"
    },
    onClose: handleClose,
    sx: {
      padding: function padding(theme) {
        return theme.spacing(1);
      }
    },
    disablePortal: true
  }, /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    component: "fieldset",
    sx: {
      p: 2
    }
  }, /*#__PURE__*/_react["default"].createElement(_FormLabel["default"], {
    component: "legend"
  }, title), /*#__PURE__*/_react["default"].createElement(_RadioGroup["default"], {
    value: valueSrc || "value",
    onChange: handleChange
  }, renderOptions(valueSources)))));
};

exports["default"] = _default;