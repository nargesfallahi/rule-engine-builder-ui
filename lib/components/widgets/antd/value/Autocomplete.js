"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _react = _interopRequireWildcard(require("react"));

var _antd = require("antd");

var _domUtils = require("../../../../utils/domUtils");

var _stuff = require("../../../../utils/stuff");

var _reactUtils = require("../../../../utils/reactUtils");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _useListValuesAutocomplete = _interopRequireDefault(require("../../../../hooks/useListValuesAutocomplete"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Option = _antd.Select.Option;

var _default = function _default(props) {
  var config = props.config,
      placeholder = props.placeholder,
      allowCustomValues = props.allowCustomValues,
      customProps = props.customProps,
      value = props.value,
      readonly = props.readonly,
      multiple = props.multiple,
      useAsyncSearch = props.useAsyncSearch; // hook

  var _useListValuesAutocom = (0, _useListValuesAutocomplete["default"])(props, {
    debounceTimeout: 100,
    multiple: multiple
  }),
      open = _useListValuesAutocom.open,
      onDropdownVisibleChange = _useListValuesAutocom.onDropdownVisibleChange,
      onChange = _useListValuesAutocom.onChange,
      isSpecialValue = _useListValuesAutocom.isSpecialValue,
      onSearch = _useListValuesAutocom.onSearch,
      inputValue = _useListValuesAutocom.inputValue,
      options = _useListValuesAutocom.options,
      isInitialLoading = _useListValuesAutocom.isInitialLoading,
      isLoading = _useListValuesAutocom.isLoading,
      aPlaceholder = _useListValuesAutocom.aPlaceholder,
      extendOptions = _useListValuesAutocom.extendOptions,
      getOptionDisabled = _useListValuesAutocom.getOptionDisabled,
      getOptionLabel = _useListValuesAutocom.getOptionLabel;

  var filteredOptions = extendOptions(options);
  var optionsMaxWidth = (0, _react.useMemo)(function () {
    return filteredOptions.reduce(function (max, option) {
      return Math.max(max, (0, _domUtils.calcTextWidth)(option.title, null));
    }, 0);
  }, [options]);
  var _config$settings = config.settings,
      defaultSelectWidth = _config$settings.defaultSelectWidth,
      defaultSearchWidth = _config$settings.defaultSearchWidth,
      renderSize = _config$settings.renderSize;
  var placeholderWidth = (0, _domUtils.calcTextWidth)(placeholder);
  var aValue = value && value.length ? value : undefined;
  var width = aValue ? null : placeholderWidth + _domUtils.SELECT_WIDTH_OFFSET_RIGHT;
  var dropdownWidth = optionsMaxWidth + _domUtils.SELECT_WIDTH_OFFSET_RIGHT;
  var minWidth = width || defaultSelectWidth;
  var style = {
    width: multiple ? undefined : minWidth,
    minWidth: minWidth
  };
  var dropdownStyle = {
    width: dropdownWidth
  };
  var mode = !multiple ? undefined : allowCustomValues ? "tags" : "multiple";
  var dynamicPlaceholder = !readonly ? aPlaceholder : ""; // rendering special 'Load more' option has side effect: on change rc-select will save its title as internal value in own state

  var renderedOptions = filteredOptions === null || filteredOptions === void 0 ? void 0 : filteredOptions.filter(function (option) {
    return !option.specialValue;
  }).map(function (option) {
    return /*#__PURE__*/_react["default"].createElement(Option, {
      key: option.value,
      value: option.value,
      disabled: getOptionDisabled(option)
    }, getOptionLabel(option));
  });

  var onSpecialClick = function onSpecialClick(specialValue) {
    return function () {
      var option = filteredOptions.find(function (opt) {
        return opt.specialValue == specialValue;
      });
      onChange(null, option);
    };
  };

  var specialOptions = filteredOptions === null || filteredOptions === void 0 ? void 0 : filteredOptions.filter(function (option) {
    return !!option.specialValue;
  }).map(function (option) {
    return /*#__PURE__*/_react["default"].createElement("a", {
      style: {
        padding: "5px 10px",
        display: "block",
        cursor: "pointer"
      },
      key: option.specialValue,
      disabled: getOptionDisabled(option),
      onClick: onSpecialClick(option.specialValue)
    }, getOptionLabel(option));
  });

  var aOnSelect = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(label, option) {
      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!isSpecialValue(option)) {
                _context.next = 3;
                break;
              }

              _context.next = 3;
              return onChange(label, option);

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function aOnSelect(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }();

  var aOnChange = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(label, option) {
      return _regenerator["default"].wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (isSpecialValue(option)) {
                _context2.next = 3;
                break;
              }

              _context2.next = 3;
              return onChange(label, option);

            case 3:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function aOnChange(_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }();

  var dropdownRender = function dropdownRender(menu) {
    return /*#__PURE__*/_react["default"].createElement("div", null, menu, specialOptions.length > 0 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_antd.Divider, {
      style: {
        margin: "0px"
      }
    }), /*#__PURE__*/_react["default"].createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column"
      }
    }, specialOptions)));
  };

  return /*#__PURE__*/_react["default"].createElement(_antd.Select, (0, _extends2["default"])({
    filterOption: useAsyncSearch ? false : true,
    dropdownRender: dropdownRender,
    allowClear: true,
    notFoundContent: isLoading ? "Loading..." : null,
    disabled: readonly,
    mode: mode,
    style: (customProps === null || customProps === void 0 ? void 0 : customProps.style) || style,
    dropdownStyle: (customProps === null || customProps === void 0 ? void 0 : customProps.dropdownStyle) || dropdownStyle,
    key: "widget-autocomplete",
    dropdownMatchSelectWidth: (customProps === null || customProps === void 0 ? void 0 : customProps.dropdownMatchSelectWidth) || false,
    placeholder: (customProps === null || customProps === void 0 ? void 0 : customProps.placeholder) || dynamicPlaceholder,
    onDropdownVisibleChange: onDropdownVisibleChange,
    onChange: aOnChange,
    onSelect: aOnSelect,
    onSearch: onSearch,
    showArrow: true,
    showSearch: true,
    size: renderSize,
    loading: isLoading,
    value: aValue //searchValue={inputValue}
    ,
    open: open
  }, customProps), renderedOptions);
};

exports["default"] = _default;