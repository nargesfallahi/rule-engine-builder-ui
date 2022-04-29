"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _react = _interopRequireDefault(require("react"));

var _stuff = require("../../utils/stuff");

var _excluded = ["factory"];

var _default = function _default(_ref) {
  var delta = _ref.delta,
      isFuncArg = _ref.isFuncArg,
      valueSrc = _ref.valueSrc,
      immValue = _ref.value,
      immValueError = _ref.valueError,
      asyncListValues = _ref.asyncListValues,
      isSpecialRange = _ref.isSpecialRange,
      fieldDefinition = _ref.fieldDefinition,
      widget = _ref.widget,
      widgetDefinition = _ref.widgetDefinition,
      widgetValueLabel = _ref.widgetValueLabel,
      valueLabels = _ref.valueLabels,
      textSeparators = _ref.textSeparators,
      setValueHandler = _ref.setValueHandler,
      config = _ref.config,
      field = _ref.field,
      operator = _ref.operator,
      readonly = _ref.readonly,
      parentField = _ref.parentField,
      parentFuncs = _ref.parentFuncs,
      id = _ref.id,
      groupId = _ref.groupId;
  var widgetFactory = widgetDefinition.factory,
      fieldWidgetProps = (0, _objectWithoutProperties2["default"])(widgetDefinition, _excluded);
  var isConst = isFuncArg && fieldDefinition.valueSources && fieldDefinition.valueSources.length == 1 && fieldDefinition.valueSources[0] == "const";
  var defaultValue = fieldDefinition.defaultValue;

  if (!widgetFactory) {
    return "?";
  }

  var value = isSpecialRange ? [immValue.get(0), immValue.get(1)] : immValue ? immValue.get(delta) : undefined;
  var valueError = immValueError && (isSpecialRange ? [immValueError.get(0), immValueError.get(1)] : immValueError.get(delta)) || null;
  if (isSpecialRange && value[0] === undefined && value[1] === undefined) value = undefined;

  var _ref2 = fieldDefinition || {},
      fieldSettings = _ref2.fieldSettings;

  var widgetProps = Object.assign({}, fieldWidgetProps, fieldSettings, {
    config: config,
    field: field,
    parentField: parentField,
    parentFuncs: parentFuncs,
    fieldDefinition: fieldDefinition,
    operator: operator,
    delta: delta,
    isSpecialRange: isSpecialRange,
    isFuncArg: isFuncArg,
    value: value,
    valueError: valueError,
    label: widgetValueLabel.label,
    placeholder: widgetValueLabel.placeholder,
    placeholders: valueLabels ? valueLabels.placeholder : null,
    textSeparators: textSeparators,
    setValue: setValueHandler,
    readonly: readonly,
    asyncListValues: asyncListValues,
    id: id,
    groupId: groupId
  });

  if (widget == "field") {//
  }

  if (isConst && defaultValue) {
    if (typeof defaultValue == "boolean") {
      return defaultValue ? widgetProps.labelYes || "YES" : widgetProps.labelNo || "NO";
    } else if (fieldSettings.listValues) {
      if (Array.isArray(defaultValue)) return defaultValue.map(function (v) {
        return (0, _stuff.getTitleInListValues)(fieldSettings.listValues, v) || v;
      }).join(", ");else return (0, _stuff.getTitleInListValues)(fieldSettings.listValues, defaultValue) || defaultValue;
    }

    return "" + defaultValue;
  }

  return widgetFactory(widgetProps);
};

exports["default"] = _default;