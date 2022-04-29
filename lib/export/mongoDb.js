"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mongodbFormat = exports._mongodbFormat = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

var _stuff = require("../utils/stuff");

var _configUtils = require("../utils/configUtils");

var _ruleUtils = require("../utils/ruleUtils");

var _defaultUtils = require("../utils/defaultUtils");

var _funcUtils = require("../utils/funcUtils");

var _omit = _interopRequireDefault(require("lodash/omit"));

var _pick = _interopRequireDefault(require("lodash/pick"));

var _immutable = require("immutable");

var _default = require("../config/default");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// helpers
var isObject = function isObject(v) {
  return (0, _typeof2["default"])(v) == "object" && v !== null && !Array.isArray(v);
};

var mongodbFormat = function mongodbFormat(tree, config) {
  return _mongodbFormat(tree, config, false);
};

exports.mongodbFormat = mongodbFormat;

var _mongodbFormat = function _mongodbFormat(tree, config) {
  var returnErrors = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  //meta is mutable
  var meta = {
    errors: []
  };
  var res = formatItem([], tree, config, meta);

  if (returnErrors) {
    return [res, meta.errors];
  } else {
    if (meta.errors.length) console.warn("Errors while exporting to MongoDb:", meta.errors);
    return res;
  }
};

exports._mongodbFormat = _mongodbFormat;

var formatItem = function formatItem(parents, item, config, meta) {
  var _not = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  var _canWrapExpr = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

  var _fieldName = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;

  var _value = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : undefined;

  if (!item) return undefined;
  var type = item.get("type");

  if (type === "group" || type === "rule_group") {
    return formatGroup(parents, item, config, meta, _not, _canWrapExpr, _fieldName, _value);
  } else if (type === "rule") {
    return formatRule(parents, item, config, meta, _not, _canWrapExpr, _fieldName, _value);
  }

  return undefined;
};

var formatGroup = function formatGroup(parents, item, config, meta) {
  var _not = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  var _canWrapExpr = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

  var _fieldName = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;

  var _value = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : undefined;

  var type = item.get("type");
  var properties = item.get("properties") || new _immutable.Map();
  var children = item.get("children1");
  var canShortMongoQuery = config.settings.canShortMongoQuery;
  if (!children) return undefined;
  var hasParentRuleGroup = parents.filter(function (it) {
    return it.get("type") == "rule_group";
  }).length > 0;
  var parentPath = parents.filter(function (it) {
    return it.get("type") == "rule_group";
  }).map(function (it) {
    return it.get("properties").get("field");
  }).slice(-1).pop();
  var realParentPath = hasParentRuleGroup && parentPath;
  var groupField = type === "rule_group" ? properties.get("field") : null;
  var groupFieldName = formatFieldName(groupField, config, meta, realParentPath);
  var groupFieldDef = (0, _configUtils.getFieldConfig)(config, groupField) || {};
  var mode = groupFieldDef.mode; //properties.get("mode");

  var canHaveEmptyChildren = groupField && mode == "array";
  var not = _not ? !properties.get("not") : properties.get("not");
  var list = children.map(function (currentChild) {
    return formatItem([].concat((0, _toConsumableArray2["default"])(parents), [item]), currentChild, config, meta, not, true, mode == "array" ? function (f) {
      return "$$el.".concat(f);
    } : undefined);
  }).filter(function (currentChild) {
    return typeof currentChild !== "undefined";
  });
  if (!canHaveEmptyChildren && !list.size) return undefined;
  var conjunction = properties.get("conjunction");
  if (!conjunction) conjunction = (0, _defaultUtils.defaultConjunction)(config);
  var conjunctionDefinition = config.conjunctions[conjunction];
  var reversedConj = conjunctionDefinition.reversedConj;

  if (not && reversedConj) {
    conjunction = reversedConj;
    conjunctionDefinition = config.conjunctions[conjunction];
  }

  var mongoConj = conjunctionDefinition.mongoConj;
  var resultQuery;

  if (list.size == 1) {
    resultQuery = list.first();
  } else if (list.size > 1) {
    var rules = list.toList().toJS();
    var canShort = canShortMongoQuery && mongoConj == "$and";

    if (canShort) {
      resultQuery = rules.reduce(function (acc, rule) {
        if (!acc) return undefined;

        for (var k in rule) {
          if (k[0] == "$") {
            acc = undefined;
            break;
          }

          if (acc[k] == undefined) {
            acc[k] = rule[k];
          } else {
            // https://github.com/ukrbublik/react-awesome-query-builder/issues/182
            var prev = acc[k],
                next = rule[k];

            if (!isObject(prev)) {
              prev = {
                "$eq": prev
              };
            }

            if (!isObject(next)) {
              next = {
                "$eq": next
              };
            }

            var prevOp = Object.keys(prev)[0],
                nextOp = Object.keys(next)[0];

            if (prevOp == nextOp) {
              acc = undefined;
              break;
            }

            acc[k] = Object.assign({}, prev, next);
          }
        }

        return acc;
      }, {});
    }

    if (!resultQuery) // can't be shorten
      resultQuery = (0, _defineProperty2["default"])({}, mongoConj, rules);
  }

  if (groupField) {
    if (mode == "array") {
      var totalQuery = {
        "$size": groupFieldName
      };
      var filterQuery = resultQuery ? {
        "$size": {
          "$filter": {
            input: "$" + groupFieldName,
            as: "el",
            cond: resultQuery
          }
        }
      } : totalQuery;
      resultQuery = formatItem(parents, item.set("type", "rule"), config, meta, false, false, function (_f) {
        return filterQuery;
      }, totalQuery);
      resultQuery = {
        "$expr": resultQuery
      };
    } else {
      resultQuery = (0, _defineProperty2["default"])({}, groupFieldName, {
        "$elemMatch": resultQuery
      });
    }
  }

  return resultQuery;
};

var formatRule = function formatRule(parents, item, config, meta) {
  var _not = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

  var _canWrapExpr = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : true;

  var _fieldName = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : undefined;

  var _value = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : undefined;

  var properties = item.get("properties") || new _immutable.Map();
  var hasParentRuleGroup = parents.filter(function (it) {
    return it.get("type") == "rule_group";
  }).length > 0;
  var parentPath = parents.filter(function (it) {
    return it.get("type") == "rule_group";
  }).map(function (it) {
    return it.get("properties").get("field");
  }).slice(-1).pop();
  var realParentPath = hasParentRuleGroup && parentPath;
  var operator = properties.get("operator");
  var operatorOptions = properties.get("operatorOptions");
  var field = properties.get("field");
  var iValue = properties.get("value");
  var iValueSrc = properties.get("valueSrc");
  var iValueType = properties.get("valueType");
  var asyncListValues = properties.get("asyncListValues");
  if (field == null || operator == null || iValue === undefined) return undefined;
  var fieldDef = (0, _configUtils.getFieldConfig)(config, field) || {};
  var operatorDefinition = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
  var reversedOp = operatorDefinition.reversedOp;
  var revOperatorDefinition = (0, _configUtils.getOperatorConfig)(config, reversedOp, field) || {};
  var cardinality = (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);
  var not = _not;

  if (not && reversedOp) {
    var _ref = [reversedOp, operator];
    operator = _ref[0];
    reversedOp = _ref[1];
    var _ref2 = [revOperatorDefinition, operatorDefinition];
    operatorDefinition = _ref2[0];
    revOperatorDefinition = _ref2[1];
    not = false;
  }

  var fieldName = formatFieldName(field, config, meta, realParentPath); //format value

  var valueSrcs = [];
  var valueTypes = [];
  var useExpr = false;
  var fvalue = iValue.map(function (currentValue, ind) {
    var valueSrc = iValueSrc ? iValueSrc.get(ind) : null;
    var valueType = iValueType ? iValueType.get(ind) : null;
    var cValue = (0, _funcUtils.completeValue)(currentValue, valueSrc, config);
    var widget = (0, _ruleUtils.getWidgetForFieldOp)(config, field, operator, valueSrc);
    var fieldWidgetDef = (0, _omit["default"])((0, _configUtils.getFieldWidgetConfig)(config, field, operator, widget, valueSrc), ["factory"]);

    var _formatValue = formatValue(meta, config, cValue, valueSrc, valueType, fieldWidgetDef, fieldDef, realParentPath, operator, operatorDefinition, asyncListValues),
        _formatValue2 = (0, _slicedToArray2["default"])(_formatValue, 2),
        fv = _formatValue2[0],
        fvUseExpr = _formatValue2[1];

    if (fv !== undefined) {
      useExpr = useExpr || fvUseExpr;
      valueSrcs.push(valueSrc);
      valueTypes.push(valueType);
    }

    return fv;
  });
  if (_fieldName) useExpr = true;
  var wrapExpr = useExpr && _canWrapExpr;
  var hasUndefinedValues = fvalue.filter(function (v) {
    return v === undefined;
  }).size > 0;
  if (fvalue.size < cardinality || hasUndefinedValues) return undefined;
  var formattedValue = cardinality > 1 ? fvalue.toArray() : cardinality == 1 ? fvalue.first() : null; //build rule

  var fn = operatorDefinition.mongoFormatOp;

  if (!fn) {
    meta.errors.push("Operator ".concat(operator, " is not supported"));
    return undefined;
  }

  var args = [_fieldName ? _fieldName(fieldName) : fieldName, operator, _value !== undefined && formattedValue == null ? _value : formattedValue, useExpr, valueSrcs.length > 1 ? valueSrcs : valueSrcs[0], valueTypes.length > 1 ? valueTypes : valueTypes[0], (0, _omit["default"])(operatorDefinition, ["formatOp", "mongoFormatOp", "sqlFormatOp", "jsonLogic", "spelFormatOp"]), operatorOptions, fieldDef];
  var ruleQuery = fn.apply(void 0, args);

  if (wrapExpr) {
    ruleQuery = {
      "$expr": ruleQuery
    };
  }

  if (not) {
    ruleQuery = {
      "$not": ruleQuery
    };
  }

  return ruleQuery;
};

var formatValue = function formatValue(meta, config, currentValue, valueSrc, valueType, fieldWidgetDef, fieldDef, parentPath, operator, operatorDef, asyncListValues) {
  if (currentValue === undefined) return [undefined, false];
  var ret;
  var useExpr = false;

  if (valueSrc == "field") {
    var _formatRightField = formatRightField(meta, config, currentValue, parentPath);

    var _formatRightField2 = (0, _slicedToArray2["default"])(_formatRightField, 2);

    ret = _formatRightField2[0];
    useExpr = _formatRightField2[1];
  } else if (valueSrc == "func") {
    var _formatFunc = formatFunc(meta, config, currentValue, parentPath);

    var _formatFunc2 = (0, _slicedToArray2["default"])(_formatFunc, 2);

    ret = _formatFunc2[0];
    useExpr = _formatFunc2[1];
  } else {
    if (typeof fieldWidgetDef.mongoFormatValue === "function") {
      var fn = fieldWidgetDef.mongoFormatValue;
      var args = [currentValue, _objectSpread(_objectSpread({}, (0, _pick["default"])(fieldDef, ["fieldSettings", "listValues"])), {}, {
        asyncListValues: asyncListValues
      }), //useful options: valueFormat for date/time
      (0, _omit["default"])(fieldWidgetDef, ["formatValue", "mongoFormatValue", "sqlFormatValue", "jsonLogic", "elasticSearchFormatValue", "spelFormatValue"])];

      if (operator) {
        args.push(operator);
        args.push(operatorDef);
      }

      ret = fn.apply(void 0, args);
    } else {
      ret = currentValue;
    }
  }

  return [ret, useExpr];
};

var formatFieldName = function formatFieldName(field, config, meta, parentPath) {
  if (!field) return;
  var fieldDef = (0, _configUtils.getFieldConfig)(config, field) || {};
  var fieldSeparator = config.settings.fieldSeparator;
  var fieldParts = Array.isArray(field) ? field : field.split(fieldSeparator);
  var fieldName = Array.isArray(field) ? field.join(fieldSeparator) : field; // if (fieldDef.tableName) { // legacy
  //     const fieldPartsCopy = [...fieldParts];
  //     fieldPartsCopy[0] = fieldDef.tableName;
  //     fieldName = fieldPartsCopy.join(fieldSeparator);
  // }

  if (fieldDef.fieldName) {
    fieldName = fieldDef.fieldName;
  }

  if (parentPath) {
    var parentFieldDef = (0, _configUtils.getFieldConfig)(config, parentPath) || {};
    var parentFieldName = parentPath;

    if (parentFieldDef.fieldName) {
      parentFieldName = parentFieldDef.fieldName;
    }

    if (fieldName.indexOf(parentFieldName + ".") == 0) {
      fieldName = fieldName.slice((parentFieldName + ".").length);
    } else {
      meta.errors.push("Can't cut group ".concat(parentFieldName, " from field ").concat(fieldName));
    }
  }

  return fieldName;
};

var formatRightField = function formatRightField(meta, config, rightField, parentPath) {
  var fieldSeparator = config.settings.fieldSeparator;
  var ret;
  var useExpr = true;

  if (rightField) {
    var rightFieldDefinition = (0, _configUtils.getFieldConfig)(config, rightField) || {};
    var fieldParts = Array.isArray(rightField) ? rightField : rightField.split(fieldSeparator);

    var _fieldKeys = (0, _ruleUtils.getFieldPath)(rightField, config);

    var fieldPartsLabels = (0, _ruleUtils.getFieldPathLabels)(rightField, config);
    var fieldFullLabel = fieldPartsLabels ? fieldPartsLabels.join(fieldSeparator) : null;
    var formatFieldFn = config.settings.formatField || _default.settings.formatField;
    var rightFieldName = formatFieldName(rightField, config, meta, parentPath);
    var formattedField = formatFieldFn(rightFieldName, fieldParts, fieldFullLabel, rightFieldDefinition, config, false);
    ret = "$" + formattedField;
  }

  return [ret, useExpr];
};

var formatFunc = function formatFunc(meta, config, currentValue, parentPath) {
  var useExpr = true;
  var ret;
  var funcKey = currentValue.get("func");
  var args = currentValue.get("args");
  var funcConfig = (0, _configUtils.getFuncConfig)(config, funcKey);
  var funcName = funcConfig.mongoFunc || funcKey;
  var mongoArgsAsObject = funcConfig.mongoArgsAsObject;
  var formattedArgs = {};
  var argsCnt = 0;
  var lastArg = undefined;

  for (var argKey in funcConfig.args) {
    var argConfig = funcConfig.args[argKey];
    var fieldDef = (0, _configUtils.getFieldConfig)(config, argConfig);
    var argVal = args ? args.get(argKey) : undefined;
    var argValue = argVal ? argVal.get("value") : undefined;
    var argValueSrc = argVal ? argVal.get("valueSrc") : undefined;
    var argAsyncListValues = argVal ? argVal.get("asyncListValues") : undefined;
    var widget = (0, _ruleUtils.getWidgetForFieldOp)(config, fieldDef, null, argValueSrc);
    var fieldWidgetDef = (0, _omit["default"])((0, _configUtils.getFieldWidgetConfig)(config, fieldDef, null, widget, argValueSrc), ["factory"]);

    var _formatValue3 = formatValue(meta, config, argValue, argValueSrc, argConfig.type, fieldWidgetDef, fieldDef, parentPath, null, null, argAsyncListValues),
        _formatValue4 = (0, _slicedToArray2["default"])(_formatValue3, 2),
        formattedArgVal = _formatValue4[0],
        _argUseExpr = _formatValue4[1];

    if (argValue != undefined && formattedArgVal === undefined) {
      meta.errors.push("Can't format value of arg ".concat(argKey, " for func ").concat(funcKey));
      return [undefined, false];
    }

    argsCnt++;

    if (formattedArgVal !== undefined) {
      // skip optional in the end
      formattedArgs[argKey] = formattedArgVal;
      lastArg = formattedArgVal;
    }
  }

  if (typeof funcConfig.mongoFormatFunc === "function") {
    var fn = funcConfig.mongoFormatFunc;
    var _args = [formattedArgs];
    ret = fn.apply(void 0, _args);
  } else if (funcConfig.mongoFormatFunc === null) {
    meta.errors.push("Functon ".concat(funcName, " is not supported"));
    return [undefined, false];
  } else {
    if (mongoArgsAsObject) ret = (0, _defineProperty2["default"])({}, funcName, formattedArgs);else if (argsCnt == 1 && lastArg !== undefined) ret = (0, _defineProperty2["default"])({}, funcName, lastArg);else ret = (0, _defineProperty2["default"])({}, funcName, Object.values(formattedArgs));
  }

  return [ret, useExpr];
};