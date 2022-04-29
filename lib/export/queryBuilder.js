"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queryBuilderFormat = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _stuff = require("../utils/stuff");

var _configUtils = require("../utils/configUtils");

var _defaultUtils = require("../utils/defaultUtils");

var _ruleUtils = require("../utils/ruleUtils");

var _funcUtils = require("../utils/funcUtils");

var _immutable = require("immutable");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

/*
 Build tree to http://querybuilder.js.org/ like format

 Example:
 {
    "condition": "AND",
    "rules": [
        {
            "id": "price",
            "field": "price",
            "type": "double",
            "input": "text",
            "operator": "less",
            "value": "10.25"
        },
        {
            "condition": "OR",
            "rules": [
                {
                    "id": "category",
                    "field": "category",
                    "type": "integer",
                    "input": "select",
                    "operator": "equal",
                    "value": "2"
                },
                {
                    "id": "category",
                    "field": "category",
                    "type": "integer",
                    "input": "select",
                    "operator": "equal",
                    "value": "1"
                }
            ]
        }
    ]
 }
 */
var queryBuilderFormat = function queryBuilderFormat(item, config) {
  //meta is mutable
  var meta = {
    usedFields: []
  };
  var res = formatItem(item, config, meta);
  if (!res) return undefined;
  return _objectSpread(_objectSpread({}, res), meta);
};

exports.queryBuilderFormat = queryBuilderFormat;

var formatItem = function formatItem(item, config, meta) {
  if (!item) return undefined;
  var type = item.get("type");
  var children = item.get("children1");

  if ((type === "group" || type === "rule_group") && children && children.size) {
    return formatGroup(item, config, meta);
  } else if (type === "rule") {
    return formatRule(item, config, meta);
  }

  return undefined;
};

var formatGroup = function formatGroup(item, config, meta) {
  var properties = item.get("properties") || new _immutable.Map();
  var children = item.get("children1");
  var id = item.get("id");
  var list = children.map(function (currentChild) {
    return formatItem(currentChild, config, meta);
  }).filter(function (currentChild) {
    return typeof currentChild !== "undefined";
  });
  if (!list.size) return undefined;
  var conjunction = properties.get("conjunction");
  if (!conjunction) conjunction = (0, _defaultUtils.defaultConjunction)(config);
  var not = properties.get("not");
  var resultQuery = {
    id: id,
    rules: list.toList(),
    condition: conjunction.toUpperCase(),
    not: not
  };
  return resultQuery;
};

var formatRule = function formatRule(item, config, meta) {
  var properties = item.get("properties") || new _immutable.Map();
  var id = item.get("id");
  var operator = properties.get("operator");
  var options = properties.get("operatorOptions");
  var field = properties.get("field");
  var value = properties.get("value");
  var valueSrc = properties.get("valueSrc");
  var valueType = properties.get("valueType");
  var hasUndefinedValues = value.filter(function (v) {
    return v === undefined;
  }).size > 0;
  if (field == null || operator == null || hasUndefinedValues) return undefined;
  var fieldDefinition = (0, _configUtils.getFieldConfig)(config, field) || {};
  var operatorDefinition = (0, _configUtils.getOperatorConfig)(config, operator, field) || {};
  var fieldType = fieldDefinition.type || "undefined";
  var cardinality = (0, _stuff.defaultValue)(operatorDefinition.cardinality, 1);
  var typeConfig = config.types[fieldDefinition.type] || {};
  var fieldName = (0, _ruleUtils.formatFieldName)(field, config, meta);
  if (value.size < cardinality) return undefined;
  if (meta.usedFields.indexOf(field) == -1) meta.usedFields.push(field);
  value = value.toArray();
  valueSrc = valueSrc.toArray();
  valueType = valueType.toArray();
  var values = [];

  for (var i = 0; i < value.length; i++) {
    var val = {
      type: valueType[i],
      value: value[i]
    };
    values.push(val);

    if (valueSrc[i] == "field") {
      var secondField = value[i];
      if (meta.usedFields.indexOf(secondField) == -1) meta.usedFields.push(secondField);
    }
  }

  var operatorOptions = options ? options.toJS() : null;
  if (operatorOptions && !Object.keys(operatorOptions).length) operatorOptions = null;
  var ruleQuery = {
    id: id,
    fieldName: fieldName,
    type: fieldType,
    input: typeConfig.mainWidget,
    operator: operator
  };
  if (operatorOptions) ruleQuery.operatorOptions = operatorOptions;
  ruleQuery.values = values;
  return ruleQuery;
};