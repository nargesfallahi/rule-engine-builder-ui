"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spelFormat = exports._spelFormat = void 0;

var _toArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _configUtils = require("../utils/configUtils");

var _ruleUtils = require("../utils/ruleUtils");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _stuff = require("../utils/stuff");

var _defaultUtils = require("../utils/defaultUtils");

var _default = require("../config/default");

var _funcUtils = require("../utils/funcUtils");

var _immutable = require("immutable");

var _export = require("../utils/export");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var spelFormat = function spelFormat(tree, config) {
  return _spelFormat(tree, config, false);
};

exports.spelFormat = spelFormat;

var _spelFormat = function _spelFormat(tree, config) {
  var returnErrors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  //meta is mutable
  var meta = {
    errors: []
  };
  var res = formatItem(tree, config, meta, null);

  if (returnErrors) {
    return [res, meta.errors];
  } else {
    if (meta.errors.length) console.warn("Errors while exporting to SpEL:", meta.errors);
    return res;
  }
};

exports._spelFormat = _spelFormat;

var formatItem = function formatItem(item, config, meta) {
  var parentField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (!item) return undefined;
  var type = item.get("type");

  if (type === "group" || type === "rule_group") {
    return formatGroup(item, config, meta, parentField);
  } else if (type === "rule") {
    return formatRule(item, config, meta, parentField);
  } else if (type == "switch_group") {
    return formatSwitch(item, config, meta, parentField);
  } else if (type == "case_group") {
    return formatCase(item, config, meta, parentField);
  }

  return undefined;
};

var formatCase = function formatCase(item, config, meta) {
  var parentField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var type = item.get("type");

  if (type != "case_group") {
    meta.errors.push("Unexpected child of type ".concat(type, " inside switch"));
    return undefined;
  }

  var properties = item.get("properties") || new _immutable.Map();

  var _formatItemValue = formatItemValue(config, properties, meta, null, parentField, "!case_value"),
      _formatItemValue2 = (0, _slicedToArray2["default"])(_formatItemValue, 3),
      formattedValue = _formatItemValue2[0],
      valueSrc = _formatItemValue2[1],
      valueType = _formatItemValue2[2];

  var cond = formatGroup(item, config, meta, parentField);
  return [cond, formattedValue];
};

var formatSwitch = function formatSwitch(item, config, meta) {
  var parentField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var properties = item.get("properties") || new _immutable.Map();
  var children = item.get("children1");
  if (!children) return undefined;
  var cases = children.map(function (currentChild) {
    return formatCase(currentChild, config, meta, null);
  }).filter(function (currentChild) {
    return typeof currentChild !== "undefined";
  }).toArray();
  if (!cases.length) return undefined;

  if (cases.length == 1 && !cases[0][0]) {
    // only 1 case without condition
    return cases[0][1];
  }

  var filteredCases = [];

  for (var i = 0; i < cases.length; i++) {
    if (i != cases.length - 1 && !cases[i][0]) {
      meta.errors.push("No condition for case ".concat(i));
    } else {
      filteredCases.push(cases[i]);

      if (i == cases.length - 1 && cases[i][0]) {
        // no default - add null as default
        filteredCases.push([undefined, null]);
      }
    }
  }

  var left = "",
      right = "";

  for (var _i = 0; _i < filteredCases.length; _i++) {
    var _filteredCases$_i = (0, _slicedToArray2["default"])(filteredCases[_i], 2),
        cond = _filteredCases$_i[0],
        value = _filteredCases$_i[1];

    if (value == undefined) value = "null";
    if (cond == undefined) cond = "true";

    if (_i != filteredCases.length - 1) {
      left += "(".concat(cond, " ? ").concat(value, " : ");
      right += ")";
    } else {
      left += "".concat(value);
    }
  }

  return left + right;
};

var formatGroup = function formatGroup(item, config, meta) {
  var parentField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var type = item.get("type");
  var properties = item.get("properties") || new _immutable.Map();
  var mode = properties.get("mode");
  var children = item.get("children1");
  var field = properties.get("field");
  if (!children) return undefined;
  var conjunction = properties.get("conjunction");
  if (!conjunction) conjunction = (0, _defaultUtils.defaultConjunction)(config);
  var conjunctionDefinition = config.conjunctions[conjunction];
  var not = properties.get("not");
  var isRuleGroup = type === "rule_group";
  var isRuleGroupArray = isRuleGroup && mode != "struct";
  var groupField = isRuleGroupArray ? field : parentField;
  var groupFieldDef = (0, _configUtils.getFieldConfig)(config, groupField) || {};
  var isSpelArray = groupFieldDef.isSpelArray; // check op for reverse

  var groupOperator = properties.get("operator");

  if (!groupOperator && (!mode || mode == "some")) {
    groupOperator = "some";
  }

  var realGroupOperator = checkOp(config, groupOperator, field);
  var isGroupOpRev = realGroupOperator != groupOperator;
  var realGroupOperatorDefinition = groupOperator && (0, _configUtils.getOperatorConfig)(config, realGroupOperator, field) || null;
  var isGroup0 = isRuleGroup && (!realGroupOperator || realGroupOperatorDefinition.cardinality == 0); // build value for aggregation op

  var _formatItemValue3 = formatItemValue(config, properties, meta, realGroupOperator, parentField, null),
      _formatItemValue4 = (0, _slicedToArray2["default"])(_formatItemValue3, 3),
      formattedValue = _formatItemValue4[0],
      valueSrc = _formatItemValue4[1],
      valueType = _formatItemValue4[2]; // build filter in aggregation


  var list = children.map(function (currentChild) {
    return formatItem(currentChild, config, meta, groupField);
  }).filter(function (currentChild) {
    return typeof currentChild !== "undefined";
  });

  if (isRuleGroupArray && !isGroup0) {
    // "count" rule can have no "having" children, but should have number value
    if (formattedValue == undefined) return undefined;
  } else {
    if (!list.size) return undefined;
  }

  var omitBrackets = isRuleGroup;
  var filter = list.size ? conjunctionDefinition.spelFormatConj(list, conjunction, not, omitBrackets) : null; // build result

  var ret;

  if (isRuleGroupArray) {
    var formattedField = formatField(meta, config, field, parentField);
    var getSize = isSpelArray ? ".length" : ".size()";
    var fullSize = "".concat(formattedField).concat(getSize); // https://docs.spring.io/spring-framework/docs/3.2.x/spring-framework-reference/html/expressions.html#expressions-collection-selection

    var filteredSize = filter ? "".concat(formattedField, ".?[").concat(filter, "]").concat(getSize) : fullSize;
    var groupValue = isGroup0 ? fullSize : formattedValue; // format expression

    ret = formatExpression(meta, config, properties, filteredSize, groupValue, realGroupOperator, valueSrc, valueType, isGroupOpRev);
  } else {
    ret = filter;
  }

  return ret;
};

var buildFnToFormatOp = function buildFnToFormatOp(operator, operatorDefinition) {
  var spelOp = operatorDefinition.spelOp;
  if (!spelOp) return undefined;
  var objectIsFirstArg = spelOp[0] == "$";
  var isMethod = spelOp[0] == "." || objectIsFirstArg;
  var sop = isMethod ? spelOp.slice(1) : spelOp;
  var fn;
  var cardinality = (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);

  if (cardinality == 0) {
    fn = function fn(field, op, values, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
      if (isMethod) return "".concat(field, ".").concat(sop, "()");else return "".concat(field, " ").concat(sop);
    };
  } else if (cardinality == 1) {
    fn = function fn(field, op, values, valueSrc, valueType, opDef, operatorOptions, fieldDef) {
      if (objectIsFirstArg) return "".concat(values, ".").concat(sop, "(").concat(field, ")");else if (isMethod) return "".concat(field, ".").concat(sop, "(").concat(values, ")");else return "".concat(field, " ").concat(sop, " ").concat(values);
    };
  }

  return fn;
};

var formatExpression = function formatExpression(meta, config, properties, formattedField, formattedValue, operator, valueSrc, valueType) {
  var isRev = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : false;
  var field = properties.get("field");
  var opDef = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
  var fieldDef = (0, _configUtils.getFieldConfig)(config, field) || {};
  var operatorOptions = properties.get("operatorOptions"); //find fn to format expr

  var fn = opDef.spelFormatOp || buildFnToFormatOp(operator, opDef);

  if (!fn) {
    meta.errors.push("Operator ".concat(operator, " is not supported"));
    return undefined;
  } //format expr


  var args = [formattedField, operator, formattedValue, valueSrc, valueType, (0, _omit["default"])(opDef, ["formatOp", "mongoFormatOp", "sqlFormatOp", "jsonLogic", "spelFormatOp"]), operatorOptions, fieldDef];
  var ret;
  ret = fn.apply(void 0, args); //rev

  if (isRev) {
    ret = config.settings.spelFormatReverse(ret);
  }

  if (ret === undefined) {
    meta.errors.push("Operator ".concat(operator, " is not supported for value source ").concat(valueSrc));
  }

  return ret;
};

var checkOp = function checkOp(config, operator, field) {
  if (!operator) return undefined;
  var opDef = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
  var reversedOp = opDef.reversedOp;
  var revOpDef = (0, _configUtils.getOperatorConfig)(config, reversedOp, field) || {};
  var isRev = false;
  var canFormatOp = opDef.spelOp || opDef.spelFormatOp;
  var canFormatRevOp = revOpDef.spelOp || revOpDef.spelFormatOp;

  if (!canFormatOp && !canFormatRevOp) {
    return undefined;
  }

  if (!canFormatOp && canFormatRevOp) {
    isRev = true;
    var _ref = [reversedOp, operator];
    operator = _ref[0];
    reversedOp = _ref[1];
    var _ref2 = [revOpDef, opDef];
    opDef = _ref2[0];
    revOpDef = _ref2[1];
  }

  return operator;
};

var formatRule = function formatRule(item, config, meta) {
  var parentField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var properties = item.get("properties") || new _immutable.Map();
  var field = properties.get("field");
  var operator = properties.get("operator");
  if (field == null || operator == null) return undefined; // check op for reverse

  var realOp = checkOp(config, operator, field);

  if (!realOp) {
    meta.errors.push("Operator ".concat(operator, " is not supported"));
    return undefined;
  }

  var isRev = realOp != operator; //format value

  var _formatItemValue5 = formatItemValue(config, properties, meta, realOp, parentField, null),
      _formatItemValue6 = (0, _slicedToArray2["default"])(_formatItemValue5, 3),
      formattedValue = _formatItemValue6[0],
      valueSrc = _formatItemValue6[1],
      valueType = _formatItemValue6[2];

  if (formattedValue === undefined) return undefined; //format field

  var formattedField = formatField(meta, config, field, parentField); // format expression

  var res = formatExpression(meta, config, properties, formattedField, formattedValue, realOp, valueSrc, valueType, isRev);
  return res;
};

var formatItemValue = function formatItemValue(config, properties, meta, operator, parentField) {
  var expectedValueType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;
  var field = properties.get("field");
  var iValueSrc = properties.get("valueSrc");
  var iValueType = properties.get("valueType");

  if (expectedValueType == "!case_value" || iValueType && iValueType.get(0) == "case_value") {
    field = "!case_value";
  }

  var fieldDef = (0, _configUtils.getFieldConfig)(config, field) || {};
  var operatorDefinition = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
  var cardinality = (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);
  var iValue = properties.get("value");
  var asyncListValues = properties.get("asyncListValues");
  var valueSrcs = [];
  var valueTypes = [];
  var formattedValue;

  if (iValue != undefined) {
    var fvalue = iValue.map(function (currentValue, ind) {
      var valueSrc = iValueSrc ? iValueSrc.get(ind) : null;
      var valueType = iValueType ? iValueType.get(ind) : null;
      var cValue = (0, _funcUtils.completeValue)(currentValue, valueSrc, config);
      var widget = (0, _ruleUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
      var fieldWidgetDef = (0, _omit["default"])((0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget, valueSrc), ["factory"]);
      var fv = formatValue(meta, config, cValue, valueSrc, valueType, fieldWidgetDef, fieldDef, operator, operatorDefinition, parentField, asyncListValues);

      if (fv !== undefined) {
        valueSrcs.push(valueSrc);
        valueTypes.push(valueType);
      }

      return fv;
    });
    var hasUndefinedValues = fvalue.filter(function (v) {
      return v === undefined;
    }).size > 0;

    if (!(fvalue.size < cardinality || hasUndefinedValues)) {
      formattedValue = cardinality > 1 ? fvalue.toArray() : cardinality == 1 ? fvalue.first() : null;
    }
  }

  return [formattedValue, valueSrcs.length > 1 ? valueSrcs : valueSrcs[0], valueTypes.length > 1 ? valueTypes : valueTypes[0]];
};

var formatValue = function formatValue(meta, config, currentValue, valueSrc, valueType, fieldWidgetDef, fieldDef, operator, operatorDef) {
  var parentField = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
  var asyncListValues = arguments.length > 10 ? arguments[10] : undefined;
  if (currentValue === undefined) return undefined;
  var ret;

  if (valueSrc == "field") {
    ret = formatField(meta, config, currentValue, parentField);
  } else if (valueSrc == "func") {
    ret = formatFunc(meta, config, currentValue, parentField);
  } else {
    if (typeof fieldWidgetDef.spelFormatValue === "function") {
      var fn = fieldWidgetDef.spelFormatValue;
      var args = [currentValue, _objectSpread(_objectSpread({}, (0, _pick["default"])(fieldDef, ["fieldSettings", "listValues"])), {}, {
        asyncListValues: asyncListValues
      }), //useful options: valueFormat for date/time
      (0, _omit["default"])(fieldWidgetDef, ["formatValue", "mongoFormatValue", "sqlFormatValue", "jsonLogic", "elasticSearchFormatValue", "spelFormatValue"])];

      if (operator) {
        args.push(operator);
        args.push(operatorDef);
      }

      if (valueSrc == "field") {
        var valFieldDefinition = (0, _configUtils.getFieldConfig)(config, currentValue) || {};
        args.push(valFieldDefinition);
      }

      ret = fn.apply(void 0, args);
    } else {
      ret = (0, _export.spelEscape)(currentValue);
    }
  }

  return ret;
};

var formatField = function formatField(meta, config, field) {
  var parentField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  if (!field) return;
  var fieldSeparator = config.settings.fieldSeparator;
  var fieldDefinition = (0, _configUtils.getFieldConfig)(config, field) || {};
  var fieldParts = Array.isArray(field) ? field : field.split(fieldSeparator);

  var _fieldKeys = (0, _ruleUtils.getFieldPath)(field, config, parentField);

  var fieldPartsConfigs = (0, _ruleUtils.getFieldPartsConfigs)(field, config, parentField);
  var formatFieldFn = config.settings.formatSpelField;
  var fieldName = (0, _ruleUtils.formatFieldName)(field, config, meta);

  if (parentField) {
    var parentFieldDef = (0, _configUtils.getFieldConfig)(config, parentField) || {};
    var parentFieldName = parentField;

    if (parentFieldDef.fieldName) {
      parentFieldName = parentFieldDef.fieldName;
    }

    if (fieldName.indexOf(parentFieldName + fieldSeparator) == 0) {
      fieldName = fieldName.slice((parentFieldName + fieldSeparator).length); // fieldName = "#this." + fieldName;
    } else {
      meta.errors.push("Can't cut group ".concat(parentFieldName, " from field ").concat(fieldName));
    }
  }

  var fieldPartsMeta = fieldPartsConfigs.map(function (_ref3) {
    var _ref4 = (0, _slicedToArray2["default"])(_ref3, 3),
        key = _ref4[0],
        cnf = _ref4[1],
        parentCnf = _ref4[2];

    var parent;

    if (parentCnf) {
      if (parentCnf.type == "!struct" || parentCnf.type == "!group" && parentCnf.mode == "struct") parent = cnf.isSpelMap ? "map" : "class";else if (parentCnf.type == "!group") parent = cnf.isSpelItemMap ? "[map]" : "[class]";else parent = "class";
    }

    var isSpelVariable = cnf === null || cnf === void 0 ? void 0 : cnf.isSpelVariable;
    return {
      key: key,
      parent: parent,
      isSpelVariable: isSpelVariable
    };
  });
  var formattedField = formatFieldFn(fieldName, parentField, fieldParts, fieldPartsMeta, fieldDefinition, config);
  return formattedField;
};

var formatFunc = function formatFunc(meta, config, currentValue) {
  var parentField = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var funcKey = currentValue.get("func");
  var args = currentValue.get("args");
  var funcConfig = (0, _configUtils.getFuncConfig)(config, funcKey);
  var funcName = funcConfig.spelFunc || funcKey;
  var formattedArgs = {};

  for (var argKey in funcConfig.args) {
    var argConfig = funcConfig.args[argKey];
    var fieldDef = (0, _configUtils.getFieldConfig)(config, argConfig);
    var argVal = args ? args.get(argKey) : undefined;
    var argValue = argVal ? argVal.get("value") : undefined;
    var argValueSrc = argVal ? argVal.get("valueSrc") : undefined;
    var argAsyncListValues = argVal ? argVal.get("asyncListValues") : undefined;
    var formattedArgVal = formatValue(meta, config, argValue, argValueSrc, argConfig.type, fieldDef, argConfig, null, null, parentField, argAsyncListValues);

    if (argValue != undefined && formattedArgVal === undefined) {
      meta.errors.push("Can't format value of arg ".concat(argKey, " for func ").concat(funcKey));
      return undefined;
    }

    if (formattedArgVal !== undefined) {
      // skip optional in the end
      formattedArgs[argKey] = formattedArgVal;
    }
  }

  var ret;

  if (typeof funcConfig.spelFormatFunc === "function") {
    var fn = funcConfig.spelFormatFunc;
    var _args = [formattedArgs];
    ret = fn.apply(void 0, _args);
  } else {
    var _args2 = Object.entries(formattedArgs).map(function (_ref5) {
      var _ref6 = (0, _slicedToArray2["default"])(_ref5, 2),
          k = _ref6[0],
          v = _ref6[1];

      return v;
    });

    if (funcName[0] == "." && _args2.length) {
      var _args3 = (0, _toArray2["default"])(_args2),
          obj = _args3[0],
          params = _args3.slice(1);

      ret = "".concat(obj).concat(funcName, "(").concat(params.join(", "), ")");
    } else {
      ret = "".concat(funcName, "(").concat(_args2.join(", "), ")");
    }
  }

  return ret;
};