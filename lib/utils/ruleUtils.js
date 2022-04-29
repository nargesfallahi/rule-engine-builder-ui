"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getWidgetsForFieldOp = exports.getWidgetForFieldOp = exports.getValueSourcesForFieldOp = exports.getValueLabel = exports.getOperatorsForField = exports.getNewValueForFieldOp = exports.getFuncPathLabels = exports.getFirstOperator = exports.getFirstField = exports.getFieldPathLabels = exports.getFieldPath = exports.getFieldPartsConfigs = exports.formatFieldName = exports.filterValueSourcesForField = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _configUtils = require("./configUtils");

var _stuff = require("../utils/stuff");

var _immutable = _interopRequireDefault(require("immutable"));

var _validation = require("../utils/validation");

var _last = _interopRequireDefault(require("lodash/last"));

var selectTypes = ["select", "multiselect", "treeselect", "treemultiselect"];
/**
 * @param {object} config
 * @param {object} oldConfig
 * @param {Immutable.Map} current
 * @param {string} newField
 * @param {string} newOperator
 * @param {string} changedProp
 * @return {object} - {canReuseValue, newValue, newValueSrc, newValueType, newValueError}
 */

var getNewValueForFieldOp = function getNewValueForFieldOp(config) {
  var oldConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var current = arguments.length > 2 ? arguments[2] : undefined;
  var newField = arguments.length > 3 ? arguments[3] : undefined;
  var newOperator = arguments.length > 4 ? arguments[4] : undefined;
  var changedProp = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var canFix = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
  if (!oldConfig) oldConfig = config;
  var currentField = current.get("field");
  var currentOperator = current.get("operator");
  var currentValue = current.get("value");
  var currentValueSrc = current.get("valueSrc", new _immutable["default"].List());
  var currentValueType = current.get("valueType", new _immutable["default"].List());
  var currentAsyncListValues = current.get("asyncListValues"); //const isValidatingTree = (changedProp === null);

  var _config$settings = config.settings,
      convertableWidgets = _config$settings.convertableWidgets,
      clearValueOnChangeField = _config$settings.clearValueOnChangeField,
      clearValueOnChangeOp = _config$settings.clearValueOnChangeOp,
      showErrorMessage = _config$settings.showErrorMessage; //const currentOperatorConfig = getOperatorConfig(oldConfig, currentOperator, currentField);

  var newOperatorConfig = (0, _configUtils.getOperatorConfig)(config, newOperator, newField); //const currentOperatorCardinality = currentOperator ? defaultValue(currentOperatorConfig.cardinality, 1) : null;

  var operatorCardinality = newOperator ? (0, _stuff.defaultValue)(newOperatorConfig.cardinality, 1) : null;
  var currentFieldConfig = (0, _configUtils.getFieldConfig)(oldConfig, currentField);
  var newFieldConfig = (0, _configUtils.getFieldConfig)(config, newField);
  var canReuseValue = currentField && currentOperator && newOperator && currentValue != undefined && (!changedProp || changedProp == "field" && !clearValueOnChangeField || changedProp == "operator" && !clearValueOnChangeOp) && currentFieldConfig && newFieldConfig && currentFieldConfig.type == newFieldConfig.type;

  if (canReuseValue && selectTypes.includes(currentFieldConfig.type) && changedProp == "field") {
    // different fields of select types has different listValues
    canReuseValue = false;
  } // compare old & new widgets


  for (var i = 0; i < operatorCardinality; i++) {
    var vs = currentValueSrc.get(i) || null;
    var currentWidget = getWidgetForFieldOp(oldConfig, currentField, currentOperator, vs);
    var newWidget = getWidgetForFieldOp(config, newField, newOperator, vs); // need to also check value widgets if we changed operator and current value source was 'field'
    // cause for select type op '=' requires single value and op 'in' requires array value

    var currentValueWidget = vs == "value" ? currentWidget : getWidgetForFieldOp(oldConfig, currentField, currentOperator, "value");
    var newValueWidget = vs == "value" ? newWidget : getWidgetForFieldOp(config, newField, newOperator, "value");
    var canReuseWidget = newValueWidget == currentValueWidget || (convertableWidgets[currentValueWidget] || []).includes(newValueWidget);
    if (!canReuseWidget) canReuseValue = false;
  }

  if (currentOperator != newOperator && [currentOperator, newOperator].includes("proximity")) canReuseValue = false;
  var firstWidgetConfig = (0, _configUtils.getFieldWidgetConfig)(config, newField, newOperator, null, currentValueSrc.first());
  var valueSources = getValueSourcesForFieldOp(config, newField, newOperator);
  var valueFixes = {};
  var valueErrors = Array.from({
    length: operatorCardinality
  }, function () {
    return null;
  });

  if (canReuseValue) {
    var _loop = function _loop(_i) {
      var v = currentValue.get(_i);
      var vType = currentValueType.get(_i) || null;
      var vSrc = currentValueSrc.get(_i) || null;
      var isValidSrc = valueSources.find(function (v) {
        return v == vSrc;
      }) != null;
      if (!isValidSrc && _i > 0 && vSrc == null) isValidSrc = true; // make exception for range widgets (when changing op from '==' to 'between')

      var isEndValue = !canFix;
      var asyncListValues = currentAsyncListValues;

      var _validateValue = (0, _validation.validateValue)(config, newField, newField, newOperator, v, vType, vSrc, asyncListValues, canFix, isEndValue),
          _validateValue2 = (0, _slicedToArray2["default"])(_validateValue, 2),
          validateError = _validateValue2[0],
          fixedValue = _validateValue2[1];

      var isValid = !validateError;

      if (!isValid && showErrorMessage && changedProp != "field") {
        // allow bad value
        // but not on field change - in that case just drop bad value that can't be reused
        // ? maybe we should also drop bad value on op change?
        valueErrors[_i] = validateError;
      } else if (!isValidSrc || !isValid) {
        canReuseValue = false;
        return "break";
      } else if (canFix && fixedValue !== v) {
        valueFixes[_i] = fixedValue;
      }
    };

    for (var _i = 0; _i < operatorCardinality; _i++) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  } // reuse value OR get defaultValue for cardinality 1 (it means default range values is not supported yet, todo)


  var newValue = null,
      newValueSrc = null,
      newValueType = null,
      newValueError = null;
  newValue = new _immutable["default"].List(Array.from({
    length: operatorCardinality
  }, function (_ignore, i) {
    var v = undefined;

    if (canReuseValue) {
      if (i < currentValue.size) {
        v = currentValue.get(i);

        if (valueFixes[i] !== undefined) {
          v = valueFixes[i];
        }
      }
    } else if (operatorCardinality == 1) {
      var _newFieldConfig$field;

      v = (0, _stuff.getFirstDefined)([newFieldConfig === null || newFieldConfig === void 0 ? void 0 : newFieldConfig.defaultValue, newFieldConfig === null || newFieldConfig === void 0 ? void 0 : (_newFieldConfig$field = newFieldConfig.fieldSettings) === null || _newFieldConfig$field === void 0 ? void 0 : _newFieldConfig$field.defaultValue, firstWidgetConfig === null || firstWidgetConfig === void 0 ? void 0 : firstWidgetConfig.defaultValue]);
    }

    return v;
  }));
  newValueSrc = new _immutable["default"].List(Array.from({
    length: operatorCardinality
  }, function (_ignore, i) {
    var vs = null;

    if (canReuseValue) {
      if (i < currentValueSrc.size) vs = currentValueSrc.get(i);
    } else if (valueSources.length == 1) {
      vs = valueSources[0];
    } else if (valueSources.length > 1) {
      vs = valueSources[0];
    }

    return vs;
  }));

  if (showErrorMessage) {
    if (newOperatorConfig && newOperatorConfig.validateValues && newValueSrc.toJS().filter(function (vs) {
      return vs == "value" || vs == null;
    }).length == operatorCardinality) {
      // last element in `valueError` list is for range validation error
      var jsValues = firstWidgetConfig && firstWidgetConfig.toJS ? newValue.toJS().map(function (v) {
        return firstWidgetConfig.toJS(v, firstWidgetConfig);
      }) : newValue.toJS();
      var rangeValidateError = newOperatorConfig.validateValues(jsValues);

      if (showErrorMessage) {
        valueErrors.push(rangeValidateError);
      }
    }

    newValueError = new _immutable["default"].List(valueErrors);
  }

  newValueType = new _immutable["default"].List(Array.from({
    length: operatorCardinality
  }, function (_ignore, i) {
    var vt = null;

    if (canReuseValue) {
      if (i < currentValueType.size) vt = currentValueType.get(i);
    } else if (operatorCardinality == 1 && firstWidgetConfig && firstWidgetConfig.type !== undefined) {
      vt = firstWidgetConfig.type;
    } else if (operatorCardinality == 1 && newFieldConfig && newFieldConfig.type !== undefined) {
      vt = newFieldConfig.type == "!group" ? "number" : newFieldConfig.type;
    }

    return vt;
  }));
  return {
    canReuseValue: canReuseValue,
    newValue: newValue,
    newValueSrc: newValueSrc,
    newValueType: newValueType,
    newValueError: newValueError,
    operatorCardinality: operatorCardinality
  };
};

exports.getNewValueForFieldOp = getNewValueForFieldOp;

var getFirstField = function getFirstField(config) {
  var parentRuleGroupPath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var fieldSeparator = config.settings.fieldSeparator;
  var parentPathArr = typeof parentRuleGroupPath == "string" ? parentRuleGroupPath.split(fieldSeparator) : parentRuleGroupPath;
  var parentField = parentRuleGroupPath ? (0, _configUtils.getFieldRawConfig)(config, parentRuleGroupPath) : config;
  var firstField = parentField,
      key = null,
      keysPath = [];

  do {
    var subfields = firstField === config ? config.fields : firstField.subfields;

    if (!subfields || !Object.keys(subfields).length) {
      firstField = key = null;
      break;
    }

    key = Object.keys(subfields)[0];
    keysPath.push(key);
    firstField = subfields[key];
  } while (firstField.type == "!struct" || firstField.type == "!group");

  return (parentPathArr || []).concat(keysPath).join(fieldSeparator);
};

exports.getFirstField = getFirstField;

var getOperatorsForField = function getOperatorsForField(config, field) {
  var fieldConfig = (0, _configUtils.getFieldConfig)(config, field);
  var fieldOps = fieldConfig ? fieldConfig.operators : [];
  return fieldOps;
};

exports.getOperatorsForField = getOperatorsForField;

var getFirstOperator = function getFirstOperator(config, field) {
  var fieldOps = getOperatorsForField(config, field);
  return fieldOps ? fieldOps[0] : null;
};

exports.getFirstOperator = getFirstOperator;

var getFieldPath = function getFieldPath(field, config) {
  var onlyKeys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  if (!field) return null;
  var fieldSeparator = config.settings.fieldSeparator;
  var parts = Array.isArray(field) ? field : field.split(fieldSeparator);
  if (onlyKeys) return parts;else return parts.map(function (_curr, ind, arr) {
    return arr.slice(0, ind + 1);
  }).map(function (parts) {
    return parts.join(fieldSeparator);
  });
};

exports.getFieldPath = getFieldPath;

var getFuncPathLabels = function getFuncPathLabels(field, config) {
  var parentField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  return getFieldPathLabels(field, config, parentField, "funcs", "subfields");
};

exports.getFuncPathLabels = getFuncPathLabels;

var getFieldPathLabels = function getFieldPathLabels(field, config) {
  var parentField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var fieldsKey = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "fields";
  var subfieldsKey = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "subfields";
  if (!field) return null;
  var fieldSeparator = config.settings.fieldSeparator;
  var parts = Array.isArray(field) ? field : field.split(fieldSeparator);
  var parentParts = parentField ? Array.isArray(parentField) ? parentField : parentField.split(fieldSeparator) : [];
  return parts.slice(parentParts.length).map(function (_curr, ind, arr) {
    return arr.slice(0, ind + 1);
  }).map(function (parts) {
    return [].concat((0, _toConsumableArray2["default"])(parentParts), (0, _toConsumableArray2["default"])(parts)).join(fieldSeparator);
  }).map(function (part) {
    var cnf = (0, _configUtils.getFieldRawConfig)(config, part, fieldsKey, subfieldsKey);
    return cnf && cnf.label || cnf && (0, _last["default"])(part.split(fieldSeparator));
  }).filter(function (label) {
    return label != null;
  });
};

exports.getFieldPathLabels = getFieldPathLabels;

var getFieldPartsConfigs = function getFieldPartsConfigs(field, config) {
  var parentField = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (!field) return null;
  var parentFieldDef = parentField && (0, _configUtils.getFieldRawConfig)(config, parentField) || null;
  var fieldSeparator = config.settings.fieldSeparator;
  var parts = Array.isArray(field) ? field : field.split(fieldSeparator);
  var parentParts = parentField ? Array.isArray(parentField) ? parentField : parentField.split(fieldSeparator) : [];
  return parts.slice(parentParts.length).map(function (_curr, ind, arr) {
    return arr.slice(0, ind + 1);
  }).map(function (parts) {
    return {
      part: [].concat((0, _toConsumableArray2["default"])(parentParts), (0, _toConsumableArray2["default"])(parts)).join(fieldSeparator),
      key: parts[parts.length - 1]
    };
  }).map(function (_ref) {
    var part = _ref.part,
        key = _ref.key;
    var cnf = (0, _configUtils.getFieldRawConfig)(config, part);
    return {
      key: key,
      cnf: cnf
    };
  }).map(function (_ref2, ind, arr) {
    var key = _ref2.key,
        cnf = _ref2.cnf;
    var parentCnf = ind > 0 ? arr[ind - 1].cnf : parentFieldDef;
    return [key, cnf, parentCnf];
  });
};

exports.getFieldPartsConfigs = getFieldPartsConfigs;

var getValueLabel = function getValueLabel(config, field, operator, delta) {
  var valueSrc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var isSpecialRange = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  var isFuncArg = field && (0, _typeof2["default"])(field) == "object" && !!field.func && !!field.arg;
  var showLabels = config.settings.showLabels;
  var fieldConfig = (0, _configUtils.getFieldConfig)(config, field);
  var fieldWidgetConfig = (0, _configUtils.getFieldWidgetConfig)(config, field, operator, null, valueSrc) || {};
  var mergedOpConfig = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
  var cardinality = isSpecialRange ? 1 : mergedOpConfig.cardinality;
  var ret = null;

  if (cardinality > 1) {
    var valueLabels = fieldWidgetConfig.valueLabels || mergedOpConfig.valueLabels;
    if (valueLabels) ret = valueLabels[delta];

    if (ret && (0, _typeof2["default"])(ret) != "object") {
      ret = {
        label: ret,
        placeholder: ret
      };
    }

    if (!ret) {
      ret = {
        label: config.settings.valueLabel + " " + (delta + 1),
        placeholder: config.settings.valuePlaceholder + " " + (delta + 1)
      };
    }
  } else {
    var label = fieldWidgetConfig.valueLabel;
    var placeholder = fieldWidgetConfig.valuePlaceholder;

    if (isFuncArg) {
      if (!label) label = fieldConfig.label || field.arg;
      if (!placeholder && !showLabels) placeholder = fieldConfig.label || field.arg;
    }

    ret = {
      label: label || config.settings.valueLabel,
      placeholder: placeholder || config.settings.valuePlaceholder
    };
  }

  return ret;
};

exports.getValueLabel = getValueLabel;

function _getWidgetsAndSrcsForFieldOp(config, field) {
  var operator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var valueSrc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var widgets = [];
  var valueSrcs = [];
  if (!field) return {
    widgets: widgets,
    valueSrcs: valueSrcs
  };

  var isFuncArg = (0, _typeof2["default"])(field) == "object" && (!!field.func && !!field.arg || field._isFuncArg);

  var fieldConfig = (0, _configUtils.getFieldConfig)(config, field);
  var opConfig = operator ? config.operators[operator] : null;

  if (fieldConfig && fieldConfig.widgets) {
    var _loop2 = function _loop2(widget) {
      var widgetConfig = fieldConfig.widgets[widget]; // if (!config.widgets[widget]) {
      //   continue;
      // }

      var widgetValueSrc = config.widgets[widget].valueSrc || "value";
      var canAdd = true;

      if (widget == "field") {
        canAdd = canAdd && filterValueSourcesForField(config, ["field"], fieldConfig).length > 0;
      }

      if (widget == "func") {
        canAdd = canAdd && filterValueSourcesForField(config, ["func"], fieldConfig).length > 0;
      } // If can't check operators, don't add
      // Func args don't have operators


      if (valueSrc == "value" && !widgetConfig.operators && !isFuncArg && field != "!case_value") canAdd = false;
      if (widgetConfig.operators && operator) canAdd = canAdd && widgetConfig.operators.indexOf(operator) != -1;
      if (valueSrc && valueSrc != widgetValueSrc && valueSrc != "const") canAdd = false;
      if (opConfig && opConfig.cardinality == 0 && widgetValueSrc != "value") canAdd = false;

      if (canAdd) {
        widgets.push(widget);
        var canAddValueSrc = fieldConfig.valueSources && fieldConfig.valueSources.indexOf(widgetValueSrc) != -1;
        if (opConfig && opConfig.valueSources && opConfig.valueSources.indexOf(widgetValueSrc) == -1) canAddValueSrc = false;
        if (canAddValueSrc && !valueSrcs.find(function (v) {
          return v == widgetValueSrc;
        })) valueSrcs.push(widgetValueSrc);
      }
    };

    for (var widget in fieldConfig.widgets) {
      _loop2(widget);
    }
  }

  var widgetWeight = function widgetWeight(w) {
    var wg = 0;

    if (fieldConfig.preferWidgets) {
      if (fieldConfig.preferWidgets.includes(w)) wg += 10 - fieldConfig.preferWidgets.indexOf(w);
    } else if (w == fieldConfig.mainWidget) {
      wg += 100;
    }

    if (w == "field") {
      wg -= 1;
    }

    if (w == "func") {
      wg -= 2;
    }

    return wg;
  };

  widgets.sort(function (w1, w2) {
    return widgetWeight(w2) - widgetWeight(w1);
  });
  return {
    widgets: widgets,
    valueSrcs: valueSrcs
  };
}

var getWidgetsForFieldOp = function getWidgetsForFieldOp(config, field, operator) {
  var valueSrc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var _getWidgetsAndSrcsFor = _getWidgetsAndSrcsForFieldOp(config, field, operator, valueSrc),
      widgets = _getWidgetsAndSrcsFor.widgets;

  return widgets;
};

exports.getWidgetsForFieldOp = getWidgetsForFieldOp;

var filterValueSourcesForField = function filterValueSourcesForField(config, valueSrcs, fieldDefinition) {
  if (!fieldDefinition) return valueSrcs;
  return valueSrcs.filter(function (vs) {
    var canAdd = true;

    if (vs == "field") {
      if (config._fieldsCntByType) {
        // tip: LHS field can be used as arg in RHS function
        var minCnt = fieldDefinition._isFuncArg ? 0 : 1;
        canAdd = canAdd && config._fieldsCntByType[fieldDefinition.type] > minCnt;
      }
    }

    if (vs == "func") {
      if (config._funcsCntByType) canAdd = canAdd && !!config._funcsCntByType[fieldDefinition.type];
      if (fieldDefinition.funcs) canAdd = canAdd && fieldDefinition.funcs.length > 0;
    }

    return canAdd;
  });
};

exports.filterValueSourcesForField = filterValueSourcesForField;

var getValueSourcesForFieldOp = function getValueSourcesForFieldOp(config, field, operator) {
  var fieldDefinition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var leftFieldForFunc = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

  var _getWidgetsAndSrcsFor2 = _getWidgetsAndSrcsForFieldOp(config, field, operator, null),
      valueSrcs = _getWidgetsAndSrcsFor2.valueSrcs;

  var filteredValueSrcs = filterValueSourcesForField(config, valueSrcs, fieldDefinition);
  return filteredValueSrcs;
};

exports.getValueSourcesForFieldOp = getValueSourcesForFieldOp;

var getWidgetForFieldOp = function getWidgetForFieldOp(config, field, operator) {
  var valueSrc = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var _getWidgetsAndSrcsFor3 = _getWidgetsAndSrcsForFieldOp(config, field, operator, valueSrc),
      widgets = _getWidgetsAndSrcsFor3.widgets;

  var widget = null;
  if (widgets.length) widget = widgets[0];
  return widget;
};

exports.getWidgetForFieldOp = getWidgetForFieldOp;

var formatFieldName = function formatFieldName(field, config, meta) {
  var parentField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (!field) return;
  var fieldDef = (0, _configUtils.getFieldConfig)(config, field) || {};
  var fieldSeparator = config.settings.fieldSeparator;
  var fieldParts = Array.isArray(field) ? field : field.split(fieldSeparator);
  var fieldName = Array.isArray(field) ? field.join(fieldSeparator) : field;

  if (fieldDef.tableName) {
    // legacy
    var fieldPartsCopy = (0, _toConsumableArray2["default"])(fieldParts);
    fieldPartsCopy[0] = fieldDef.tableName;
    fieldName = fieldPartsCopy.join(fieldSeparator);
  }

  if (fieldDef.fieldName) {
    fieldName = fieldDef.fieldName;
  }

  if (parentField) {
    var parentFieldDef = (0, _configUtils.getFieldConfig)(config, parentField) || {};
    var parentFieldName = parentField;

    if (parentFieldDef.fieldName) {
      parentFieldName = parentFieldDef.fieldName;
    }

    if (fieldName.indexOf(parentFieldName + fieldSeparator) == 0) {
      fieldName = fieldName.slice((parentFieldName + fieldSeparator).length);
    } else {
      meta.errors.push("Can't cut group ".concat(parentFieldName, " from field ").concat(fieldName));
    }
  }

  return fieldName;
};

exports.formatFieldName = formatFieldName;