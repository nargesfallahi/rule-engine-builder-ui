"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _omit = _interopRequireDefault(require("lodash/omit"));

var _TextField = _interopRequireDefault(require("@material-ui/core/TextField"));

var _FormControl = _interopRequireDefault(require("@material-ui/core/FormControl"));

var _Autocomplete = _interopRequireWildcard(require("@material-ui/lab/Autocomplete"));

var _CircularProgress = _interopRequireDefault(require("@material-ui/core/CircularProgress"));

var _Chip = _interopRequireDefault(require("@material-ui/core/Chip"));

var _Checkbox = _interopRequireDefault(require("@material-ui/core/Checkbox"));

var _styles = require("@material-ui/core/styles");

var _CheckBoxOutlineBlank = _interopRequireDefault(require("@material-ui/icons/CheckBoxOutlineBlank"));

var _CheckBox = _interopRequireDefault(require("@material-ui/icons/CheckBox"));

var _useListValuesAutocomplete = _interopRequireDefault(require("../../../../hooks/useListValuesAutocomplete"));

var _excluded = ["width", "showCheckboxes"];

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var nonCheckedIcon = /*#__PURE__*/_react["default"].createElement(_CheckBoxOutlineBlank["default"], {
  fontSize: "small"
});

var checkedIcon = /*#__PURE__*/_react["default"].createElement(_CheckBox["default"], {
  fontSize: "small"
});

var defaultFilterOptions = (0, _Autocomplete.createFilterOptions)();
var emptyArray = [];

var _default = function _default(props) {
  var allowCustomValues = props.allowCustomValues,
      multiple = props.multiple,
      selectedValue = props.value,
      customProps = props.customProps,
      readonly = props.readonly,
      config = props.config,
      groupBy = props.groupBy,
      filterOptionsConfig = props.filterOptionsConfig;
  var filterOptionsFn = filterOptionsConfig ? (0, _Autocomplete.createFilterOptions)(filterOptionsConfig) : defaultFilterOptions; // hook

  var _useListValuesAutocom = (0, _useListValuesAutocomplete["default"])(props, {
    debounceTimeout: 100,
    multiple: multiple
  }),
      open = _useListValuesAutocom.open,
      onOpen = _useListValuesAutocom.onOpen,
      onClose = _useListValuesAutocom.onClose,
      onChange = _useListValuesAutocom.onChange,
      onInputChange = _useListValuesAutocom.onInputChange,
      inputValue = _useListValuesAutocom.inputValue,
      options = _useListValuesAutocom.options,
      isInitialLoading = _useListValuesAutocom.isInitialLoading,
      isLoading = _useListValuesAutocom.isLoading,
      aPlaceholder = _useListValuesAutocom.aPlaceholder,
      extendOptions = _useListValuesAutocom.extendOptions,
      getOptionSelected = _useListValuesAutocom.getOptionSelected,
      getOptionDisabled = _useListValuesAutocom.getOptionDisabled,
      getOptionLabel = _useListValuesAutocom.getOptionLabel; // setings


  var _config$settings = config.settings,
      defaultSelectWidth = _config$settings.defaultSelectWidth,
      defaultSearchWidth = _config$settings.defaultSearchWidth;

  var _ref = customProps || {},
      width = _ref.width,
      showCheckboxes = _ref.showCheckboxes,
      rest = (0, _objectWithoutProperties2["default"])(_ref, _excluded);

  var customInputProps = rest.input || {};
  var inputWidth = customInputProps.width || defaultSearchWidth;
  customInputProps = (0, _omit["default"])(customInputProps, ["width"]);
  var customAutocompleteProps = (0, _omit["default"])(rest, ["showSearch", "showCheckboxes"]);
  var fullWidth = true;
  var minWidth = width || defaultSelectWidth;
  var style = {
    width: multiple ? undefined : minWidth,
    minWidth: minWidth
  };
  var placeholder = !readonly ? aPlaceholder : "";
  var hasValue = selectedValue != null; // should be simple value to prevent re-render!s

  var value = hasValue ? selectedValue : multiple ? emptyArray : null;

  var filterOptions = function filterOptions(options, params) {
    var filtered = filterOptionsFn(options, params);
    var extended = extendOptions(filtered);
    return extended;
  }; // styles


  var useStyles = (0, _styles.makeStyles)(function (theme) {
    return {
      // fix too small width
      input: {
        minWidth: inputWidth + " !important"
      }
    };
  });
  var useStylesChip = (0, _styles.makeStyles)(function (theme) {
    return {
      // fix height
      root: {
        height: "auto"
      },
      label: {
        marginTop: "3px",
        marginBottom: "3px"
      }
    };
  });
  var classesChip = useStylesChip();
  var classes = useStyles(); // render

  var renderInput = function renderInput(params) {
    return /*#__PURE__*/_react["default"].createElement(_TextField["default"], (0, _extends2["default"])({}, params, {
      InputProps: _objectSpread(_objectSpread({}, params.InputProps), {}, {
        readOnly: readonly,
        endAdornment: /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, isLoading ? /*#__PURE__*/_react["default"].createElement(_CircularProgress["default"], {
          color: "inherit",
          size: 20
        }) : null, params.InputProps.endAdornment)
      }),
      disabled: readonly,
      placeholder: placeholder //onChange={onInputChange}

    }, customInputProps));
  };

  var renderTags = function renderTags(value, getTagProps) {
    return value.map(function (option, index) {
      return /*#__PURE__*/_react["default"].createElement(_Chip["default"], (0, _extends2["default"])({
        key: index,
        classes: classesChip,
        label: getOptionLabel(option)
      }, getTagProps({
        index: index
      })));
    });
  };

  var renderOption = function renderOption(option, _ref2) {
    var selected = _ref2.selected;

    if (option.specialValue) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, option.renderTitle || option.title);
    } else if (multiple && showCheckboxes != false) {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Checkbox["default"], {
        icon: nonCheckedIcon,
        checkedIcon: checkedIcon,
        style: {
          marginRight: 8
        },
        checked: selected
      }), option.title);
    } else {
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, option.renderTitle || option.title);
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_FormControl["default"], {
    fullWidth: fullWidth
  }, /*#__PURE__*/_react["default"].createElement(_Autocomplete["default"], (0, _extends2["default"])({
    disableCloseOnSelect: multiple,
    fullWidth: fullWidth,
    multiple: multiple,
    style: style,
    classes: classes,
    freeSolo: allowCustomValues,
    loading: isInitialLoading,
    open: open,
    onOpen: onOpen,
    onClose: onClose,
    inputValue: inputValue,
    onInputChange: onInputChange,
    label: placeholder,
    onChange: onChange,
    value: value,
    getOptionSelected: getOptionSelected,
    disabled: readonly,
    readOnly: readonly,
    options: options,
    groupBy: groupBy,
    getOptionLabel: getOptionLabel,
    getOptionDisabled: getOptionDisabled,
    renderInput: renderInput,
    renderTags: renderTags,
    renderOption: renderOption,
    filterOptions: filterOptions
  }, customAutocompleteProps)));
};

exports["default"] = _default;